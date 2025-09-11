// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tool } = require('ai');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { z } = require('zod');
import { sanitizeConversationLogsFull } from './sanitize-full';
import { estimateTokensByChars } from './shared/stats';

export const sanitizeConversationBySections = tool({
  description:
    'Section extractor. From sanitized text, locate H1–H3 headings and return bodies for requested labels (fuzzy or regex). Falls back to grep-like windows when headings don’t match. Example: sanitizeConversationBySections({ projectDir, sections: ["Project Memory","Current Working Plan"], useRegex: false }).',
  inputSchema: z.object({
    projectDir: z.string(),
    sections: z.array(z.string()).default(['Project Memory','Current Working Plan','Recent Conversation Log']),
    useRegex: z.boolean().default(false),
    windowLines: z.number().min(1).max(200).default(20),
  }),
  execute: async ({ projectDir, sections, useRegex, windowLines }: { projectDir: string; sections?: string[]; useRegex?: boolean; windowLines?: number }) => {
    const full = await sanitizeConversationLogsFull.execute({ projectDir });
    const text: string = full.text || '';

    // Detect all headings (H1-H3) in sanitized text
    const headingRe = /^#{1,3}\s+(.+)$/gm;
    const detectedHeadings: Array<{ name: string; start: number }> = [];
    let mh: RegExpExecArray | null;
    while ((mh = headingRe.exec(text)) !== null) {
      detectedHeadings.push({ name: mh[1].trim(), start: mh.index });
      if (mh.index === headingRe.lastIndex) headingRe.lastIndex++;
    }

    // Build ranges for headings
    const ranges = [] as Array<{ name: string; start: number; end: number }>;
    for (let i = 0; i < detectedHeadings.length; i++) {
      const cur = detectedHeadings[i];
      const next = detectedHeadings[i + 1];
      ranges.push({ name: cur.name, start: cur.start, end: next ? next.start : text.length });
    }

    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const out: Record<string, { text: string; tokensEstimate: number }> = {};
    const detectedOrder: string[] = [];
    const notFound: string[] = [];

    for (const key of (sections || [])) {
      let matchedRange: { name: string; start: number; end: number } | null = null;
      if (useRegex) {
        try {
          const re = new RegExp(key, 'i');
          matchedRange = ranges.find(r => re.test(r.name)) || null;
        } catch {
          matchedRange = null;
        }
      } else {
        const nk = normalize(key);
        matchedRange = ranges.find(r => normalize(r.name).includes(nk)) || null;
      }

      if (matchedRange) {
        const body = text.slice(matchedRange.start, matchedRange.end);
        detectedOrder.push(key);
        out[key] = { text: body.trim(), tokensEstimate: estimateTokensByChars(body) };
      } else {
        // Fallback: grep-like window around first occurrence of the label
        const lines = text.split('\n');
        const idx = lines.findIndex(l => (useRegex ? (() => { try { return new RegExp(key, 'i').test(l); } catch { return false; } })() : normalize(l).includes(normalize(key))));
        if (idx !== -1) {
          const start = Math.max(0, idx - (windowLines || 20));
          const end = Math.min(lines.length, idx + 1 + (windowLines || 20));
          const body = lines.slice(start, end).join('\n');
          detectedOrder.push(key);
          out[key] = { text: body.trim(), tokensEstimate: estimateTokensByChars(body) };
        } else {
          notFound.push(key);
        }
      }
    }

    return { sections: out, detectedOrder, detectedHeadings: detectedHeadings.map(h => h.name), notFound };
  },
});
