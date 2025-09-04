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

export async function discoverProjects(cwd: string): Promise<DiscoveredProject[]> {
  const env = process.env.FLASHBACK_PROJECTS_DIRS;
  if (!env) {
    return discoverProjectsFromCwd(cwd);
  }
  const dirs = env.split(',').map(s => s.trim()).filter(Boolean);
  const found: DiscoveredProject[] = [];
  for (const dir of dirs) {
    const abs = path.isAbsolute(dir) ? dir : path.join(cwd, dir);
    if (await fs.pathExists(path.join(abs, '.claude', 'flashback'))) {
      found.push({ projectPath: abs });
    }
  }
  return found.length > 0 ? found : discoverProjectsFromCwd(cwd);
}


