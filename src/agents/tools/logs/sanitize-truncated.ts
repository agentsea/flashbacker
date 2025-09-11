// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tool } = require('ai');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { z } = require('zod');
import { sanitizeConversationLogsFull } from './sanitize-full';
import { estimateTokensByChars, basicLengthStats } from './shared/stats';

export const sanitizeConversationLogsTruncated = tool({
  description:
    'Budgeted sanitizer. Starts from full sanitized text, then enforces a target token budget using either perMessageCap (cap by p90 length) or rollingBudget (greedy keep until budget). Preserves headings; marks truncations. Example: sanitizeConversationLogsTruncated({ projectDir, targetTokens: 200000, strategy: "perMessageCap" }).',
  inputSchema: z.object({
    projectDir: z.string(),
    targetTokens: z.number().min(1000).default(180000),
    strategy: z.enum(['perMessageCap', 'rollingBudget']).default('perMessageCap'),
    cleanupLevel: z.enum(['basic','aggressive']).default('aggressive'),
    regexPrune: z.boolean().default(true)
  }),
  execute: async ({ projectDir, targetTokens, strategy, cleanupLevel, regexPrune }: { projectDir: string; targetTokens?: number; strategy?: 'perMessageCap'|'rollingBudget'; cleanupLevel?: 'basic'|'aggressive'; regexPrune?: boolean }) => {
    const full = await sanitizeConversationLogsFull.execute({ projectDir, cleanupLevel, regexPrune });
    const text: string = full.text || '';
    const parts = text.split('\n\n');

    // headings detection
    const isHeading = (s: string) => /^#\s|^##\s|^###\s/.test(s);
    const bodies = parts.map(p => ({ p, len: p.length, heading: isHeading(p) }));
    const lens = bodies.filter(b => !b.heading).map(b => b.len);
    const { p90 } = basicLengthStats(lens);
    const hardCap = 4000; // chars per message cap upper bound
    const cap = Math.max(200, Math.min(p90 || 1000, hardCap));

    let budget = targetTokens || 180000;
    const result: string[] = [];
    let truncatedCount = 0;

    for (const b of bodies) {
      if (b.heading) { result.push(b.p); continue; }
      if (strategy === 'perMessageCap' && b.len > cap) {
        truncatedCount++;
        const truncated = `${b.p.slice(0, cap)}\n(truncated)`;
        result.push(truncated);
      } else {
        result.push(b.p);
      }
    }

    // rolling budget enforcement
    if (strategy === 'rollingBudget') {
      const tmp: string[] = [];
      truncatedCount = 0;
      for (const seg of result) {
        const tokens = estimateTokensByChars(seg) + 1; // newline
        if (tokens <= budget) {
          tmp.push(seg);
          budget -= tokens;
        } else {
          if (/^#\s|^##\s|^###\s/.test(seg)) continue; // skip headings if over budget
          const remainingChars = Math.max(0, Math.floor(budget * 4) - 12);
          if (remainingChars > 50) {
            tmp.push(`${seg.slice(0, remainingChars)}\n(truncated)`);
            truncatedCount++;
            budget = 0;
          }
          break;
        }
      }
      return {
        text: tmp.join('\n\n'),
        tokensBefore: estimateTokensByChars(text),
        tokensAfter: estimateTokensByChars(tmp.join('\n\n')),
        meta: { capUsed: cap, truncatedCount }
      };
    }

    const out = result.join('\n\n');
    return {
      text: out,
      tokensBefore: estimateTokensByChars(text),
      tokensAfter: estimateTokensByChars(out),
      meta: { capUsed: cap, truncatedCount }
    };
  },
});


