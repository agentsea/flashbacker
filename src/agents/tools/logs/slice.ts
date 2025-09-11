// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tool } = require('ai');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { z } = require('zod');
import { sanitizeConversationLogsFull } from './sanitize-full';
import { estimateTokensByChars } from './shared/stats';

export const getConversationContextSlice = tool({
  description:
    'Focused window. Return a slice of sanitized message blocks around a given index (±N messages). Useful for zooming into a spot you found via grep/sections. Example: getConversationContextSlice({ projectDir, messageIndex: 120, windowBefore: 10, windowAfter: 10 }).',
  inputSchema: z.object({
    projectDir: z.string(),
    session: z.enum(['current','previous']).default('current'),
    messageIndex: z.number().min(0),
    windowBefore: z.number().min(0).max(100).default(5),
    windowAfter: z.number().min(0).max(100).default(5),
  }),
  execute: async ({ projectDir, messageIndex, windowBefore, windowAfter }: { projectDir: string; messageIndex: number; windowBefore?: number; windowAfter?: number }) => {
    const full = await sanitizeConversationLogsFull.execute({ projectDir });
    const parts = (full.text || '').split('\n\n');
    const start = Math.max(0, messageIndex - (windowBefore || 5));
    const end = Math.min(parts.length, messageIndex + 1 + (windowAfter || 5));
    const slice = parts.slice(start, end).join('\n\n');
    return { sliceText: slice, indices: { start, end }, tokensEstimate: estimateTokensByChars(slice) };
  },
});


