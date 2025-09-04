// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tool } = require('ai');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { z } = require('zod');
import { getJSONLFiles } from '../../../utils/conversation-logs';
import { readJsonlStream } from './shared/stream-jsonl';
import { splitIntoBlocks, normalizeBlock } from './shared/blocks';
import { estimateTokensByChars } from './shared/stats';

// Restore the sophisticated message processing from the original
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
  for await (const entry of readJsonlStream(filePath)) {
    const blocks = extractBlocksFromEntry(entry);
    for (const b of blocks) messages.push(b);
  }
  return messages;
}

export const sanitizeConversationLogsFull = tool({
  description: 'Sanitize conversation logs with block-level dedup; return full messages (no truncation)',
  inputSchema: z.object({
    projectDir: z.string(),
    cleanupLevel: z.enum(['basic','aggressive']).default('aggressive'),
    regexPrune: z.boolean().default(true)
  }),
  execute: async ({ projectDir, cleanupLevel, regexPrune }: { projectDir: string; cleanupLevel?: 'basic'|'aggressive'; regexPrune?: boolean }) => {
    const files = await getJSONLFiles(projectDir);
    const segmentsAll: string[] = [];

    // Use the original's sophisticated message processing
    if (files[0]) {
      segmentsAll.push(`# Current Session (${files[0].name.replace('.jsonl','')})`);
      const messages = await readSessionMessagesFull(files[0].path);
      segmentsAll.push(...messages);
    }
    if (files[1]) {
      segmentsAll.push(`# Previous Session (${files[1].name.replace('.jsonl','')})`);
      const messages = await readSessionMessagesFull(files[1].path);
      segmentsAll.push(...messages);
    }

    const originalText = segmentsAll.join('\n\n');

    // Block-level dedup with normalization (from original)
    const seenNorm = new Set<string>();
    const normCount: Record<string, number> = {};
    const normPreview: Record<string, string> = {};
    const segmentsDedup: string[] = [];
    for (const seg of segmentsAll) {
      if (!seg) { segmentsDedup.push(seg); continue; }
      if (/^#\\s/.test(seg)) { segmentsDedup.push(seg); continue; }
      const norm = normalizeBlock(seg);
      if (seenNorm.has(norm)) {
        normCount[norm] = (normCount[norm] || 1) + 1;
        if (cleanupLevel === 'aggressive') {
          const preview = seg.split(/\n/)[0]?.slice(0, 80) || 'block';
          segmentsDedup.push(`(deduped repeated block: ${preview} …)`);
        }
        continue;
      }
      seenNorm.add(norm);
      normCount[norm] = 1;
      if (!normPreview[norm]) normPreview[norm] = seg.split(/\n/)[0]?.slice(0, 120) || 'block';
      segmentsDedup.push(seg);
    }

    let cleanedText = segmentsDedup.join('\n\n');
    let sectionDedupCounts: Record<string, number> = {};

    // Optional curated regex pruning (from original)
    if (regexPrune) {
      const headings = [
        '## Project Memory',
        '## Current Working Plan',
        '## Session Continuity Reference',
        '## Recent Conversation Log',
        '# Session Start Context',
        '## AI Analysis Prompt',
        '## Input Context',
        '## Output Requirements - MANDATORY FILE UPDATE',
        '## Quality Requirements',
        '## Session Analysis Guidelines',
        '## Directory Structure',
        '## Implementation Instructions',
      ];

      const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
      
      for (const h of headings) {
        const re = new RegExp(`${escapeRegExp(h)}[\\n\\r]+[\\s\\S]*?(?=\\n#{1,2}\\s|$)`, 'g');
        const matches: { start: number; end: number }[] = [];
        let m: RegExpExecArray | null;
        while ((m = re.exec(cleanedText)) !== null) {
          matches.push({ start: m.index, end: m.index + m[0].length });
          if (m.index === re.lastIndex) re.lastIndex++;
        }
        if (matches.length > 1) {
          sectionDedupCounts[h] = matches.length - 1;
          let result = '';
          let cursor = 0;
          for (let i = 0; i < matches.length; i++) {
            const { start, end } = matches[i];
            result += cleanedText.slice(cursor, start);
            if (i === 0) {
              result += cleanedText.slice(start, end);
            } else {
              result += `\\n(${h} deduped x${matches.length - 1})\\n`;
            }
            cursor = end;
          }
          result += cleanedText.slice(cursor);
          cleanedText = result;
        }
      }

      // Code block deduplication (from original)
      const codeRe = /```[^\\n]*\\n[\\s\\S]*?```/g;
      const seenCode = new Map<string, number>();
      const parts: { start: number; end: number; text: string }[] = [];
      let mc: RegExpExecArray | null;
      while ((mc = codeRe.exec(cleanedText)) !== null) {
        parts.push({ start: mc.index, end: mc.index + mc[0].length, text: mc[0] });
        if (mc.index === codeRe.lastIndex) codeRe.lastIndex++;
      }
      if (parts.length > 1) {
        let result = '';
        let cursor = 0;
        for (const p of parts) {
          result += cleanedText.slice(cursor, p.start);
          const norm = normalizeBlock(p.text);
          const count = (seenCode.get(norm) || 0) + 1;
          seenCode.set(norm, count);
          if (count === 1) {
            result += p.text;
          } else {
            result += `\\n(duplicate code block deduped x${count - 1})\\n`;
          }
          cursor = p.end;
        }
        result += cleanedText.slice(cursor);
        cleanedText = result;
      }
    }

    const tokensBefore = estimateTokensByChars(originalText);
    const tokensAfter = estimateTokensByChars(cleanedText);
    const reductionPercent = tokensBefore ? Math.round(((tokensBefore - tokensAfter) / tokensBefore) * 100) : 0;

    const freqEntries = Object.entries(normCount)
      .filter(([, c]) => c > 1)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 10)
      .map(([k, c]) => ({ count: c as number, preview: normPreview[k] }));

    return {
      text: cleanedText,
      tokensBefore,
      tokensAfter,
      reductionPercent,
      meta: {
        messagesBefore: segmentsAll.length,
        messagesAfter: segmentsDedup.length,
        topRepeatedBlocks: freqEntries,
        sectionDedupCounts,
      },
    };
  },
});