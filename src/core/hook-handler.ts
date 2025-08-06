import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { execFileSync } from 'child_process';

export async function handleHook(type: string, projectDir: string): Promise<void> {
  // Add hook execution logging
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Hook triggered: ${type} in ${projectDir}`;

  // Log to file for debugging
  const logPath = path.join(projectDir, '.claude', 'flashback', 'hook-execution.log');
  await fs.ensureDir(path.dirname(logPath));
  await fs.appendFile(logPath, logEntry + '\n');

  console.log(chalk.green(`🪝 ${logEntry}`));

  try {
    switch (type) {
      case 'session-start':
        await handleSessionStartHook(projectDir);
        break;

      default:
        console.error(`Unknown hook type: ${type}`);
        process.exit(1);
    }

    // Log successful completion
    const successEntry = `[${new Date().toISOString()}] Hook completed: ${type}`;
    await fs.appendFile(logPath, successEntry + '\n');
    console.log(chalk.green(`✅ ${successEntry}`));

  } catch (error) {
    const errorEntry = `[${new Date().toISOString()}] Hook failed: ${type} - ${error instanceof Error ? error.message : String(error)}`;
    await fs.appendFile(logPath, errorEntry + '\n');
    console.error(`Hook handler failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}


/**
 * Simple session-start hook following hybrid AI+Computer pattern
 * Gathers context and lets Claude do the intelligent analysis
 */
async function handleSessionStartHook(projectDir: string): Promise<void> {
  console.log(chalk.blue('🔄 Flashback: Loading session context...'));

  try {
    // Find flashback binary
    const flashbackBin = await findFlashbackBinary();

    // Call session-start --context to gather project context
    const result = execFileSync(flashbackBin, ['session-start', '--context'], {
      cwd: projectDir,
      encoding: 'utf8',
      timeout: 30000, // 30 second timeout
    });

    console.log(chalk.green('🧠 Project context loaded successfully'));
    console.log(result); // Output the context for Claude Code to inject

  } catch (error) {
    console.log(chalk.yellow('⚠️  Failed to load project context:'), error instanceof Error ? error.message : String(error));
    console.log(chalk.gray('   Starting session without context restoration...'));
  }
}

/**
 * Find flashback binary in common locations
 */
async function findFlashbackBinary(): Promise<string> {
  const possiblePaths = [
    'flashback', // Assume it's in PATH
    path.join(process.cwd(), 'node_modules', '.bin', 'flashback'),
    path.join(process.env.HOME || '', '.npm-global', 'bin', 'flashback'),
  ];

  for (const testPath of possiblePaths) {
    try {
      execFileSync(testPath, ['--version'], { stdio: 'pipe' });
      return testPath;
    } catch {
      // Try next path
    }
  }

  return 'flashback'; // Default to PATH lookup
}
