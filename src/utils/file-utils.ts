import fs from 'fs-extra';
import path from 'path';

export async function ensureDirectoryExists(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

export async function fileExists(filePath: string): Promise<boolean> {
  return await fs.pathExists(filePath);
}

/**
 * Get the bundled templates directory path
 */
function getTemplatesDir(): string {
  // Prefer published package location (node_modules/flashbacker/templates)
  const publishedPath = path.join(__dirname, '..', '..', 'templates', '.claude', 'flashback');
  if (fs.pathExistsSync(publishedPath)) {
    return publishedPath;
  }

  // Fallback to development location (when running from source with different layout)
  const devPath = path.join(__dirname, '..', '..', '..', 'templates', '.claude', 'flashback');
  return devPath;
}

/**
 * Dynamically scan the bundled templates to determine required directory structure
 * This reads the actual template bundle instead of hardcoding paths
 */
export async function getRequiredFlashbackDirectories(): Promise<string[]> {
  const templatesDir = getTemplatesDir();

  if (!await fs.pathExists(templatesDir)) {
    // Fallback for development/testing - return minimal required structure
    return ['memory', 'config'];
  }

  const directories = new Set<string>();

  async function scanDirectory(dir: string, relativePath: string = ''): Promise<void> {
    try {
      const items = await fs.readdir(dir);

      // Add current directory to set if it's not the root
      if (relativePath) {
        directories.add(relativePath);
      }

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const itemRelativePath = relativePath ? path.join(relativePath, item) : item;

        const stats = await fs.stat(fullPath);
        if (stats.isDirectory()) {
          await scanDirectory(fullPath, itemRelativePath);
        }
      }
    } catch (error) {
      // Ignore errors for individual directories
    }
  }

  await scanDirectory(templatesDir);

  // Convert Set to sorted array for consistent output
  return Array.from(directories).sort();
}

/**
 * Dynamically scan the bundled templates to find core files that should exist
 * This reads the actual template bundle instead of hardcoding file paths
 */
export async function getRequiredFlashbackFiles(): Promise<string[]> {
  const templatesDir = getTemplatesDir();

  if (!await fs.pathExists(templatesDir)) {
    // Fallback for development/testing
    return ['memory/REMEMBER.md', 'memory/WORKING_PLAN.md', 'config/flashback.json'];
  }

  const files: string[] = [];

  async function scanForFiles(dir: string, relativePath: string = ''): Promise<void> {
    try {
      const items = await fs.readdir(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const itemRelativePath = relativePath ? path.join(relativePath, item) : item;

        const stats = await fs.stat(fullPath);
        if (stats.isFile()) {
          // Include core files that should exist after init
          let finalPath = itemRelativePath;

          // Handle .template files - they get renamed during init
          if (item.endsWith('.template')) {
            finalPath = itemRelativePath.replace('.template', '');
          }

          if (isCoreFile(finalPath)) {
            files.push(finalPath);
          }
        } else if (stats.isDirectory()) {
          await scanForFiles(fullPath, itemRelativePath);
        }
      }
    } catch (error) {
      // Ignore errors for individual items
    }
  }

  await scanForFiles(templatesDir);

  return files.sort();
}

/**
 * Determine if a file is a core file that should exist after initialization
 * Core files are essential for Flashback to function properly
 */
function isCoreFile(filePath: string): boolean {
  const corePatterns = [
    'memory/REMEMBER.md',
    'memory/WORKING_PLAN.md',
    'config/flashback.json',
    'scripts/session-start.sh',
  ];

  return corePatterns.some(pattern => filePath === pattern || filePath.endsWith(pattern));
}
