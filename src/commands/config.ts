import chalk from 'chalk';
import { getFlashbackConfig, createDefaultConfig, getProjectDirectory } from '../utils/config';

interface ConfigOptions {
  show?: boolean;
  reset?: boolean;
}

export async function configCommand(options: ConfigOptions): Promise<void> {
  try {
    const cwd = await getProjectDirectory();

    if (options.reset) {
      console.log(chalk.blue('🔄 Resetting configuration to defaults...'));
      await createDefaultConfig(cwd);
      console.log(chalk.green('✅ Configuration reset successfully'));
      return;
    }

    if (options.show) {
      console.log(chalk.blue('⚙️ Current Configuration:\n'));
      const config = await getFlashbackConfig(cwd);

      if (!config) {
        console.log(chalk.yellow('No configuration found. Run `flashback init` first.'));
        return;
      }

      console.log(`Claude settings path: ${config.claude_settings_path}`);
      console.log(`State directory: ${config.state_directory}`);
      console.log(`Archive after days: ${config.archive_after_days}`);
      console.log(`Default persona: ${config.default_persona || 'none'}`);
      console.log(`Auto-archive: ${config.auto_archive ? 'enabled' : 'disabled'}`);
      return;
    }

    // Default: show interactive config editor
    console.log(chalk.blue('⚙️ Configuration Management'));
    console.log(chalk.gray('Use --show to display current config'));
    console.log(chalk.gray('Use --reset to restore defaults'));

  } catch (error) {
    console.error(chalk.red('❌ Failed to manage configuration:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}
