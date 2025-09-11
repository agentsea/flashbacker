import { sanitizeConversationLogsFull } from './sanitize-full';
import { sanitizeConversationLogsTruncated } from './sanitize-truncated';
import { sanitizeConversationBySections } from './sections';
import { getConversationContextSlice } from './slice';
import { grepConversationLogs } from './grep';

export const conversationLogsTools = {
  sanitizeConversationLogsFull,
  sanitizeConversationLogsTruncated,
  sanitizeConversationBySections,
  getConversationContextSlice,
  grepConversationLogs,
};
