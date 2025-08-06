import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getProjectDirectory } from '../utils/config';
import { getCurrentSessionId, getLatestConversationLog } from '../utils/conversation-logs';

interface SaveSessionOptions {
  context?: boolean;
  archive?: boolean;
  prune?: number;
}

export async function saveSessionCommand(options: SaveSessionOptions): Promise<void> {
  try {
    const projectDir = await getProjectDirectory();

    // Handle --context: output context for Claude slash command analysis
    if (options.context) {
      await outputSaveSessionContext(projectDir);
      return;
    }

    // Handle --archive: manually archive current session
    if (options.archive) {
      await manuallyArchiveCurrentSession(projectDir);
      return;
    }

    // Handle --prune: prune old sessions (default 10)
    if (options.prune !== undefined) {
      const keepCount = options.prune || 10;
      await pruneOldSessionsManually(projectDir, keepCount);
      return;
    }

    // Default: show help-like summary
    console.log(chalk.blue('💾 Flashback Session Capture'));
    console.log('');
    console.log('Capture meaningful session insights from conversation logs.');
    console.log('');
    console.log('Available commands:');
    console.log('  --context             Output context for Claude slash command analysis');
    console.log('  --archive             Archive current session to .claude/flashback/memory/ARCHIVE/sessions/');
    console.log('  --prune [N]           Prune old sessions, keeping N most recent (default: 10)');
    console.log('');
    console.log('Examples:');
    console.log('  flashback save-session --context');
    console.log('  flashback save-session --archive');
    console.log('  flashback save-session --prune 5');
    console.log('  /save-session         (within Claude Code for AI analysis)');

  } catch (error) {
    console.error(chalk.red('Error managing session capture:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function outputSaveSessionContext(projectDir: string): Promise<void> {
  try {
    console.log(chalk.blue('📊 Session Capture Context for Claude Analysis'));
    console.log('');

    // 1. Output AI Analysis Prompt
    const promptPath = path.join(projectDir, '.claude', 'flashback', 'prompts', 'session-summary.md');
    if (await fs.pathExists(promptPath)) {
      const prompt = await fs.readFile(promptPath, 'utf-8');
      console.log(chalk.green('## AI Analysis Prompt:'));
      console.log(prompt);
      console.log('');
    } else {
      console.log(chalk.yellow('⚠️  AI prompt not found at .claude/flashback/prompts/session-summary.md'));
    }

    // 2. Archive Previous Session (if exists) and prepare for new one
    await archivePreviousSession(projectDir);

    // 3. Output Recent Conversation Log
    console.log(chalk.green('## Recent Conversation Log:'));
    const sessionId = await getCurrentSessionId(projectDir);
    const conversationLog = await getLatestConversationLog(projectDir, 100);
    console.log(`Session: ${sessionId}`);
    console.log('');
    console.log(conversationLog);
    console.log('');

    // 4. Output Detailed Git Analysis
    console.log(chalk.green('## Git Analysis:'));
    const gitAnalysis = await getDetailedGitAnalysis(projectDir);
    console.log(gitAnalysis);
    console.log('');

    // 5. Skip Todo Status (placeholder functionality removed)

  } catch (error) {
    console.error(chalk.red('Error gathering session context:'), error instanceof Error ? error.message : String(error));
  }
}

async function archivePreviousSession(projectDir: string): Promise<void> {
  const currentSessionPath = path.join(projectDir, '.claude', 'flashback', 'memory', 'CURRENT_SESSION.md');

  if (await fs.pathExists(currentSessionPath)) {
    // Archive the previous session
    const archiveDir = path.join(projectDir, '.claude', 'flashback', 'memory', 'ARCHIVE', 'sessions');
    await fs.ensureDir(archiveDir);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archivePath = path.join(archiveDir, `session-${timestamp}.md`);

    await fs.copy(currentSessionPath, archivePath);
    console.log(chalk.blue('## Previous Session Summary:'));
    console.log(`Archived previous session to: ${path.relative(projectDir, archivePath)}`);
    console.log('');

    // Prune old sessions (keep last 10)
    await pruneOldSessions(archiveDir);
  } else {
    console.log(chalk.blue('## Previous Session Summary:'));
    console.log('No previous session found - this will create the first one.');
    console.log('');
  }
}

async function pruneOldSessions(archiveDir: string, maxSessions: number = 10): Promise<void> {
  try {
    const files = await fs.readdir(archiveDir);
    const sessionFiles = files
      .filter(f => f.startsWith('session-') && f.endsWith('.md'))
      .map(f => ({
        name: f,
        path: path.join(archiveDir, f),
        stat: fs.statSync(path.join(archiveDir, f)),
      }))
      .sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime());

    if (sessionFiles.length > maxSessions) {
      const toDelete = sessionFiles.slice(maxSessions);
      for (const file of toDelete) {
        await fs.remove(file.path);
      }
      console.log(chalk.dim(`🗑️  Pruned ${toDelete.length} old session(s), keeping ${maxSessions} most recent`));
    }
  } catch (error) {
    console.log(chalk.yellow(`⚠️  Could not prune old sessions: ${error instanceof Error ? error.message : String(error)}`));
  }
}

async function getDetailedGitAnalysis(projectDir: string): Promise<string> {
  try {
    const { execSync } = require('child_process');

    // Get detailed git status
    const gitStatus = execSync('git status --porcelain', { cwd: projectDir, encoding: 'utf-8' });
    const gitBranch = execSync('git branch --show-current', { cwd: projectDir, encoding: 'utf-8' }).trim();

    let lastCommit = '';
    try {
      lastCommit = execSync('git log -1 --oneline', { cwd: projectDir, encoding: 'utf-8' }).trim();
    } catch {
      lastCommit = 'No commits found';
    }

    const statusLines = gitStatus.trim().split('\n').filter((line: string) => line.trim());

    let analysis = '';
    analysis += `Current branch: ${gitBranch}\n`;
    analysis += `Last commit: ${lastCommit}\n`;
    analysis += `Total files changed: ${statusLines.length}\n\n`;

    if (statusLines.length > 0) {
      const added = statusLines.filter((line: string) => line.startsWith('A ') || line.startsWith('??'));
      const modified = statusLines.filter((line: string) => line.startsWith(' M') || line.startsWith('M '));
      const deleted = statusLines.filter((line: string) => line.startsWith(' D') || line.startsWith('D '));

      analysis += 'Files by change type:\n';
      if (added.length > 0) {
        analysis += `  Added (${added.length}):\n`;
        added.forEach((line: string) => {
          analysis += `    - ${line.substring(3)}\n`;
        });
      }
      if (modified.length > 0) {
        analysis += `  Modified (${modified.length}):\n`;
        modified.forEach((line: string) => {
          analysis += `    - ${line.substring(3)}\n`;
        });
      }
      if (deleted.length > 0) {
        analysis += `  Deleted (${deleted.length}):\n`;
        deleted.forEach((line: string) => {
          analysis += `    - ${line.substring(3)}\n`;
        });
      }
    } else {
      analysis += 'Working directory clean - no changes to commit\n';
    }

    return analysis;

  } catch (error) {
    return `Error getting git analysis: ${error instanceof Error ? error.message : String(error)}`;
  }
}


async function manuallyArchiveCurrentSession(projectDir: string): Promise<void> {
  const currentSessionPath = path.join(projectDir, '.claude', 'flashback', 'memory', 'CURRENT_SESSION.md');

  if (!await fs.pathExists(currentSessionPath)) {
    console.log(chalk.yellow('⚠️  No current session found to archive.'));
    return;
  }

  try {
    const archiveDir = path.join(projectDir, '.claude', 'flashback', 'memory', 'ARCHIVE', 'sessions');
    await fs.ensureDir(archiveDir);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archivePath = path.join(archiveDir, `session-${timestamp}.md`);

    await fs.copy(currentSessionPath, archivePath);
    await fs.remove(currentSessionPath);

    console.log(chalk.green('✅ Session archived successfully:'));
    console.log(`   ${chalk.cyan(path.relative(projectDir, archivePath))}`);
    console.log('');
    console.log(chalk.dim('💡 Current session cleared. Use /save-session to create a new one.'));

  } catch (error) {
    console.error(chalk.red('❌ Error archiving session:'), error instanceof Error ? error.message : String(error));
  }
}

async function pruneOldSessionsManually(projectDir: string, keepCount: number): Promise<void> {
  const archiveDir = path.join(projectDir, '.claude', 'memory', 'ARCHIVE', 'sessions');

  if (!await fs.pathExists(archiveDir)) {
    console.log(chalk.yellow('⚠️  No archived sessions found to prune.'));
    return;
  }

  try {
    await pruneOldSessions(archiveDir, keepCount);
    console.log(chalk.green(`✅ Session pruning complete - keeping ${keepCount} most recent sessions.`));

  } catch (error) {
    console.error(chalk.red('❌ Error pruning sessions:'), error instanceof Error ? error.message : String(error));
  }
}

// getCurrentSessionId function removed - now using shared utility from conversation-logs.ts

// getLatestConversationLog function removed - now using shared utility from conversation-logs.ts

async function _getGitStatus(projectDir: string): Promise<string> { // Currently unused
  try {
    const { execSync } = require('child_process');
    const gitStatus = execSync('git status --porcelain', { cwd: projectDir, encoding: 'utf-8' });
    const gitStatusLong = execSync('git status', { cwd: projectDir, encoding: 'utf-8' });

    const statusLines = gitStatus.trim().split('\n').filter((line: string) => line.trim());
    const fileCount = statusLines.length;

    let summary = '';
    if (fileCount === 0) {
      summary = 'Working directory clean - no changes to commit';
    } else {
      const added = statusLines.filter((line: string) => line.startsWith('A ')).length;
      const modified = statusLines.filter((line: string) => line.startsWith(' M') || line.startsWith('M ')).length;
      const deleted = statusLines.filter((line: string) => line.startsWith(' D') || line.startsWith('D ')).length;
      const untracked = statusLines.filter((line: string) => line.startsWith('??')).length;

      summary = `Total files changed: ${fileCount} (added: ${added}, modified: ${modified}, deleted: ${deleted}, untracked: ${untracked})`;
    }

    return `${summary}\n\nDetailed Status:\n${gitStatusLong}`;

  } catch (error) {
    return `Error getting git status: ${error instanceof Error ? error.message : String(error)}`;
  }
}
