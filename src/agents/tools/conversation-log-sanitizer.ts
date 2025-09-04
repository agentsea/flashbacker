import { tool } from 'ai';
import { z } from 'zod';
import { getDualSessionLogs } from '../../utils/conversation-logs';

function estimateTokens(content: string): number {
  return Math.ceil(content.length / 4);
}

export const sanitizeConversationLogs = tool({
  description: 'Parse Claude Code session logs and return cleaned, condensed content',
  inputSchema: z.object({
    projectDir: z.string(),
    sessionLimit: z.number().min(1).max(3).default(2),
    targetTokens: z.number().default(150000),
  }),
  execute: async ({ projectDir }) => {
    const { currentSession, previousSession } = await getDualSessionLogs(projectDir, {
      maxEntriesPerSession: 50,
      maxCharsPerSession: 50000,
      maxCharsPerMessage: 500,
    });
    const parts: string[] = [];
    if (currentSession.filteredMessages.length) {
      parts.push(`# Current Session (${currentSession.sessionId})`);
      parts.push(...currentSession.filteredMessages);
    }
    if (previousSession.filteredMessages.length) {
      parts.push('', `# Previous Session (${previousSession.sessionId})`);
      parts.push(...previousSession.filteredMessages);
    }
    const text = parts.join('\n');
    return {
      text,
      tokens: estimateTokens(text),
      meta: {
        currentMessages: currentSession.filteredMessages.length,
        previousMessages: previousSession.filteredMessages.length,
      },
    };
  },
});


