import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getProjectDirectory, getClaudeSettingsPath } from '../utils/config';

interface StatuslineOptions {
  deregister?: boolean;
  global?: boolean;
}

async function removeStatuslineFromSettings(settingsPath: string): Promise<boolean> {
  if (!await fs.pathExists(settingsPath)) return false;
  try {
    const raw = await fs.readFile(settingsPath, 'utf-8');
    const json = JSON.parse(raw || '{}');
    let changed = false;

    if (json.statusLine) {
      delete json.statusLine;
      changed = true;
    }
    if (json.hooks && json.hooks.SessionStart) {
      delete json.hooks.SessionStart;
      if (Object.keys(json.hooks).length === 0) {
        delete json.hooks;
      }
      changed = true;
    }

    if (changed) {
      await fs.ensureDir(path.dirname(settingsPath));
      await fs.writeFile(settingsPath, JSON.stringify(json, null, 2));
    }
    return changed;
  } catch (err) {
    throw new Error(`Failed to update ${settingsPath}: ${err instanceof Error ? err.message : String(err)}`);
  }
}

export async function statuslineCommand(options: StatuslineOptions): Promise<void> {
  try {
    if (options.deregister) {
      const projectDir = await getProjectDirectory();
      const projectSettingsPath = path.join(projectDir, '.claude', 'settings.json');

      const changedProject = await removeStatuslineFromSettings(projectSettingsPath);
      console.log(chalk.green(`🧹 Project status line ${changedProject ? 'deregistered' : 'already clean'} (${projectSettingsPath})`));

      if (options.global) {
        const globalPath = getClaudeSettingsPath();
        const changedGlobal = await removeStatuslineFromSettings(globalPath);
        console.log(chalk.green(`🧹 Global settings ${changedGlobal ? 'cleaned' : 'already clean'} (${globalPath})`));
      }

      console.log(chalk.green('✅ Deregistration complete'));
      return;
    }

    console.log(chalk.yellow('No action specified. Try: --deregister [--global]'));
  } catch (error) {
    console.error(chalk.red('❌ Failed to manage status line:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}


