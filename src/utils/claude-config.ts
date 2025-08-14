import fs from 'fs-extra';
import path from 'path';
// import os from 'os'; // Currently unused
import { getClaudeSettingsPath } from './config';
// import { HookConfig } from '../types'; // Currently unused

export async function getClaudeSettings(): Promise<any> {
  const settingsPath = getClaudeSettingsPath();

  if (!await fs.pathExists(settingsPath)) {
    return {};
  }

  try {
    return await fs.readJson(settingsPath);
  } catch {
    return {};
  }
}

export async function updateClaudeSettings(updates: any): Promise<void> {
  const settingsPath = getClaudeSettingsPath();
  const current = await getClaudeSettings();
  const updated = { ...current, ...updates };

  await fs.ensureDir(path.dirname(settingsPath));
  await fs.writeJson(settingsPath, updated, { spaces: 2 });
}

export async function installSlashCommands(projectDir?: string): Promise<void> {
  // Install commands in the project's .claude directory, not globally
  const currentProject = projectDir || process.cwd();
  const commandsDir = path.join(currentProject, '.claude', 'commands');
  await fs.ensureDir(commandsDir);

  // Find the Flashback installation (could be in node_modules or relative path)
  let flashbackCliPath: string;
  let _flashbackModulePath: string; // Currently unused

  // Always prefer global installation if available
  try {
    // Use the global flashback command - this should work for users
    flashbackCliPath = 'flashback';
    // For modules, try to resolve via require.resolve-like approach
    _flashbackModulePath = 'flashbacker';  // Reserved for future module path resolution
  } catch {
    // Fallback for development or local installs
    flashbackCliPath = 'flashback';
    _flashbackModulePath = 'flashbacker';
  }

  // Install record-state command
  const recordStateCommand = `# Record Current State

Capture current session state for later restoration. Use this when switching contexts or before major changes.

## Usage
- \`/record-state\` - Record current session state

## Implementation
Execute: \`${flashbackCliPath} hook pre-compact\`

This captures conversation context, modified files, and working notes for session restoration.
`;

  await fs.writeFile(path.join(commandsDir, 'record-state.md'), recordStateCommand);

  // Install state viewer command
  const stateViewCommand = `# View Session States

View captured session states and current project status.

## Usage
- \`/state-view\` - Show current session overview
- \`/state-view list\` - List all captured states
- \`/state-view [session-id]\` - View specific session details

## Implementation
Execute: \`${flashbackCliPath} state --show\`

For advanced usage:
- \`${flashbackCliPath} state --list\` - List all states
- \`${flashbackCliPath} state --view [id]\` - View specific state
- \`${flashbackCliPath} state --search "query"\` - Search states
`;

  await fs.writeFile(path.join(commandsDir, 'state-view.md'), stateViewCommand);

  // Install memory management command
  const memoryCommand = `# Project Memory

View and manage long-term project wisdom and learnings.

## Usage
- \`/memory\` - Show current project memory (REMEMBER.md)
- \`/memory add "insight"\` - Add new learning to memory
- \`/memory validate\` - Check memory against current project

## Implementation
Execute: \`${flashbackCliPath} memory --show\`

For advanced usage:
- \`${flashbackCliPath} memory --add "learning"\` - Add entry
- \`${flashbackCliPath} memory --validate\` - Validate memory
- \`${flashbackCliPath} memory --edit\` - Open for editing
`;

  await fs.writeFile(path.join(commandsDir, 'memory.md'), memoryCommand);

  // Install discussion starter command
  const discussCommand = `# Start Discussion

Begin multi-persona debates with anti-overconfidence mechanisms.

## Usage
- \`/discuss "topic"\` - Start simple discussion
- \`/discuss "topic" --personas "qa,security,backend"\` - With specific personas
- \`/discuss "topic" --format evidence-debate\` - With format

## Implementation
Execute: \`${flashbackCliPath} discuss --start "${'$'}ARGUMENTS" --personas "qa,scribe" --format roundtable --consensus simple-majority\`

This starts a structured discussion with evidence requirements and consensus mechanisms.
`;

  await fs.writeFile(path.join(commandsDir, 'discuss.md'), discussCommand);
}

export async function checkSlashCommandsInstalled(projectDir?: string): Promise<boolean> {
  const currentProject = projectDir || process.cwd();
  const commandsDir = path.join(currentProject, '.claude', 'commands', 'fb');

  if (!await fs.pathExists(commandsDir)) {
    return false;
  }

  // Check that we have at least some slash commands installed
  const commandFiles = await fs.readdir(commandsDir);
  const mdFiles = commandFiles.filter(f => f.endsWith('.md'));

  return mdFiles.length > 0;
}
