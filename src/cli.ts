#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { join } from 'path';
import { initCommand } from './commands/init';
import { statusCommand } from './commands/status';
import { configCommand } from './commands/config';
import { doctorCommand } from './commands/doctor';
import { memoryCommand } from './commands/memory';
import { workingPlanCommand } from './commands/working-plan';
import { saveSessionCommand } from './commands/save-session';
import { sessionStartCommand } from './commands/session-start';
import { personaCommand } from './commands/persona';
import { agentCommand } from './commands/agent';
import { debtHunterCommand } from './commands/debt-hunter';
import { getProjectDirectory } from './utils/config';

// Read version from package.json
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const program = new Command();

program
  .name('flashback')
  .description('Claude Code state management with session continuity and AI personas')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize Flashbacker in current project')
  .option('-r, --refresh', 'Refresh installation while preserving existing memory and state')
  .option('-c, --clean', 'Clean install - remove existing state and start fresh')
  .option('--mcp', 'Install with MCP servers (context7, playwright, sequential-thinking)')
  .option('--mcp-only', 'Only install MCP servers (skip template setup)')
  .action(initCommand);

program
  .command('status')
  .description('Show Flashbacker installation and configuration status')
  .action(statusCommand);

program
  .command('config')
  .description('Manage Flashbacker configuration')
  .option('-s, --show', 'Show current configuration')
  .option('-r, --reset', 'Reset to default configuration')
  .action(configCommand);

program
  .command('doctor')
  .description('Run diagnostics and check for issues')
  .option('-v, --verbose', 'Show detailed diagnostic information')
  .action(doctorCommand);




program
  .command('memory')
  .description('Manage long-term project memory and wisdom')
  .option('-s, --show', 'Display REMEMBER.md contents')
  .option('-a, --add <learning>', 'Add entry to project wisdom')
  .option('-r, --remove <pattern>', 'Remove entries matching pattern or text')
  .option('-e, --edit', 'Open REMEMBER.md for editing')
  .option('-v, --validate', 'Check memory against current project')
  .action(memoryCommand);

program
  .command('working-plan')
  .description('Manage development plans and track progress across sessions')
  .option('-s, --show', 'Display current WORKING_PLAN.md')
  .option('-c, --context', 'Output context for Claude slash command analysis')
  .option('-u, --update', 'Update plan based on recent session analysis')
  .option('-a, --archive', 'Archive current plan to .claude/memory/ARCHIVE/plans/')
  .option('-p, --prune [number]', 'Prune old plans, keeping N most recent (default: 10)', parseInt)
  .action(workingPlanCommand);

program
  .command('save-session')
  .description('Capture meaningful session insights from conversation logs')
  .option('-c, --context', 'Output context for Claude slash command analysis')
  .option('-a, --archive', 'Archive current session to .claude/memory/ARCHIVE/sessions/')
  .option('-p, --prune [number]', 'Prune old sessions, keeping N most recent (default: 10)', parseInt)
  .action(saveSessionCommand);

program
  .command('session-start')
  .description('Load project context for session restoration after compaction')
  .option('-c, --context', 'Output context for Claude session restoration')
  .action(sessionStartCommand);

program
  .command('persona [name]')
  .description('Specialized AI personas for focused analysis and expertise')
  .option('-c, --context <request>', 'Analyze request with specified persona')
  .option('-l, --list', 'List all available personas')
  .action(personaCommand);

program
  .command('agent')
  .description('Generate project context bundle for Claude Code agents')
  .option('-l, --list', 'List all available agents')
  .option('-c, --context', 'Generate project context bundle')
  .action(agentCommand);


program
  .command('debt-hunter')
  .description('Hunt down technical debt and code quality issues')
  .option('-s, --scan', 'Scan project for technical debt patterns')
  .option('-d, --duplicates', 'Detect duplicate/similar functions (limited heuristics)')
  .option('-c, --context', 'Output context for Claude AI analysis')
  .action(debtHunterCommand);

// Hidden hook commands (used by Claude Code hooks)
program
  .command('hook <type>')
  .description('Hook handler (internal use)')
  .option('--project <dir>', 'Project directory')
  .action(async (type, options) => {
    const { handleHook } = await import('./core/hook-handler');
    
    try {
      // Use automatic project detection if --project not provided
      const projectDir = await getProjectDirectory(options.project);
      await handleHook(type, projectDir);
    } catch (error) {
      console.error('❌ Hook execution failed:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Error handling
program.configureOutput({
  outputError: (str, write) => write(chalk.red(str))
});

// Handle unknown commands
program.on('command:*', () => {
  console.error(chalk.red('Unknown command:'), chalk.yellow(program.args.join(' ')));
  console.log('');
  program.outputHelp();
  process.exit(1);
});

program.parse();