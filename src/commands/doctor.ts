import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getClaudeSettingsPath, getFlashbackConfig } from '../utils/config';
import { getRequiredFlashbackDirectories, getRequiredFlashbackFiles } from '../utils/file-utils';

interface DoctorOptions {
  verbose?: boolean;
}

export async function doctorCommand(options: DoctorOptions): Promise<void> {
  console.log(chalk.blue('🔍 Running Flashback Diagnostics\n'));

  let issues = 0;

  try {
    // Check Node.js version
    console.log(chalk.blue('1. System Requirements'));
    const nodeVersion = process.version;
    const nodeMajor = parseInt(nodeVersion.slice(1).split('.')[0]);

    if (nodeMajor >= 16) {
      console.log(`   Node.js ${nodeVersion}: ${chalk.green('✓')}`);
    } else {
      console.log(`   Node.js ${nodeVersion}: ${chalk.red('✗ Requires Node.js 16+')}`);
      issues++;
    }

    // Check Claude Code installation
    console.log(chalk.blue('\n2. Claude Code Integration'));
    const claudeSettingsPath = getClaudeSettingsPath();

    if (await fs.pathExists(claudeSettingsPath)) {
      console.log(`   Claude settings found: ${chalk.green('✓')}`);

      if (options.verbose) {
        console.log(`     Location: ${claudeSettingsPath}`);
      }
    } else {
      console.log(`   Claude settings: ${chalk.red('✗ Not found')}`);
      console.log(`     ${chalk.gray('Run: npm install -g @anthropic-ai/claude-code')}`);
      issues++;
    }

    // Check project initialization
    console.log(chalk.blue('\n3. Project Setup'));
    const cwd = process.cwd();
    const flashbackDir = path.join(cwd, '.claude', 'flashback');

    if (await fs.pathExists(flashbackDir)) {
      console.log(`   Flashback initialized: ${chalk.green('✓')}`);

      // Check directory structure by dynamically scanning bundled templates
      const directories = await getRequiredFlashbackDirectories();

      for (const dir of directories) {
        const dirPath = path.join(flashbackDir, dir);
        const exists = await fs.pathExists(dirPath);
        console.log(`   ${dir}: ${exists ? chalk.green('✓') : chalk.yellow('?')}`);

        if (!exists && options.verbose) {
          console.log(`     ${chalk.gray('Missing directory - run: flashback init --refresh')}`);
        }
      }

      // Check core files by dynamically scanning bundled templates
      const coreFiles = await getRequiredFlashbackFiles();

      for (const file of coreFiles) {
        const filePath = path.join(flashbackDir, file);
        const exists = await fs.pathExists(filePath);
        console.log(`   ${file}: ${exists ? chalk.green('✓') : chalk.red('✗')}`);

        if (!exists) {
          issues++;
          console.log(`     ${chalk.gray('Run: flashback init --refresh')}`);
        }
      }
    } else {
      console.log(`   Flashback initialized: ${chalk.red('✗')}`);
      console.log(`     ${chalk.gray('Run: flashback init')}`);
      issues++;
    }

    // Check configuration
    console.log(chalk.blue('\n4. Configuration'));
    try {
      const config = await getFlashbackConfig(cwd);
      if (config) {
        console.log(`   Config file: ${chalk.green('✓')}`);

        if (options.verbose) {
          console.log(`     Archive after: ${config.archive_after_days || 'default'} days`);
          console.log(`     Default persona: ${config.default_persona || 'none'}`);
          console.log(`     Auto archive: ${config.auto_archive ? 'enabled' : 'disabled'}`);
        }
      } else {
        console.log(`   Config file: ${chalk.yellow('? Using defaults')}`);
      }
    } catch (error) {
      console.log(`   Config file: ${chalk.red('✗ Invalid')}`);
      if (options.verbose) {
        console.log(`     Error: ${error instanceof Error ? error.message : String(error)}`);
      }
      issues++;
    }

    // Check permissions
    console.log(chalk.blue('\n5. Permissions'));
    try {
      const testFile = path.join(flashbackDir, 'test-write');
      await fs.writeFile(testFile, 'test');
      await fs.remove(testFile);
      console.log(`   Write permissions: ${chalk.green('✓')}`);
    } catch (error) {
      console.log(`   Write permissions: ${chalk.red('✗')}`);
      if (options.verbose) {
        console.log(`     Error: ${error instanceof Error ? error.message : String(error)}`);
      }
      issues++;
    }

    // Summary
    console.log(chalk.blue('\n📋 Diagnostic Summary'));
    if (issues === 0) {
      console.log(chalk.green('✅ All checks passed! Flashback is working correctly.'));
    } else {
      console.log(chalk.yellow(`⚠️ Found ${issues} issue${issues === 1 ? '' : 's'} that may affect functionality.`));
    }

  } catch (error) {
    console.error(chalk.red('❌ Diagnostics failed:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}
