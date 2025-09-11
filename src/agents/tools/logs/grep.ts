// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tool } = require('ai');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { z } = require('zod');
import { sanitizeConversationLogsFull } from './sanitize-full';

export const grepConversationLogs = tool({
  description:
    'Regex search. Find sanitized message blocks matching a pattern and return each with ±N blocks of surrounding context. Good for locating TODOs, filenames, headings. Example: grepConversationLogs({ projectDir, pattern: "TODO|FIXME", flags: "i", messagesBefore: 2, messagesAfter: 2 }).',
  inputSchema: z.object({
    projectDir: z.string(),
    pattern: z.string(),
    flags: z.string().optional(),
    messagesBefore: z.number().min(0).max(50).default(2),
    messagesAfter: z.number().min(0).max(50).default(2),
    maxMatches: z.number().min(1).max(200).default(50),
  }),
  execute: async ({ projectDir, pattern, flags, messagesBefore, messagesAfter, maxMatches }: { projectDir: string; pattern: string; flags?: string; messagesBefore?: number; messagesAfter?: number; maxMatches?: number; }) => {
    const full = await sanitizeConversationLogsFull.execute({ projectDir });
    const parts = (full.text || '').split('\n\n');

    let re: RegExp;
    try {
      re = new RegExp(pattern, flags || '');
    } catch (e: any) {
      return { matches: [], matchCount: 0, error: `Invalid regex: ${e.message}` };
    }

    const matches: Array<{ messageIndexRange: { start: number; end: number }; text: string }> = [];
    for (let i = 0; i < parts.length && matches.length < (maxMatches || 50); i++) {
      const p = parts[i];
      if (re.test(p)) {
        const start = Math.max(0, i - (messagesBefore || 2));
        const end = Math.min(parts.length, i + 1 + (messagesAfter || 2));
        matches.push({ messageIndexRange: { start, end }, text: parts.slice(start, end).join('\n\n') });
      }
    }
    return { matches, matchCount: matches.length };
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tool } = require('ai');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { z } = require('zod');
import { sanitizeConversationLogsFull } from './sanitize-full';

export const grepConversationLogs = tool({
  description: 'Regex search. Find sanitized message blocks matching a pattern and return each with ±N blocks of surrounding context. Good for locating TODOs, filenames, headings. Example: grepConversationLogs({ projectDir, pattern: "TODO|FIXME", flags: "i", messagesBefore: 2, messagesAfter: 2 }).',
  inputSchema: z.object({
    projectDir: z.string(),
    pattern: z.string(),
    flags: z.string().optional(),
    messagesBefore: z.number().min(0).max(50).default(2),
    messagesAfter: z.number().min(0).max(50).default(2),
    maxMatches: z.number().min(1).max(200).default(50),
  }),
  execute: async ({ projectDir, pattern, flags, messagesBefore, messagesAfter, maxMatches }: { projectDir: string; pattern: string; flags?: string; messagesBefore?: number; messagesAfter?: number; maxMatches?: number }) => {
    const full = await sanitizeConversationLogsFull.execute({ projectDir });
    const parts: string[] = (full.text || '').split('\n\n');
    let re: RegExp;
    try {
      re = new RegExp(pattern, flags || '');
    } catch (e) {
      return { matches: [], matchCount: 0, error: `Invalid regex: ${(e as Error).message}` };
    }
    const matches: Array<{ messageIndexRange: { start: number; end: number }; text: string }> = [];
    for (let i = 0; i < parts.length && matches.length < (maxMatches || 50); i++) {
      const p = parts[i];
      if (re.test(p)) {
        const start = Math.max(0, i - (messagesBefore || 2));
        const end = Math.min(parts.length, i + 1 + (messagesAfter || 2));
        matches.push({ messageIndexRange: { start, end }, text: parts.slice(start, end).join('\n\n') });
      }
    }
    return { matches, matchCount: matches.length };
  },
});


