// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tool } = require('ai');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { z } = require('zod');
import fs from 'fs-extra';
import { getJSONLFiles } from '../../utils/conversation-logs';

export const checkSignificance = tool({
  description: 'Determine if session analysis is needed based on message count and elapsed time',
  inputSchema: z.object({
    projectDir: z.string(),
    lastAnalysisTimestamp: z.string().optional(),
    minMessagesThreshold: z.number().default(5),
    minTimeThresholdMs: z.number().default(30 * 60 * 1000),
  }),
  execute: async (input: { projectDir: string; lastAnalysisTimestamp?: string; minMessagesThreshold: number; minTimeThresholdMs: number }) => {
    const { projectDir, lastAnalysisTimestamp, minMessagesThreshold, minTimeThresholdMs } = input;
    const files = await getJSONLFiles(projectDir);
    const latest = files[0];
    let messageCount = 0;
    if (latest) {
      try {
        const content = await fs.readFile(latest.path, 'utf-8');
        messageCount = content.trim().split('\n').filter(Boolean).length;
      } catch {}
    }
    const lastTs = lastAnalysisTimestamp ? Date.parse(lastAnalysisTimestamp) : 0;
    const now = Date.now();
    const timeElapsed = now - lastTs;
    const proceed = messageCount >= minMessagesThreshold && timeElapsed >= minTimeThresholdMs;
    return {
      proceed,
      reason: proceed
        ? `Proceed: messages=${messageCount} timeElapsedMs=${timeElapsed}`
        : `Skip: messages=${messageCount} (<${minMessagesThreshold}) or timeElapsedMs=${timeElapsed} (<${minTimeThresholdMs})`,
    };
  },
});


