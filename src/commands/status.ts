import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getClaudeSettingsPath, getProjectDirectory } from '../utils/config';
import { checkHooksInstalled } from '../core/hooks';
import { checkSlashCommandsInstalled } from '../utils/claude-config';
import { getRequiredFlashbackDirectories, getRequiredFlashbackFiles } from '../utils/file-utils';

export async function statusCommand(): Promise<void> {
  console.log(chalk.blue('📊 Flashback Status\n'));

  try {
    const cwd = await getProjectDirectory();
    const flashbackDir = path.join(cwd, '.claude', 'flashback');

    // Check if Flashback is initialized
    const isInitialized = await fs.pathExists(flashbackDir);
    console.log(`🔄 Initialization: ${isInitialized ? chalk.green('✓ Initialized') : chalk.red('✗ Not initialized')}`);

    if (!isInitialized) {
      console.log(chalk.yellow('\n💡 Run `flashback init` to initialize Flashback in this project'));
      return;
    }

    // Check directory structure using dynamic scanning
    console.log('\n📁 Directory Structure:');
    const requiredDirs = await getRequiredFlashbackDirectories();

    for (const dir of requiredDirs) {
      const hasDir = await fs.pathExists(path.join(flashbackDir, dir));
      console.log(`  ${dir}: ${hasDir ? chalk.green('✓') : chalk.red('✗')}`);
    }

    // Check core files using dynamic scanning
    console.log('\n📄 Core Files:');
    const requiredFiles = await getRequiredFlashbackFiles();

    for (const file of requiredFiles) {
      const hasFile = await fs.pathExists(path.join(flashbackDir, file));
      console.log(`  ${file}: ${hasFile ? chalk.green('✓') : chalk.red('✗')}`);
    }

    // Check configuration
    console.log('\n⚙️ Configuration:');
    const configPath = path.join(flashbackDir, 'config', 'flashback.json');
    try {
      if (await fs.pathExists(configPath)) {
        const config = await fs.readJson(configPath);
        console.log(`  Config file: ${chalk.green('✓')}`);
        console.log(`  Version: ${config.version || 'unknown'}`);
        console.log(`  Project: ${config.project_name || 'unknown'}`);
        console.log(`  SessionStart hook: ${config.hooks?.session_start_enabled ? chalk.green('enabled') : chalk.yellow('disabled')}`);
      } else {
        console.log(`  Config file: ${chalk.red('✗')}`);
      }
    } catch (error) {
      console.log(`  Config file: ${chalk.red('✗ (corrupted)')}`);
    }

    // Check Claude Code integration
    console.log('\n🔗 Claude Code Integration:');
    const claudeSettingsPath = getClaudeSettingsPath();
    const hasClaudeSettings = await fs.pathExists(claudeSettingsPath);
    console.log(`  Claude settings: ${hasClaudeSettings ? chalk.green('✓') : chalk.red('✗')}`);

    if (hasClaudeSettings) {
      const hooksInstalled = await checkHooksInstalled();
      console.log(`  Hooks registered: ${hooksInstalled ? chalk.green('✓') : chalk.red('✗')}`);

      const slashCommandsInstalled = await checkSlashCommandsInstalled();
      console.log(`  Slash commands: ${slashCommandsInstalled ? chalk.green('✓') : chalk.red('✗')}`);
    }

    // Check memory system
    console.log('\n🧠 Memory System:');
    const rememberPath = path.join(flashbackDir, 'memory', 'REMEMBER.md');
    const workingPlanPath = path.join(flashbackDir, 'memory', 'WORKING_PLAN.md');

    const hasRemember = await fs.pathExists(rememberPath);
    const hasWorkingPlan = await fs.pathExists(workingPlanPath);

    console.log(`  REMEMBER.md: ${hasRemember ? chalk.green('✓') : chalk.red('✗')}`);
    console.log(`  WORKING_PLAN.md: ${hasWorkingPlan ? chalk.green('✓') : chalk.red('✗')}`);

    // Check persona templates
    console.log('\n🎭 AI Personas:');
    const personaDir = path.join(flashbackDir, 'personas');
    if (await fs.pathExists(personaDir)) {
      const personaFiles = await fs.readdir(personaDir);
      const personaCount = personaFiles.filter(f => f.endsWith('.md')).length;
      console.log(`  Available personas: ${chalk.green(personaCount)}`);
    } else {
      console.log(`  Persona templates: ${chalk.red('✗')}`);
    }

    // Check slash commands
    console.log('\n⚡ Slash Commands:');
    const commandsDir = path.join(cwd, '.claude', 'commands', 'fb');
    if (await fs.pathExists(commandsDir)) {
      const commandFiles = await fs.readdir(commandsDir);
      const commandCount = commandFiles.filter(f => f.endsWith('.md')).length;
      console.log(`  Available commands: ${chalk.green(commandCount)}`);
    } else {
      console.log(`  Slash commands: ${chalk.red('✗')}`);
    }

    console.log(`\n${chalk.green('✅ Status check complete!')}`);

    if (!isInitialized) {
      console.log(chalk.yellow('💡 Run `flashback init` to get started'));
    } else {
      console.log(chalk.gray('💡 Use `flashback doctor` for detailed diagnostics'));
    }

  } catch (error) {
    console.error(chalk.red('❌ Failed to check status:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}
