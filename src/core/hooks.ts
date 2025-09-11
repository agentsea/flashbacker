import path from 'path';
import { getClaudeSettings, updateClaudeSettings } from '../utils/claude-config';

export async function registerHooks(projectDir: string): Promise<void> {
  const projectMatcher = path.basename(projectDir);
  const scriptsDir = path.join(projectDir, '.claude', 'flashback', 'scripts');

  const settings = await getClaudeSettings();
  settings.hooks = settings.hooks || {};

  // Register SessionStart hooks: existing session-start.sh and statusline cache clear
  // Per docs, SessionStart does not require a matcher; omit it so it always runs
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

  await updateClaudeSettings(settings);
}

export async function checkHooksInstalled(): Promise<boolean> {
  const settings = await getClaudeSettings();
  return !!(settings.hooks?.SessionStart?.length);
}

export async function unregisterHooks(projectDir?: string): Promise<void> {
  const settings = await getClaudeSettings();

  if (!settings.hooks) return;

  if (projectDir) {
    // Remove hooks only for this specific project
    const projectMatcher = path.basename(projectDir);

    // Remove PreCompact hooks for this project
    if (settings.hooks.PreCompact) {
      settings.hooks.PreCompact = settings.hooks.PreCompact.filter(
        (hook: any) => hook.matcher !== projectMatcher,
      );
      if (settings.hooks.PreCompact.length === 0) {
        delete settings.hooks.PreCompact;
      }
    }

    if (settings.hooks.SessionStart) {
      settings.hooks.SessionStart = settings.hooks.SessionStart.filter(
        (hook: any) => hook.matcher !== projectMatcher,
      );
      if (settings.hooks.SessionStart.length === 0) {
        delete settings.hooks.SessionStart;
      }
    }
  } else {
    // Remove all hooks (backwards compatibility)
    delete settings.hooks.PreCompact;
    delete settings.hooks.SessionStart;
  }

  await updateClaudeSettings(settings);
}
