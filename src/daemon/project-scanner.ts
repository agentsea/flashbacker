import fs from 'fs-extra';
import path from 'path';

export interface DiscoveredProject {
  projectPath: string;
}

/**
 * Very conservative project discovery: only the current working directory
 * if it contains a Flashbacker installation. Multi-project scan can be added later.
 */
export async function discoverProjectsFromCwd(cwd: string): Promise<DiscoveredProject[]> {
  const flashbackDir = path.join(cwd, '.claude', 'flashback');
  if (await fs.pathExists(flashbackDir)) {
    return [{ projectPath: cwd }];
  }
  return [];
}


