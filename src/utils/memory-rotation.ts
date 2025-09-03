import fs from 'fs-extra';
import path from 'path';

export interface RotateOptions {
  archiveDir?: string;
  retainCount: number;
}

export async function rotateMemoryFile(projectDir: string, fileName: string, options: RotateOptions): Promise<void> {
  const flashbackMemoryDir = path.join(projectDir, '.claude', 'flashback', 'memory');
  const sourcePath = path.join(flashbackMemoryDir, fileName);
  const archiveDir = options.archiveDir ?? path.join(flashbackMemoryDir, 'ARCHIVE');

  if (!await fs.pathExists(sourcePath)) {
    return;
  }

  await fs.ensureDir(archiveDir);

  // Shift existing archives: <file>.N -> <file>.N+1 (descending to avoid clobber)
  for (let i = options.retainCount; i >= 1; i -= 1) {
    const from = path.join(archiveDir, `${fileName}.${i}`);
    const to = path.join(archiveDir, `${fileName}.${i + 1}`);
    if (await fs.pathExists(from)) {
      // Delete any overflow beyond retainCount
      if (i === options.retainCount) {
        await fs.remove(from);
      } else {
        await fs.move(from, to, { overwrite: true });
      }
    }
  }

  // Move current file to .1
  const archiveOne = path.join(archiveDir, `${fileName}.1`);
  await fs.copy(sourcePath, archiveOne, { overwrite: true });
}


