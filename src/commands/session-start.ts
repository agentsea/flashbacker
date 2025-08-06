import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getProjectDirectory } from '../utils/config';
import { /* getCurrentSessionInfo, */ getDualSessionLogs } from '../utils/conversation-logs';

interface SessionStartOptions {
  context?: boolean;
}

export async function sessionStartCommand(options: SessionStartOptions): Promise<void> {
  try {
    const projectDir = await getProjectDirectory();
    const claudeDir = path.join(projectDir, '.claude');

    if (!await fs.pathExists(claudeDir)) {
      console.error(chalk.red('❌ Flashback not initialized. Run `flashback init` first.'));
      process.exit(1);
    }

    // Context mode - gather and output context for Claude
    if (options.context) {
      await outputSessionStartContext(projectDir);
      return;
    }

    // Default mode - show help/usage
    console.log(chalk.blue('🚀 Session Start'));
    console.log('');
    console.log('Available options:');
    console.log(chalk.cyan('  --context') + '  Output context for Claude session restoration');
    console.log('');
    console.log('Usage:');
    console.log(chalk.gray('  flashback session-start --context'));
    console.log(chalk.gray('  /session-start           # Manual slash command'));
  } catch (error) {
    console.error(chalk.red('❌ Session start failed:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function outputSessionStartContext(projectDir: string): Promise<void> {
  const claudeDir = path.join(projectDir, '.claude');
  const flashbackDir = path.join(claudeDir, 'flashback');

  console.log('# Session Start Context\n');

  // Get dual session logs
  const { currentSession, previousSession } = await getDualSessionLogs(projectDir);

  console.log('## Session Information');
  console.log(`- **Current Session**: ${currentSession.sessionId} (${currentSession.totalMessages} messages)`);
  console.log(`- **Previous Session**: ${previousSession.sessionId} (${previousSession.totalMessages} messages)`);
  console.log(`- **Project Directory**: ${projectDir}`);
  console.log('');

  // Load REMEMBER.md (project memory)
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

  // Load WORKING_PLAN.md (current development plan)
  const workingPlanPath = path.join(projectDir, '.claude', 'flashback', 'memory', 'WORKING_PLAN.md');
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

  // Current session context
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

  // Previous session context
  if (previousSession.filteredMessages.length > 0) {
    console.log('## Previous Session Context');
    console.log(`*${previousSession.truncationInfo}*`);
    console.log('```');
    console.log(previousSession.filteredMessages.join('\n'));
    console.log('```');
    console.log('');
  } else {
    console.log('## Previous Session Context');
    console.log('*No previous session found*');
    console.log('');
  }

  // Session restoration instructions
  console.log('## Session Restoration Instructions');
  console.log('Based on the above context:');
  console.log('1. Review the project memory to understand what this project is about');
  console.log('2. Check the working plan to see what was planned and what has been accomplished');
  console.log('3. Review the previous conversation to understand recent work and decisions');
  console.log('4. Provide a brief welcome message summarizing your understanding');
  console.log('5. Ask "What would you like to work on now?"');
  console.log('');
}
