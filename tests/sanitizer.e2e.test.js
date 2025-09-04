const fs = require('fs-extra');
const path = require('path');
const os = require('os');

// Helpers to build a fake Claude projects dir under a temp homedir
function pathToClaudeProjectDir(projectPath) {
  const normalizedPath = path.resolve(projectPath);
  return normalizedPath.replace(/\//g, '-');
}

function encode(projectDir) {
  return path.join('.claude', 'projects', pathToClaudeProjectDir(projectDir));
}

async function writeJsonl(filePath, lines) {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, lines.map(l => JSON.stringify(l)).join('\n'));
}

function extractFullMessage(entry) {
  if (entry.type === 'user' && entry.message?.content) {
    if (typeof entry.message.content === 'string') return `USER: ${entry.message.content}`;
    if (Array.isArray(entry.message.content)) {
      const text = entry.message.content.map(c => c?.text ?? (typeof c === 'string' ? c : JSON.stringify(c))).join(' ');
      return `USER: ${text}`;
    }
    return `USER: ${JSON.stringify(entry.message.content)}`;
  }
  if (entry.type === 'assistant' && entry.message?.content) {
    const content = Array.isArray(entry.message.content) ? entry.message.content : [entry.message.content];
    const out = [];
    for (const item of content) {
      if (typeof item === 'string') out.push(`ASSISTANT: ${item}`);
      else if (item?.type === 'tool_use') out.push(`TOOL_USE: ${item.name} input=${JSON.stringify(item.input)}`);
      else if (item?.text) out.push(`ASSISTANT: ${item.text}`);
    }
    if (out.length > 0) return out.join('\n');
  }
  return null;
}

describe('conversation-log-sanitizer (e2e)', () => {
  const tmpRoot = path.join(os.tmpdir(), `fb-sanitizer-test-${Date.now()}`);
  const realHomedir = os.homedir();
  let homedirSpy;

  beforeAll(async () => {
    homedirSpy = jest.spyOn(os, 'homedir').mockReturnValue(tmpRoot);
    await fs.ensureDir(tmpRoot);
  });

  afterAll(async () => {
    homedirSpy.mockRestore();
    await fs.remove(tmpRoot).catch(() => {});
  });

  test('deduplicates repeated segments and reports size reduction', async () => {
    const projectDir = path.join(tmpRoot, 'project');
    const encodedDir = path.join(tmpRoot, encode(projectDir));
    await fs.ensureDir(encodedDir);

    const dupMsg = { type: 'assistant', message: { content: [{ type: 'text', text: 'Repeated context block' }] } };
    const userMsg = { type: 'user', message: { content: 'Implement feature X' } };
    const toolUse = { type: 'assistant', message: { content: [{ type: 'tool_use', name: 'search_files', input: { q: 'TODO:' } }] } };

    const linesCurrent = [dupMsg, userMsg, dupMsg, toolUse, dupMsg];
    const linesPrev = [dupMsg, { type: 'user', message: { content: 'Earlier note' } }, dupMsg];

    const currentPath = path.join(encodedDir, '2025-09-04.jsonl');
    const prevPath = path.join(encodedDir, '2025-09-03.jsonl');
    await writeJsonl(currentPath, linesCurrent);
    await writeJsonl(prevPath, linesPrev);
    // ensure mtime ordering (current newer)
    const now = Date.now();
    await fs.utimes(currentPath, now / 1000, now / 1000);
    await fs.utimes(prevPath, (now - 10000) / 1000, (now - 10000) / 1000);

    // Build original stitched text (no dedup)
    const originalSegments = [];
    originalSegments.push('# Current Session (2025-09-04)');
    for (const e of linesCurrent) { const m = extractFullMessage(e); if (m) originalSegments.push(m); }
    originalSegments.push('', '# Previous Session (2025-09-03)');
    for (const e of linesPrev) { const m = extractFullMessage(e); if (m) originalSegments.push(m); }
    const originalText = originalSegments.join('\n\n');

    const { sanitizeConversationLogs } = require('../lib/agents/tools/conversation-log-sanitizer.js');
    const result = await sanitizeConversationLogs.execute({ projectDir });

    // Show stats for human inspection when running locally
    // eslint-disable-next-line no-console
    console.log('\nOriginal length:', originalText.length, 'Cleaned length:', result.text.length);
    // eslint-disable-next-line no-console
    console.log('Tokens before/after:', result.tokensBefore, result.tokensAfter, 'Reduction %:', result.reductionPercent);

    expect(result.text).toContain('Repeated context block');
    // Only one occurrence should remain
    const occurrences = (result.text.match(/Repeated context block/g) || []).length;
    expect(occurrences).toBe(1);
    expect(result.tokensAfter).toBeLessThan(result.tokensBefore);
    expect(result.reductionPercent).toBeGreaterThan(0);
  });
});


