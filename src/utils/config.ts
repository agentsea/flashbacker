import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { FlashbackConfig } from '../types';

export function getClaudeSettingsPath(): string {
  return path.join(os.homedir(), '.claude', 'settings.json');
}

export async function getFlashbackConfig(projectDir: string): Promise<FlashbackConfig | null> {
  const configPath = path.join(projectDir, '.claude', 'flashback', 'config', 'flashback.json');

  if (!await fs.pathExists(configPath)) {
    return null;
  }

  try {
    return await fs.readJson(configPath);
  } catch {
    return null;
  }
}

export async function createDefaultConfig(projectDir: string): Promise<FlashbackConfig> {
  const configDir = path.join(projectDir, '.claude');
  await fs.ensureDir(configDir);

  const config: FlashbackConfig = {
    claude_settings_path: getClaudeSettingsPath(),
    state_directory: path.join(projectDir, '.claude', 'flashback', 'state'),
    archive_after_days: 30,
    default_persona: undefined,
    auto_archive: true,
  };

  const configPath = path.join(configDir, 'config', 'flashback.json');
  await fs.writeJson(configPath, config, { spaces: 2 });

  return config;
}

export async function updateConfig(projectDir: string, updates: Partial<FlashbackConfig>): Promise<void> {
  const current = await getFlashbackConfig(projectDir) || await createDefaultConfig(projectDir);
  const updated = { ...current, ...updates };

  const configPath = path.join(projectDir, '.claude', 'flashback', 'config', 'flashback.json');
  await fs.writeJson(configPath, updated, { spaces: 2 });
}

/**
 * Automatically detect the project directory by looking for .claude/flashback/config/flashback.json
 * starting from the current directory and walking up the directory tree.
 *
 * @param startDir - Directory to start search from (defaults to process.cwd())
 * @returns Promise<string | null> - Project directory path or null if not found
 */
export async function detectProjectDirectory(startDir?: string): Promise<string | null> {
  const start = startDir || process.cwd();
  let currentDir = path.resolve(start);

  // Walk up the directory tree
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const configPath = path.join(currentDir, '.claude', 'flashback', 'config', 'flashback.json');

    if (await fs.pathExists(configPath)) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);

    // If we've reached the root directory, stop searching
    if (parentDir === currentDir) {
      break;
    }

    currentDir = parentDir;
  }

  return null;
}

/**
 * Detect any project directory by looking for common project indicators
 * starting from the current directory and walking up the directory tree.
 *
 * @param startDir - Directory to start search from (defaults to process.cwd())
 * @returns Promise<string> - Project directory path (defaults to current working directory)
 */
export async function detectCurrentProjectDirectory(startDir?: string): Promise<string> {
  const start = startDir || process.cwd();
  let currentDir = path.resolve(start);

  // Common project root indicators
  const projectIndicators = [
    'package.json',
    '.git',
    'pyproject.toml',
    'Cargo.toml',
    'composer.json',
    'pom.xml',
    'build.gradle',
    'go.mod',
    'requirements.txt',
    'Makefile',
    'tsconfig.json',
  ];

  // Walk up the directory tree
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Check for any project indicators
    for (const indicator of projectIndicators) {
      const indicatorPath = path.join(currentDir, indicator);
      if (await fs.pathExists(indicatorPath)) {
        return currentDir;
      }
    }

    const parentDir = path.dirname(currentDir);

    // If we've reached the root directory, return current working directory
    if (parentDir === currentDir) {
      return process.cwd();
    }

    currentDir = parentDir;
  }
}

/**
 * Get project directory, using automatic detection if not provided
 *
 * @param explicitDir - Explicitly provided project directory
 * @returns Promise<string> - Project directory path
 * @throws Error if no project directory found
 */
export async function getProjectDirectory(explicitDir?: string): Promise<string> {
  if (explicitDir) {
    return path.resolve(explicitDir);
  }

  const detected = await detectProjectDirectory();
  if (!detected) {
    throw new Error(
      'No Flashback project found. Either:\n' +
      '1. Run this command from within a Flashback-initialized project directory\n' +
      '2. Specify the project directory with --project <dir>\n' +
      '3. Initialize Flashback in the current directory with: flashback init',
    );
  }

  return detected;
}
