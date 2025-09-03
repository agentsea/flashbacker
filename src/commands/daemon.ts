import { promisify } from 'util';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';

const execAsync = promisify(require('child_process').exec);

export interface DaemonOptions {
  start?: boolean;
  stop?: boolean;
  restart?: boolean;
  status?: boolean;
  logs?: boolean;
  project?: string;
}

function getAppName(projectDir: string): string {
  const fs = require('fs');
  const path = require('path');
  const realProjectDir: string = fs.realpathSync(projectDir);
  let projectSlug: string = path.basename(realProjectDir);
  try {
    const cfgRaw = fs.readFileSync(path.join(realProjectDir, '.claude', 'flashback', 'config', 'flashback.json'), 'utf-8');
    const cfg = JSON.parse(cfgRaw);
    if (cfg && cfg.project_name) {
      projectSlug = String(cfg.project_name);
    }
  } catch {}
  projectSlug = projectSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `flashback-daemon-${projectSlug}`;
}

async function ensurePm2Available(): Promise<boolean> {
  try {
    await execAsync('pm2 -v');
    return true;
  } catch {
    console.log(chalk.yellow('⚠️  pm2 is not installed or not on PATH. Install with: npm install -g pm2'));
    return false;
  }
}

function getEcosystemPath(projectDir: string): string {
  return path.join(projectDir, '.claude', 'flashback', 'scripts', 'pm2', 'ecosystem.config.js');
}

export async function daemonCommand(opts: DaemonOptions): Promise<void> {
  const projectDir = opts.project ? path.resolve(opts.project) : process.cwd();
  const appName = getAppName(projectDir);
  const ecosystemPath = getEcosystemPath(projectDir);

  if (!await ensurePm2Available()) {
    process.exitCode = 1;
    return;
  }

  if (!(opts.start || opts.stop || opts.restart || opts.status || opts.logs)) {
    console.log(chalk.yellow('ℹ️  No action specified. Use one of --start | --stop | --restart | --status | --logs'));
    return;
  }

  if ((opts.start || opts.restart) && !await fs.pathExists(ecosystemPath)) {
    console.log(chalk.yellow('⚠️  PM2 ecosystem config not found. Run `flashback init --refresh` to generate it.'));
    console.log(chalk.gray(`   Expected: ${ecosystemPath}`));
    return;
  }

  try {
    if (opts.start) {
      console.log(chalk.gray('🚀 Starting daemon via PM2...'));
      // Ensure previous app definition is removed to pick up latest ecosystem config
      await execAsync(`pm2 delete ${appName} || true`);
      await execAsync(`pm2 start ${JSON.stringify(ecosystemPath)}`);
      console.log(chalk.green('✅ Daemon started'));
    }

    if (opts.stop) {
      console.log(chalk.gray('🛑 Stopping daemon via PM2...'));
      await execAsync(`pm2 delete ${appName}`);
      console.log(chalk.green('✅ Daemon stopped'));
    }

    if (opts.restart) {
      console.log(chalk.gray('🔄 Restarting daemon via PM2...'));
      await execAsync(`pm2 restart ${appName} || pm2 start ${JSON.stringify(ecosystemPath)}`);
      console.log(chalk.green('✅ Daemon restarted'));
    }

    if (opts.status) {
      console.log(chalk.gray('📊 Daemon status:'));
      const { stdout } = await execAsync(`pm2 show ${appName}`);
      console.log(stdout);
    }

    if (opts.logs) {
      console.log(chalk.gray('📜 Recent daemon logs:'));
      const { stdout } = await execAsync(`pm2 logs ${appName} --lines 100 --nostream`);
      console.log(stdout);
    }

  } catch (error) {
    console.log(chalk.red('❌ Daemon command failed'));
    console.log(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exitCode = 1;
  }
}


