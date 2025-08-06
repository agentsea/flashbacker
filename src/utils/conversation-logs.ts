import fs from 'fs-extra';
import path from 'path';
import os from 'os';

/**
 * Shared utilities for conversation log analysis
 * Centralizes session detection and JSONL parsing to eliminate duplicates
 */

interface SessionSummary {
  sessionId: string;
  totalMessages: number;
  filteredMessages: string[];
  truncationInfo: string;
}

interface SessionOptions {
  maxEntriesPerSession?: number;
  maxCharsPerSession?: number;
  maxCharsPerMessage?: number;
}

const DEFAULT_OPTIONS: SessionOptions = {
  maxEntriesPerSession: 15,
  maxCharsPerSession: 4000,
  maxCharsPerMessage: 200,
};

/**
 * Convert absolute project path to Claude Code project directory name
 * Example: /path/to/project → -path-to-project
 */
function pathToClaudeProjectDir(projectPath: string): string {
  // Normalize path and convert slashes to dashes
  const normalizedPath = path.resolve(projectPath);
  // Replace all slashes with dashes, the leading slash becomes the leading dash
  return normalizedPath.replace(/\//g, '-');
}

/**
 * Get all JSONL files for a project, sorted by modification time (newest first)
 */
async function getJSONLFiles(projectDir: string): Promise<Array<{ name: string; path: string; mtime: Date }>> {
  const homeDir = os.homedir();
  const projectsDir = path.join(homeDir, '.claude', 'projects');

  // Convert project path to Claude Code directory name using the actual algorithm
  const claudeProjectDir = pathToClaudeProjectDir(projectDir);
  const targetDir = path.join(projectsDir, claudeProjectDir);

  if (await fs.pathExists(targetDir)) {
    const files = await fs.readdir(targetDir);
    const jsonlFiles = files
      .filter(f => f.endsWith('.jsonl'))
      .map(f => ({
        name: f,
        path: path.join(targetDir, f),
        mtime: fs.statSync(path.join(targetDir, f)).mtime,
      }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime()); // Sort by modification time DESC

    return jsonlFiles;
  }

  return [];
}

/**
 * Get the current session ID
 */
export async function getCurrentSessionId(projectDir?: string): Promise<string> {
  try {
    const currentProject = projectDir || process.cwd();
    const jsonlFiles = await getJSONLFiles(currentProject);

    if (jsonlFiles.length > 0) {
      return jsonlFiles[0].name.replace('.jsonl', '');
    }

    // Fallback to date-based session ID
    return `session-${new Date().toISOString().split('T')[0]}`;

  } catch (error) {
    return `session-${new Date().toISOString().split('T')[0]}`;
  }
}

/**
 * Extract important content from a JSONL entry with priority-based filtering
 */
function extractImportantContent(entry: any, maxChars: number): string | null {
  // Priority 1: User messages (always include)
  if (entry.type === 'user' && entry.message?.content) {
    const content = typeof entry.message.content === 'string'
      ? entry.message.content
      : Array.isArray(entry.message.content)
        ? entry.message.content.map((c: any) => c.text || c.type || JSON.stringify(c)).join(' ')
        : JSON.stringify(entry.message.content);
    return `USER: ${content.substring(0, maxChars)}`;
  }

  // Priority 2: Todo updates (task completions)
  if (entry.type === 'user' && entry.toolUseResult?.newTodos) {
    return `TODO_UPDATE: ${JSON.stringify(entry.toolUseResult.newTodos).substring(0, maxChars)}`;
  }

  // Priority 3: Assistant messages and tool calls
  if (entry.type === 'assistant' && entry.message?.content) {
    const content = Array.isArray(entry.message.content)
      ? entry.message.content
      : [entry.message.content];

    for (const item of content) {
      if (typeof item === 'string') {
        return `ASSISTANT: ${item.substring(0, maxChars)}`;
      }
      if (item.type === 'tool_use') {
        return `TOOL_USE: ${item.name} - ${JSON.stringify(item.input).substring(0, maxChars)}`;
      }
      if (item.text) {
        return `ASSISTANT: ${item.text.substring(0, maxChars)}`;
      }
    }
  }

  // Skip tool results and other low-priority content
  return null;
}

/**
 * Process a single session file and return filtered content
 */
async function processSessionFile(file: { name: string; path: string; mtime: Date } | null, options: SessionOptions): Promise<SessionSummary> {
  if (!file) {
    return {
      sessionId: 'none',
      totalMessages: 0,
      filteredMessages: [],
      truncationInfo: 'No session file found',
    };
  }

  try {
    const content = await fs.readFile(file.path, 'utf-8');
    const lines = content.trim().split('\n').filter(line => line.trim());

    // Take last N entries (simple approach)
    const recentLines = lines.slice(-options.maxEntriesPerSession!);

    // Extract and filter messages
    const messages: string[] = [];
    let totalChars = 0;

    // Process newest first to prioritize recent content
    for (const line of recentLines.reverse()) {
      if (totalChars >= options.maxCharsPerSession!) break;

      try {
        const entry = JSON.parse(line);
        const filteredMessage = extractImportantContent(entry, options.maxCharsPerMessage!);

        if (filteredMessage) {
          messages.push(filteredMessage);
          totalChars += filteredMessage.length;
        }
      } catch (parseError) {
        // Skip invalid JSON lines
        continue;
      }
    }

    return {
      sessionId: file.name.replace('.jsonl', ''),
      totalMessages: lines.length,
      filteredMessages: messages.reverse(), // Back to chronological order
      truncationInfo: `Showing last ${messages.length} of ${lines.length} messages`,
    };
  } catch (error) {
    return {
      sessionId: file.name.replace('.jsonl', ''),
      totalMessages: 0,
      filteredMessages: [],
      truncationInfo: `Error reading session: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Get both current and previous session logs with intelligent filtering
 */
export async function getDualSessionLogs(projectDir: string, options: SessionOptions = {}): Promise<{
  currentSession: SessionSummary;
  previousSession: SessionSummary;
}> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const jsonlFiles = await getJSONLFiles(projectDir);

  // Current session = most recent file, Previous session = second most recent file
  const currentFile = jsonlFiles[0] || null;
  const previousFile = jsonlFiles[1] || null;

  const currentSession = await processSessionFile(currentFile, opts);
  const previousSession = await processSessionFile(previousFile, opts);

  return { currentSession, previousSession };
}

/**
 * Legacy function for backward compatibility - returns current session content only
 */
export async function getLatestConversationLog(projectDir: string, maxEntries: number = 100): Promise<string> {
  try {
    const { currentSession } = await getDualSessionLogs(projectDir, {
      maxEntriesPerSession: maxEntries,
      maxCharsPerSession: 50000, // Large limit for compatibility
      maxCharsPerMessage: 500,    // Original limit
    });

    return currentSession.filteredMessages.length > 0
      ? currentSession.filteredMessages.join('\n')
      : 'No conversation log found for this session.';
  } catch (error) {
    return `Error reading conversation log: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Get current session information - lightweight check using only session ID
 */
export async function getCurrentSessionInfo(projectDir?: string): Promise<{
  sessionId: string;
  projectDir: string;
  conversationAvailable: boolean;
}> {
  const detectedProjectDir = projectDir || process.cwd();
  const sessionId = await getCurrentSessionId(detectedProjectDir);
  const jsonlFiles = await getJSONLFiles(detectedProjectDir);

  return {
    sessionId,
    projectDir: detectedProjectDir,
    conversationAvailable: jsonlFiles.length > 0,
  };
}
