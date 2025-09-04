// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tool } = require('ai');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { z } = require('zod');
import fs from 'fs-extra';
import readline from 'readline';
import { getJSONLFiles } from '../../utils/conversation-logs';

function estimateTokens(content: string): number {
  return Math.ceil(content.length / 4);
}

async function* readJsonl(filePath: string): AsyncGenerator<any> {
  const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      yield JSON.parse(trimmed);
    } catch {
      // skip invalid lines
    }
  }
}

function extractFullMessage(entry: any): string | null {
  // User messages: include full content
  if (entry.type === 'user' && entry.message?.content) {
    if (typeof entry.message.content === 'string') return `USER: ${entry.message.content}`;
    if (Array.isArray(entry.message.content)) {
      const text = entry.message.content.map((c: any) => c?.text ?? (typeof c === 'string' ? c : JSON.stringify(c))).join(' ');
      return `USER: ${text}`;
    }
    return `USER: ${JSON.stringify(entry.message.content)}`;
  }

  // Assistant content: include text and tool_use calls (omit tool results to reduce bloat)
  if (entry.type === 'assistant' && entry.message?.content) {
    const content = Array.isArray(entry.message.content) ? entry.message.content : [entry.message.content];
    const out: string[] = [];
    for (const item of content) {
      if (typeof item === 'string') out.push(`ASSISTANT: ${item}`);
      else if (item?.type === 'tool_use') out.push(`TOOL_USE: ${item.name} input=${JSON.stringify(item.input)}`);
      else if (item?.text) out.push(`ASSISTANT: ${item.text}`);
    }
    if (out.length > 0) return out.join('\n');
  }

  return null;
}

function splitIntoBlocks(text: string): string[] {
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const blocks: string[] = [];
  let current: string[] = [];
  const flush = () => { if (current.length) { blocks.push(current.join('\n')); current = []; } };
  for (const line of lines) {
    if (/^\s{0,3}#{1,6}\s/.test(line) || /^```/.test(line)) {
      flush();
      current.push(line);
    } else {
      current.push(line);
    }
  }
  flush();
  return blocks.filter(b => b.trim().length > 0);
}

function normalizeBlock(text: string): string {
  let t = text;
  // Remove UUIDs and ISO timestamps
  t = t.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi, 'uuid');
  t = t.replace(/\d{4}-\d{2}-\d{2}t\d{2}:\d{2}:\d{2}\.\d{3}z/gi, 'iso-date');
  t = t.replace(/\d{4}-\d{2}-\d{2}/g, 'date');
  // Remove volatile lines
  t = t.split(/\n/).filter(line => !/\*?last updated/i.test(line) && !/last updated:/i.test(line)).join('\n');
  // Replace numbers broadly
  t = t.replace(/\d+/g, '0');
  // Normalize whitespace and case
  t = t.toLowerCase();
  t = t.replace(/[\t ]+/g, ' ').replace(/[ ]+\n/g, '\n');
  return t.trim();
}

function extractBlocksFromEntry(entry: any): string[] {
  const out: string[] = [];
  const pushBlocks = (label: 'USER' | 'ASSISTANT', value: string) => {
    const blocks = splitIntoBlocks(value);
    for (const b of blocks) {
      out.push(`${label}: ${b}`);
    }
  };
  if (entry.type === 'user' && entry.message?.content) {
    if (typeof entry.message.content === 'string') pushBlocks('USER', entry.message.content);
    else if (Array.isArray(entry.message.content)) {
      for (const c of entry.message.content) {
        if (typeof c === 'string') pushBlocks('USER', c);
        else if (c?.text) pushBlocks('USER', c.text);
      }
    } else pushBlocks('USER', JSON.stringify(entry.message.content));
  } else if (entry.type === 'assistant' && entry.message?.content) {
    const content = Array.isArray(entry.message.content) ? entry.message.content : [entry.message.content];
    for (const item of content) {
      if (typeof item === 'string') pushBlocks('ASSISTANT', item);
      else if (item?.type === 'tool_use') out.push(`TOOL_USE: ${item.name} input=${JSON.stringify(item.input)}`);
      else if (item?.text) pushBlocks('ASSISTANT', item.text);
    }
  }
  return out;
}

async function readSessionMessagesFull(filePath: string): Promise<string[]> {
  const messages: string[] = [];
  for await (const entry of readJsonl(filePath)) {
    const blocks = extractBlocksFromEntry(entry);
    for (const b of blocks) messages.push(b);
  }
  return messages;
}

export const sanitizeConversationLogs = tool({
  description: 'Parse Claude Code session logs; remove duplicate content; return full messages (no truncation)',
  inputSchema: z.object({
    projectDir: z.string(),
    sessionLimit: z.number().min(1).max(3).default(2),
    targetTokens: z.number().default(150000),
    cleanupLevel: z.enum(['basic','aggressive']).default('aggressive')
  }),
  execute: async (input: { projectDir: string; sessionLimit?: number; targetTokens?: number; cleanupLevel?: 'basic'|'aggressive' }) => {
    const { projectDir, cleanupLevel } = input;
    const files = await getJSONLFiles(projectDir);
    const current = files[0]?.path;
    const previous = files[1]?.path;

    const segmentsAll: string[] = [];
    if (current) {
      segmentsAll.push(`# Current Session (${files[0].name.replace('.jsonl', '')})`);
      segmentsAll.push(...await readSessionMessagesFull(current));
    }
    if (previous) {
      segmentsAll.push('', `# Previous Session (${files[1].name.replace('.jsonl', '')})`);
      segmentsAll.push(...await readSessionMessagesFull(previous));
    }

    const originalText = segmentsAll.join('\n\n');

    // Block-level dedup with normalization
    const seenNorm = new Set<string>();
    const segmentsDedup: string[] = [];
    for (const seg of segmentsAll) {
      if (!seg) { segmentsDedup.push(seg); continue; }
      if (/^#\s/.test(seg)) { segmentsDedup.push(seg); continue; }
      const norm = normalizeBlock(seg);
      if (seenNorm.has(norm)) {
        if (cleanupLevel === 'aggressive') {
          const preview = seg.split(/\n/)[0]?.slice(0, 80) || 'block';
          segmentsDedup.push(`(deduped repeated block: ${preview} …)`);
        }
        continue;
      }
      seenNorm.add(norm);
      segmentsDedup.push(seg);
    }

    const cleanedText = segmentsDedup.join('\n\n');
    const before = estimateTokens(originalText);
    const after = estimateTokens(cleanedText);
    const reductionPct = before === 0 ? 0 : Math.max(0, Math.round(((before - after) / before) * 100));

    return {
      text: cleanedText,
      tokensBefore: before,
      tokensAfter: after,
      reductionPercent: reductionPct,
      meta: {
        messagesBefore: segmentsAll.length,
        messagesAfter: segmentsDedup.length,
      },
    };
  },
});


