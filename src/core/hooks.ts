import fs from 'fs-extra';
import path from 'path';
import { getClaudeSettings, updateClaudeSettings } from '../utils/claude-config';

export async function registerHooks(projectDir: string): Promise<void> {
  const scriptsDir = path.join(projectDir, '.claude', 'flashback', 'scripts');

  // Write hooks to PROJECT-LEVEL settings to ensure precedence over global
  const projectSettingsPath = path.join(projectDir, '.claude', 'settings.json');
  let settings: any = {};
  if (await fs.pathExists(projectSettingsPath)) {
    try {
      settings = JSON.parse(await fs.readFile(projectSettingsPath, 'utf-8'));
    } catch {
      settings = {};
    }
  }
  settings.hooks = settings.hooks || {};

  // SessionStart hooks: run session-start.sh and clear statusline cache
  settings.hooks.SessionStart = [
    {
      hooks: [{
        type: 'command',
        command: `bash "${path.join(scriptsDir, 'session-start.sh')}"`,
      }],
    },
    {
      hooks: [{
        type: 'command',
        command: `bash -lc 'rm -f "$CLAUDE_PROJECT_DIR/.claude/statusline/state.json"'`
      }],
    },
  ];

  await fs.ensureDir(path.dirname(projectSettingsPath));
  await fs.writeFile(projectSettingsPath, JSON.stringify(settings, null, 2));
}

export async function checkHooksInstalled(projectDir?: string): Promise<boolean> {
  if (projectDir) {
    const projectSettingsPath = path.join(projectDir, '.claude', 'settings.json');
    if (!await fs.pathExists(projectSettingsPath)) return false;
    try {
      const settings = JSON.parse(await fs.readFile(projectSettingsPath, 'utf-8'));
      return !!(settings.hooks?.SessionStart?.length);
    } catch {
      return false;
    }
  }
  const settings = await getClaudeSettings();
  return !!(settings.hooks?.SessionStart?.length);
}

export async function unregisterHooks(projectDir?: string): Promise<void> {
  if (projectDir) {
    const projectSettingsPath = path.join(projectDir, '.claude', 'settings.json');
    if (!await fs.pathExists(projectSettingsPath)) return;
    try {
      const settings = JSON.parse(await fs.readFile(projectSettingsPath, 'utf-8'));
      if (!settings.hooks) return;
      delete settings.hooks.PreCompact;
      delete settings.hooks.SessionStart;
      await fs.writeFile(projectSettingsPath, JSON.stringify(settings, null, 2));
      return;
    } catch {
      return;
    }
  }

  // Fallback: operate on global if no projectDir specified
  const settings = await getClaudeSettings();
  if (!settings.hooks) return;
  delete settings.hooks.PreCompact;
  delete settings.hooks.SessionStart;
  await updateClaudeSettings(settings);
}
