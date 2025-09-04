#!/usr/bin/env node
/*
 Manual sanitizer runner against real logs.
 Prints memory usage, file sizes, line counts, and token estimates.
 Optionally prints provider token counts if OPENAI_API_KEY is set and input is within limits.
 Usage: node scripts/sanitize-real.js [projectDir]
*/
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const { sanitizeConversationLogs } = require('../lib/agents/tools/conversation-log-sanitizer.js');
const { getJSONLFiles } = require('../lib/utils/conversation-logs.js');

function mb(n) { return (n / (1024 * 1024)).toFixed(2); }
function tokensEstimate(s) { return Math.ceil((s?.length || 0) / 4); }

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

async function readJsonlLines(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n').filter(Boolean);
  return { content, lines };
}

async function buildOriginalExtractedText(currentPath, prevPath, currentName, prevName) {
  const segs = [];
  if (currentPath) {
    segs.push(`# Current Session (${currentName})`);
    const { lines } = await readJsonlLines(currentPath);
    for (const line of lines) {
      try { const e = JSON.parse(line); const m = extractFullMessage(e); if (m) segs.push(m); } catch {}
    }
  }
  if (prevPath) {
    segs.push('', `# Previous Session (${prevName})`);
    const { lines } = await readJsonlLines(prevPath);
    for (const line of lines) {
      try { const e = JSON.parse(line); const m = extractFullMessage(e); if (m) segs.push(m); } catch {}
    }
  }
  return segs.join('\n\n');
}

async function countTokensViaEmbeddings(text) {
  // Optional precise provider tokens using embeddings (single-shot, small inputs)
  if (!process.env.OPENAI_API_KEY) return null;
  if (!text || text.length < 1) return 0;
  try {
    const { openai } = require('@ai-sdk/openai');
    const { embed } = require('ai');
    if (text.length > 24000) return null;
    const { usage } = await embed({
      model: openai.textEmbeddingModel('text-embedding-3-small'),
      value: text,
    });
    return usage?.tokens ?? null;
  } catch {
    return null;
  }
}

async function countTokensViaEmbeddingsChunked(text, maxChunkChars = 12000) {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!text || text.length < 1) return 0;
  const { openai } = require('@ai-sdk/openai');
  const { embed } = require('ai');
  let total = 0;
  for (let i = 0; i < text.length; i += maxChunkChars) {
    const chunk = text.slice(i, i + maxChunkChars);
    try {
      const { usage } = await embed({
        model: openai.textEmbeddingModel('text-embedding-3-small'),
        value: chunk,
      });
      total += usage?.tokens || 0;
    } catch {
      // If any chunk fails, return null to indicate provider token calc not available
      return null;
    }
  }
  return total;
}

async function main() {
  const projectDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  const memStart = process.memoryUsage();

  const files = await getJSONLFiles(projectDir);
  const curr = files[0];
  const prev = files[1];
  if (!curr && !prev) {
    console.log('No JSONL logs found for project:', projectDir);
    process.exit(0);
  }

  const currBytes = curr ? (await fs.stat(curr.path)).size : 0;
  const prevBytes = prev ? (await fs.stat(prev.path)).size : 0;
  const { content: currContent = '', lines: currLines = [] } = curr ? await readJsonlLines(curr.path) : { content: '', lines: [] };
  const { content: prevContent = '', lines: prevLines = [] } = prev ? await readJsonlLines(prev.path) : { content: '', lines: [] };

  const originalStitched = await buildOriginalExtractedText(curr?.path, prev?.path, curr?.name?.replace('.jsonl',''), prev?.name?.replace('.jsonl',''));
  const originalBytes = Buffer.byteLength(originalStitched, 'utf-8');
  const originalTokenEst = tokensEstimate(originalStitched);
  const originalProviderTokens = await countTokensViaEmbeddingsChunked(originalStitched);

  const result = await sanitizeConversationLogs.execute({ projectDir });
  const cleanedText = result.text || '';
  const cleanedBytes = Buffer.byteLength(cleanedText, 'utf-8');
  const cleanedLines = cleanedText ? cleanedText.split('\n').length : 0;
  const cleanedTokenEst = result.tokensAfter ?? tokensEstimate(cleanedText);
  const cleanedProviderTokens = await countTokensViaEmbeddingsChunked(cleanedText);

  const memEnd = process.memoryUsage();

  const report = {
    projectDir,
    files: {
      current: curr ? { path: curr.path, bytes: currBytes, jsonlLines: currLines.length } : null,
      previous: prev ? { path: prev.path, bytes: prevBytes, jsonlLines: prevLines.length } : null,
    },
    extracted: {
      original: {
        bytes: originalBytes,
        lines: originalStitched.split('\n').length,
        tokensEstimate: originalTokenEst,
        providerTokens: originalProviderTokens,
      },
      cleaned: {
        bytes: cleanedBytes,
        lines: cleanedLines,
        tokensEstimate: cleanedTokenEst,
        providerTokens: cleanedProviderTokens,
      },
      reduction: {
        bytesPercent: originalBytes ? Math.round(((originalBytes - cleanedBytes) / originalBytes) * 100) : 0,
        linesPercent: (originalStitched ? Math.round(((originalStitched.split('\n').length - cleanedLines) / originalStitched.split('\n').length) * 100) : 0),
        tokensEstimatePercent: originalTokenEst ? Math.round(((originalTokenEst - cleanedTokenEst) / originalTokenEst) * 100) : 0,
        providerTokensPercent: (originalProviderTokens && cleanedProviderTokens) ? Math.round(((originalProviderTokens - cleanedProviderTokens) / originalProviderTokens) * 100) : null,
      },
    },
    memoryMB: {
      rssStart: Number(mb(memStart.rss)),
      rssEnd: Number(mb(memEnd.rss)),
      delta: Number((mb(memEnd.rss - memStart.rss)))
    },
  };

  console.log(JSON.stringify(report, null, 2));
}

main().catch(err => {
  console.error('sanitize-real failed:', err?.message || String(err));
  process.exit(1);
});


