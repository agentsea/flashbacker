import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getProjectDirectory } from '../utils/config';
import { getDualSessionLogs } from '../utils/conversation-logs';

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
    const claudeDir = path.join(projectDir, '.claude');
    const flashbackDir = path.join(claudeDir, 'flashback');

    console.log('# Session Capture Context for Claude Analysis\n');

    // 1. Output AI Analysis Prompt
    const promptPath = path.join(flashbackDir, 'prompts', 'session-summary.md');
    if (await fs.pathExists(promptPath)) {
      const prompt = await fs.readFile(promptPath, 'utf-8');
      console.log('## AI Analysis Prompt:');
      console.log(prompt);
      console.log('');
    } else {
      console.log('⚠️  AI prompt not found at .claude/flashback/prompts/session-summary.md\n');
    }

    // 2. Get dual session logs (same as session-start)
    const { currentSession, previousSession } = await getDualSessionLogs(projectDir);

    console.log('## Session Information');
    console.log(`- **Current Session**: ${currentSession.sessionId} (${currentSession.totalMessages} messages)`);
    console.log(`- **Previous Session**: ${previousSession.sessionId} (${previousSession.totalMessages} messages)`);
    console.log(`- **Project Directory**: ${projectDir}`);
    console.log('');

    // 3. Load REMEMBER.md (project memory) 
    const rememberPath = path.join(flashbackDir, 'memory', 'REMEMBER.md');
    if (await fs.pathExists(rememberPath)) {
      const rememberContent = await fs.readFile(rememberPath, 'utf-8');
      console.log('## Project Memory (REMEMBER.md)');
      console.log('```markdown');
      console.log(rememberContent);
      console.log('```');
      console.log('');
    } else {
      console.log('## Project Memory (REMEMBER.md)');
      console.log('*No project memory found*');
      console.log('');
    }

    // 4. Load WORKING_PLAN.md (current development plan)
    const workingPlanPath = path.join(flashbackDir, 'memory', 'WORKING_PLAN.md');
    if (await fs.pathExists(workingPlanPath)) {
      const workingPlanContent = await fs.readFile(workingPlanPath, 'utf-8');
      console.log('## Current Working Plan');
      console.log('```markdown');
      console.log(workingPlanContent);
      console.log('```');
      console.log('');
    } else {
      console.log('## Current Working Plan');
      console.log('*No working plan found*');
      console.log('');
    }

    // 5. Current session context
    if (currentSession.filteredMessages.length > 0) {
      console.log('## Current Session Context');
      console.log(`*${currentSession.truncationInfo}*`);
      console.log('```');
      console.log(currentSession.filteredMessages.join('\n'));
      console.log('```');
      console.log('');
    } else {
      console.log('## Current Session Context');
      console.log('*No current session content*');
      console.log('');
    }

    // 6. Git Analysis (enhanced)
    console.log('## Git Analysis');
    const gitAnalysis = await getDetailedGitAnalysis(projectDir);
    console.log(gitAnalysis);
    console.log('');

    // 7. Analysis Instructions
    console.log('## Analysis Instructions');
    console.log('Based on the above context:');
    console.log('1. Review the project memory and working plan for context');
    console.log('2. Analyze the current session conversation for accomplishments');
    console.log('3. Extract key decisions, problems solved, and learning moments');
    console.log('4. Create a session summary capturing what was actually done');
    console.log('5. Focus on concrete changes, files modified, and next steps identified');
    console.log('');

  } catch (error) {
    console.error(chalk.red('Error gathering session context:'), error instanceof Error ? error.message : String(error));
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
  const archiveDir = path.join(projectDir, '.claude', 'flashback', 'memory', 'ARCHIVE', 'sessions');

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
