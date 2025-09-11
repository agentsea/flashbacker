import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { promisify } from 'util';
import { registerHooks, unregisterHooks } from '../core/hooks';
import { getRequiredFlashbackDirectories } from '../utils/file-utils';
import os from 'os';

const execAsync = promisify(require('child_process').exec);

interface InitOptions {
  refresh?: boolean;
  clean?: boolean;
  mcp?: boolean;
  mcpOnly?: boolean;
  statuslineRegister?: boolean;
}

export async function initCommand(options: InitOptions): Promise<void> {
  console.log(chalk.blue('🔄 Initializing Flashback...'));

  try {
    const cwd = process.cwd();
    const claudeDir = path.join(cwd, '.claude');
    const flashbackDir = path.join(claudeDir, 'flashback');
    const configPath = path.join(claudeDir, 'flashback', 'config', 'flashback.json');

    // Handle MCP-only installation
    if (options.mcpOnly) {
      console.log(chalk.blue('🔌 MCP-only installation requested'));
      console.log(chalk.gray('🔌 Installing MCP servers...'));
      await installMcpServers(cwd);
      console.log(chalk.green('✅ MCP servers installed successfully!'));
      console.log(chalk.gray('\nNext steps:'));
      console.log(chalk.gray('  • Restart Claude Code to load the new MCP servers'));
      console.log(chalk.gray('  • MCP servers: context7, playwright, sequential-thinking'));
      return;
    }

    // Check for existing Claude frameworks before any destructive operations
    await checkForExistingFrameworks(cwd);

    // FAILSAFE: If Flashback is already initialized and no options specified, default to --refresh
    // This prevents accidental memory nuking when user runs `flashback init` in initialized project
    if (await fs.pathExists(flashbackDir) && !options.refresh && !options.clean) {
      console.log(chalk.yellow('⚠️  Flashback already initialized - defaulting to --refresh to preserve memory'));
      console.log(chalk.gray('   To start completely fresh, use: flashback init --clean'));
      console.log(chalk.gray('   This is a safety feature to prevent accidental memory loss'));
      console.log('');

      // Auto-enable refresh mode
      options.refresh = true;
    }

    // Check if already initialized (after failsafe logic)
    if (await fs.pathExists(configPath) && !options.refresh && !options.clean) {
      console.log(chalk.yellow('⚠️ Flashback already initialized.'));
      console.log(chalk.gray('   Use --refresh to update while preserving memory'));
      console.log(chalk.gray('   Use --clean to start completely fresh'));
      return;
    }

    // Handle clean install - only remove Flashback parts, preserve other frameworks
    if (options.clean) {
      if (await fs.pathExists(flashbackDir)) {
        console.log(chalk.red('🧹 Clean install requested - removing existing Flashback installation'));
        await fs.remove(flashbackDir);
      }

      // Also remove Flashback-specific commands
      const fbCommandsDir = path.join(claudeDir, 'commands', 'fb');
      if (await fs.pathExists(fbCommandsDir)) {
        console.log(chalk.gray('   🗑️  Removing Flashback slash commands'));
        await fs.remove(fbCommandsDir);
      }

      // Remove Flashback-specific agents
      const agentsDir = path.join(claudeDir, 'agents');
      if (await fs.pathExists(agentsDir)) {
        await cleanupFlashbackAgents(agentsDir);
      }
    }

    // Create proper directory structure
    console.log(chalk.gray('📁 Creating .claude directory structure...'));
    await createProperClaudeStructure(cwd);

    // Clean up obsolete directories during refresh
    if (options.refresh) {
      await cleanupObsoleteDirectories(cwd);
    }

    // Copy scripts to .claude/scripts/
    console.log(chalk.gray('📜 Installing hook scripts...'));
    await installHookScripts(cwd);

    // Install statusline monitor
    console.log(chalk.gray('📟 Installing status line monitor...'));
    await installStatuslineMonitor(cwd);

    // Create persona templates
    console.log(chalk.gray('🎭 Installing persona templates...'));
    await installPersonaTemplates(cwd);

    // Create agent definitions
    console.log(chalk.gray('🤖 Installing agent definitions...'));
    await installAgentDefinitions(cwd);

    // Install memory templates
    console.log(chalk.gray('🧠 Installing memory templates...'));
    await installMemoryTemplates(cwd);

    // Create slash commands
    console.log(chalk.gray('⚡ Installing slash commands...'));
    await installSlashCommands(cwd);

    // Install AI prompts
    console.log(chalk.gray('🤖 Installing AI prompts...'));
    await installAIPrompts(cwd);

    // Create configuration
    console.log(chalk.gray('⚙️ Creating configuration...'));
    await createConfiguration(cwd, options);

    // Initialize memory system
    console.log(chalk.gray('🧠 Initializing memory system...'));
    await initializeMemorySystem(cwd, options);

    // Generate PM2 ecosystem configuration
    try {
      console.log(chalk.gray('🧩 Generating PM2 ecosystem configuration...'));
      await generatePm2Ecosystem(cwd, options);
      console.log(chalk.green('   ✅ PM2 ecosystem configuration generated'));
    } catch (err) {
      console.log(chalk.yellow(`   ⚠️  Could not generate PM2 ecosystem config: ${err instanceof Error ? err.message : String(err)}`));
    }

    // Update .gitignore
    console.log(chalk.gray('🔒 Updating .gitignore...'));
    await ensureGitignoreProtection(cwd);

    // Register hooks (purge old ones first)
    if (!options.mcpOnly) {
      console.log(chalk.gray('🪝 Registering hooks...'));
      await registerHooksForProject(cwd);
    }

    // Install MCP servers if requested
    if (options.mcp) {
      console.log(chalk.gray('🔌 Installing MCP servers...'));
      await installMcpServers(cwd);
    }

    // Optionally register statusline in Claude settings
    if (options.statuslineRegister) {
      console.log(chalk.gray('📟 Registering status line command in Claude settings...'));
      await registerStatuslineCommand(cwd);
      console.log(chalk.green('   ✅ Status line command registered'));
    }

    console.log(chalk.green('✅ Flashback initialized successfully!'));
    console.log(chalk.gray('\nNext steps:'));
    console.log(chalk.gray('  • Run `flashback status` to verify installation'));
    console.log(chalk.gray('  • Use `flashback memory --show` to view project memory'));
    console.log(chalk.gray('  • Use `/fb:persona` to see available AI personas'));
    console.log(chalk.gray('  • Use `/fb:save-session` before context compaction'));
    console.log(chalk.gray('  • Start background daemon: `flashback daemon --start`'));
    console.log(chalk.gray('  • Check daemon: `flashback daemon --status` and `--logs`'));

  } catch (error) {
    console.error(chalk.red('❌ Failed to initialize Flashback:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}
/**
 * Generate PM2 ecosystem configuration under the project
 */
async function generatePm2Ecosystem(projectDir: string, options: InitOptions): Promise<void> {
  const pm2Dir = path.join(projectDir, '.claude', 'flashback', 'scripts', 'pm2');
  const ecosystemPath = path.join(pm2Dir, 'ecosystem.config.js');

  await fs.ensureDir(pm2Dir);

  // Create a unique per-project app name preferring project_name from config
  const realProjectDir: string = fs.realpathSync(projectDir);
  let projectSlug = path.basename(realProjectDir);
  try {
    const cfgRaw = await fs.readFile(path.join(realProjectDir, '.claude', 'flashback', 'config', 'flashback.json'), 'utf-8');
    const cfg = JSON.parse(cfgRaw);
    if (cfg?.project_name) {
      projectSlug = String(cfg.project_name);
    }
  } catch {}
  // sanitize projectSlug
  projectSlug = projectSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const appName = `flashback-daemon-${projectSlug}`;
  const projectPathEscaped = projectDir.replace(/\\/g, '\\\\');
  // Absolute path to the compiled daemon entry, relative to this compiled file
  const daemonScript = path.join(__dirname, '..', 'daemon', 'index.js');

  const ecosystemContent = `module.exports = {
  apps: [
    {
      name: ${JSON.stringify(appName)},
      script: ${JSON.stringify(daemonScript)},
      cwd: ${JSON.stringify(realProjectDir)},
      watch: false,
      max_memory_restart: '150M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
`;

  // Overwrite if refresh requested or file missing
  if (options.refresh || !await fs.pathExists(ecosystemPath)) {
    await fs.writeFile(ecosystemPath, ecosystemContent);
  }
}

/**
 * Create proper .claude directory structure with flashback namespace
 */
async function createProperClaudeStructure(projectDir: string): Promise<void> {
  const claudeDir = path.join(projectDir, '.claude');
  const flashbackDir = path.join(claudeDir, 'flashback');

  // Create flashback directories (templates/.claude/flashback/)
  const directories = await getRequiredFlashbackDirectories();
  for (const dir of directories) {
    await fs.ensureDir(path.join(flashbackDir, dir));
  }

  // Create agents directory (templates/.claude/agents/)
  await fs.ensureDir(path.join(claudeDir, 'agents'));
}

/**
 * Copy hook scripts from templates to .claude/flashback/scripts/
 */
async function installHookScripts(projectDir: string): Promise<void> {
  const scriptsDir = path.join(projectDir, '.claude', 'flashback', 'scripts');
  await fs.ensureDir(scriptsDir);

  try {
    const templatesScriptsDir = path.join(__dirname, '..', '..', 'templates', '.claude', 'flashback', 'scripts');
    let bundledScripts: string[] = [];

    // Get script templates dynamically
    if (await fs.pathExists(templatesScriptsDir)) {
      const scriptTemplates = await fs.readdir(templatesScriptsDir);
      bundledScripts = scriptTemplates.filter(file => file.endsWith('.sh'));

      // Copy all script templates
      for (const scriptFile of bundledScripts) {
        const templatePath = path.join(templatesScriptsDir, scriptFile);
        const scriptPath = path.join(scriptsDir, scriptFile);
        await fs.copy(templatePath, scriptPath);
        await fs.chmod(scriptPath, 0o755);
      }
    } else {
      // Fallback: create essential session-start.sh if no templates
      const fallbackContent = `#!/bin/bash
# Flashback Session Start Hook
cd "$(dirname "$0")/.."
exec flashback session-start --context
`;
      const scriptPath = path.join(scriptsDir, 'session-start.sh');
      await fs.writeFile(scriptPath, fallbackContent);
      await fs.chmod(scriptPath, 0o755);
      bundledScripts = ['session-start.sh'];
    }

    // Sync directory - remove scripts not in bundle (now dynamic)
    await syncScriptsDirectory(scriptsDir, bundledScripts);

    console.log(chalk.green('   ✅ Hook scripts installed'));
  } catch (error) {
    throw new Error(`Failed to install hook scripts: ${error instanceof Error ? error.message : String(error)}`);
  }
}


/**
 * Install statusline monitor scripts (claude_context_monitor.js)
 */
async function installStatuslineMonitor(projectDir: string): Promise<void> {
  const statusDir = path.join(projectDir, '.claude', 'statusline');
  const templatesDir = path.join(__dirname, '..', '..', 'templates', '.claude', 'statusline');

  try {
    await fs.ensureDir(statusDir);

    if (!await fs.pathExists(templatesDir)) {
      console.log(chalk.gray('   ℹ️  No bundled statusline templates found'));
      return;
    }

    const copyRecursive = async (srcDir: string, dstDir: string): Promise<void> => {
      await fs.ensureDir(dstDir);
      const entries = await fs.readdir(srcDir);
      for (const entry of entries) {
        const srcPath = path.join(srcDir, entry);
        const dstPath = path.join(dstDir, entry);
        const stat = await fs.stat(srcPath);
        if (stat.isDirectory()) {
          await copyRecursive(srcPath, dstPath);
        } else {
          await fs.copy(srcPath, dstPath);
          // Make JS scripts executable
          if (entry.endsWith('.js')) {
            await fs.chmod(dstPath, 0o755);
          }
        }
      }
    };

    await copyRecursive(templatesDir, statusDir);
    console.log(chalk.green('   ✅ Status line monitor installed'));
  } catch (error) {
    throw new Error(`Failed to install status line monitor: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Register statusline command in global Claude settings (~/.claude/settings.json)
 */
async function registerStatuslineCommand(projectDir: string): Promise<void> {
  try {
    const home = os.homedir();
    const settingsDir = path.join(home, '.claude');
    const settingsPath = path.join(settingsDir, 'settings.json');
    await fs.ensureDir(settingsDir);

    const statusCmd = path.join(projectDir, '.claude', 'statusline', 'claude_context_monitor.js');

    let settings: any = {};
    if (await fs.pathExists(settingsPath)) {
      try {
        const raw = await fs.readFile(settingsPath, 'utf-8');
        settings = JSON.parse(raw);
      } catch {
        settings = {};
      }
    }

    // Set or replace statusLine command
    settings.statusLine = {
      type: 'command',
      command: statusCmd,
      padding: 0,
    };

    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
  } catch (error) {
    throw new Error(`Failed to register status line: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Install persona templates
 */
async function installPersonaTemplates(projectDir: string): Promise<void> {
  const personaDir = path.join(projectDir, '.claude', 'flashback', 'personas');
  const templatesDir = path.join(__dirname, '..', '..', 'templates', '.claude', 'flashback', 'personas');

  try {
    // Copy persona templates from templates directory
    const templateFiles = await fs.readdir(templatesDir);

    for (const file of templateFiles) {
      if (file.endsWith('.md')) {
        await fs.copy(
          path.join(templatesDir, file),
          path.join(personaDir, file),
        );
      }
    }

    console.log(chalk.green(`   ✅ Persona templates installed (${templateFiles.filter(f => f.endsWith('.md')).length} professional personas)`));
  } catch (error) {
    throw new Error(`Failed to install persona templates: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Install agent definitions
 */
async function installAgentDefinitions(projectDir: string): Promise<void> {
  const agentDir = path.join(projectDir, '.claude', 'agents');
  const templatesDir = path.join(__dirname, '..', '..', 'templates', '.claude', 'agents');

  try {
    // Copy agent definitions from templates directory
    const templateFiles = await fs.readdir(templatesDir);

    for (const file of templateFiles) {
      // Agent files don't have extensions, copy all files
      await fs.copy(
        path.join(templatesDir, file),
        path.join(agentDir, file),
      );
    }

    console.log(chalk.green(`   ✅ Agent definitions installed (${templateFiles.length} specialized agents)`));
  } catch (error) {
    throw new Error(`Failed to install agent definitions: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Install slash commands to fb/ subdirectory for /fb: namespace
 */
async function installSlashCommands(projectDir: string): Promise<void> {
  const commandsDir = path.join(projectDir, '.claude', 'commands', 'fb');
  const templatesDir = path.join(__dirname, '..', '..', 'templates', '.claude', 'commands', 'fb');

  try {
    // Copy command templates from templates directory
    const templateFiles = await fs.readdir(templatesDir);

    for (const file of templateFiles) {
      if (file.endsWith('.md')) {
        await fs.copy(
          path.join(templatesDir, file),
          path.join(commandsDir, file),
        );
      }
    }

    // Sync directory - remove commands not in bundle
    const bundledCommands = templateFiles.filter(f => f.endsWith('.md'));
    await syncCommandsDirectory(commandsDir, bundledCommands);

    console.log(chalk.green('   ✅ Slash commands installed'));
  } catch (error) {
    throw new Error(`Failed to install slash commands: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Install memory templates (REMEMBER.md and WORKING_PLAN.md)
 */
async function installMemoryTemplates(projectDir: string): Promise<void> {
  const memoryDir = path.join(projectDir, '.claude', 'flashback', 'memory');
  const templatesDir = path.join(__dirname, '..', '..', 'templates', '.claude', 'flashback', 'memory');

  try {
    // Copy memory templates from templates directory
    const templateFiles = await fs.readdir(templatesDir);

    for (const file of templateFiles) {
      if (file.endsWith('.md')) {
        const targetPath = path.join(memoryDir, file);

        // Only install if file doesn't already exist (preserve existing memory)
        if (!await fs.pathExists(targetPath)) {
          await fs.copy(
            path.join(templatesDir, file),
            targetPath,
          );
        }
      }
    }

    console.log(chalk.green('   ✅ Memory templates installed'));
  } catch (error) {
    throw new Error(`Failed to install memory templates: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Install AI analysis prompts
 */
async function installAIPrompts(projectDir: string): Promise<void> {
  const promptsDir = path.join(projectDir, '.claude', 'flashback', 'prompts');
  const templatesDir = path.join(__dirname, '..', '..', 'templates', '.claude', 'flashback', 'prompts');

  try {
    // Copy AI prompt templates recursively (supports subdirectories like agents/)
    const copyRecursive = async (srcDir: string, dstDir: string): Promise<void> => {
      await fs.ensureDir(dstDir);
      const entries = await fs.readdir(srcDir);
      for (const entry of entries) {
        const srcPath = path.join(srcDir, entry);
        const dstPath = path.join(dstDir, entry);
        const stat = await fs.stat(srcPath);
        if (stat.isDirectory()) {
          await copyRecursive(srcPath, dstPath);
        } else if (entry.endsWith('.md')) {
          await fs.copy(srcPath, dstPath);
        }
      }
    };

    await copyRecursive(templatesDir, promptsDir);

    console.log(chalk.green('   ✅ AI prompts installed (recursive)'));
  } catch (error) {
    throw new Error(`Failed to install AI prompts: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Create configuration file from template
 */
function deepMerge(target: any, source: any): any {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return source;
  const result: any = Array.isArray(target) ? [...target] : { ...target };
  for (const key of Object.keys(source)) {
    if (key in result) {
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

async function createConfiguration(projectDir: string, options: InitOptions): Promise<void> {
  const configPath = path.join(projectDir, '.claude', 'flashback', 'config', 'flashback.json');
  const templatePath = path.join(__dirname, '..', '..', 'templates', '.claude', 'flashback', 'config', 'flashback.json.template');

  // Get version from package.json dynamically
  const getFlashbackVersion = (): string => {
    try {
      const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
      const packageJson = require(packageJsonPath);
      return packageJson.version;
    } catch (error) {
      return '2.0.5'; // Fallback version
    }
  };

  try {
    if (await fs.pathExists(templatePath)) {
      // Use bundled template
      let templateContent = await fs.readFile(templatePath, 'utf-8');

      // Replace template variables
      templateContent = templateContent
        .replace('{{VERSION}}', getFlashbackVersion())
        .replace('{{PROJECT_NAME}}', path.basename(projectDir))
        .replace('{{TIMESTAMP}}', new Date().toISOString());

      // Merge with existing config on refresh to preserve user values
      if (options.refresh && await fs.pathExists(configPath)) {
        try {
          const existingRaw = await fs.readFile(configPath, 'utf-8');
          const existing = JSON.parse(existingRaw);
          const templ = JSON.parse(templateContent);
          // Existing values win over defaults; ensure version/timestamps from template retained
          const merged = deepMerge(templ, existing);
          merged.version = templ.version;
          merged.initialized = templ.initialized;
          await fs.writeFile(configPath, JSON.stringify(merged, null, 2));
        } catch {
          await fs.writeFile(configPath, templateContent);
        }
      } else {
        await fs.writeFile(configPath, templateContent);
      }
      console.log(chalk.green('   ✅ Configuration created from template'));
    } else {
      // Fallback for development/testing
      const config = {
        version: getFlashbackVersion(),
        project_name: path.basename(projectDir),
        initialized: new Date().toISOString(),
        memory: {
          max_archived_sessions: 10,
          max_archived_working_plans: 10,
        },
        hooks: {
          session_start_enabled: true,
        },
      };

      await fs.writeJson(configPath, config, { spaces: 2 });
      console.log(chalk.green('   ✅ Configuration created (fallback)'));
    }
  } catch (error) {
    throw new Error(`Failed to create configuration: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Initialize memory system from template
 */
async function initializeMemorySystem(projectDir: string, options: InitOptions): Promise<void> {
  const memoryPath = path.join(projectDir, '.claude', 'flashback', 'memory', 'REMEMBER.md');

  // Check if memory file already exists (refresh case)
  if (await fs.pathExists(memoryPath) && !options.clean) {
    console.log(chalk.green('   ✅ Preserving existing REMEMBER.md'));
    return;
  }

  // Use bundled template
  const templatePath = path.join(__dirname, '..', '..', 'templates', '.claude', 'flashback', 'memory', 'REMEMBER.md');

  try {
    if (await fs.pathExists(templatePath)) {
      // Use bundled template with variable replacement
      let templateContent = await fs.readFile(templatePath, 'utf-8');
      templateContent = templateContent.replace('{{PROJECT_NAME}}', path.basename(projectDir));

      await fs.writeFile(memoryPath, templateContent);
      console.log(chalk.green('   ✅ Memory system initialized from template'));
    } else {
      // Fallback for development/testing
      const memoryTemplate = `# Project Memory: ${path.basename(projectDir)}

> **Long-term project knowledge that survives context compactions**
> This file captures essential project wisdom, patterns, and lessons learned.

## Key Learnings

*Add important insights and patterns as you discover them*

## Critical Paths & Locations

*Document important file locations and system components*

## Forbidden Commands & Patterns

*Commands or patterns that should NOT be used*

## Common Mistakes to Avoid

*Patterns that have caused problems before*

## Project Patterns & Conventions

*Coding standards and architectural decisions*

## Dependencies & Requirements

*Important system requirements and dependencies*

---
*This file is user-editable and version-controlled.*`;

      await fs.writeFile(memoryPath, memoryTemplate);
      console.log(chalk.green('   ✅ Memory system initialized (fallback)'));
    }
  } catch (error) {
    throw new Error(`Failed to initialize memory system: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Check for existing Claude Code frameworks and warn if found
 */
async function checkForExistingFrameworks(projectDir: string): Promise<void> {
  const claudeDir = path.join(projectDir, '.claude');

  if (!await fs.pathExists(claudeDir)) {
    return; // No .claude directory exists yet
  }

  try {
    const contents = await fs.readdir(claudeDir);
    const otherFrameworks = contents.filter(item =>
      item !== 'flashback' &&
      item !== 'commands' &&
      item !== 'agents' &&
      !item.startsWith('.'), // Ignore hidden files
    );

    if (otherFrameworks.length > 0) {
      console.log(chalk.yellow('⚠️  Detected other Claude Code frameworks:'));
      for (const framework of otherFrameworks) {
        console.log(chalk.yellow(`   📦 ${framework}/`));
      }
      console.log(chalk.gray('   Flashback will coexist safely with existing frameworks.'));
      console.log('');
    }
  } catch (error) {
    // If we can't read the directory, that's fine - continue with installation
    console.log(chalk.gray('   Could not detect existing frameworks - continuing...'));
  }
}

/**
 * Remove only Flashback-specific agent files (dynamic template scanning)
 */
async function cleanupFlashbackAgents(agentsDir: string): Promise<void> {
  try {
    // Get Flashback agent templates dynamically - same source of truth as installation
    const templatesDir = path.join(__dirname, '..', '..', 'templates', '.claude', 'agents');

    if (!await fs.pathExists(templatesDir)) {
      console.log(chalk.gray('   ℹ️  No agent templates found for cleanup'));
      return;
    }

    // Scan template directory to get actual Flashback agents
    const flashbackAgentTemplates = await fs.readdir(templatesDir);
    const flashbackAgents = flashbackAgentTemplates.filter(file =>
      file.endsWith('.md'), // Only .md files are agent definitions
    );

    console.log(chalk.gray(`   🔍 Found ${flashbackAgents.length} Flashback agent templates to clean`));

    // Remove each Flashback agent found in templates
    for (const agentFile of flashbackAgents) {
      const agentPath = path.join(agentsDir, agentFile);
      if (await fs.pathExists(agentPath)) {
        await fs.remove(agentPath);
        console.log(chalk.gray(`   🗑️  Removed Flashback agent: ${agentFile}`));
      }
    }

    if (flashbackAgents.length === 0) {
      console.log(chalk.gray('   ℹ️  No Flashback agents to clean (template directory empty)'));
    }
  } catch (error) {
    console.log(chalk.yellow(`   ⚠️  Could not cleanup Flashback agents: ${error instanceof Error ? error.message : String(error)}`));
  }
}

/**
 * Update .gitignore with Claude Code frameworks protection (improved)
 */
async function ensureGitignoreProtection(projectDir: string): Promise<void> {
  const gitignorePath = path.join(projectDir, '.gitignore');

  const claudeCodeBlock = `
# Claude Code frameworks (exclude all)
.claude/
`;

  const claudeCodeMarker = '# Claude Code frameworks';
  const flashbackMarker = '# Flashback - Claude Code state management'; // Legacy marker

  try {
    let gitignoreContent = '';
    let hasClaudeProtection = false;

    if (await fs.pathExists(gitignorePath)) {
      gitignoreContent = await fs.readFile(gitignorePath, 'utf-8');
      hasClaudeProtection = gitignoreContent.includes(claudeCodeMarker) || gitignoreContent.includes(flashbackMarker);
    }

    if (!hasClaudeProtection) {
      if (gitignoreContent && !gitignoreContent.endsWith('\n')) {
        gitignoreContent += '\n';
      }

      gitignoreContent += claudeCodeBlock;
      await fs.writeFile(gitignorePath, gitignoreContent);
      console.log(chalk.green('   ✅ Updated .gitignore (Claude Code frameworks protection)'));
    } else {
      console.log(chalk.gray('   ℹ️  .gitignore already has Claude Code protection'));
    }

  } catch (error) {
    console.log(chalk.yellow(`   ⚠️  Could not update .gitignore: ${error instanceof Error ? error.message : String(error)}`));
  }
}

/**
 * Register hooks for this project, purging any old hooks first
 */
async function registerHooksForProject(cwd: string): Promise<void> {
  try {
    // First, purge any existing hooks for this project
    await unregisterHooks(cwd);
    console.log(chalk.gray('   🧹 Purged old hooks for this project'));

    // Now register fresh hooks
    await registerHooks(cwd);
    console.log(chalk.gray('   ✅ Hooks registered successfully'));

  } catch (error) {
    console.log(chalk.yellow(`   ⚠️  Could not register hooks: ${error instanceof Error ? error.message : String(error)}`));
  }
}

/**
 * Sync scripts directory - remove files not in bundle
 */
async function syncScriptsDirectory(targetDir: string, bundledFiles: string[]): Promise<void> {
  try {
    if (!await fs.pathExists(targetDir)) {
      return;
    }

    const bundledSet = new Set(bundledFiles);
    const targetFiles = await fs.readdir(targetDir);

    // Remove files that aren't in the bundle
    for (const file of targetFiles) {
      if (!bundledSet.has(file)) {
        const filePath = path.join(targetDir, file);
        await fs.remove(filePath);
        console.log(chalk.gray(`   🗑️  Removed obsolete script: ${file}`));
      }
    }

  } catch (error) {
    console.log(chalk.yellow(`   ⚠️  Could not sync scripts directory: ${error instanceof Error ? error.message : String(error)}`));
  }
}

/**
 * Sync commands directory - remove files not in bundle
 */
async function syncCommandsDirectory(targetDir: string, bundledFiles: string[]): Promise<void> {
  try {
    if (!await fs.pathExists(targetDir)) {
      return;
    }

    const bundledSet = new Set(bundledFiles);
    const targetFiles = await fs.readdir(targetDir);

    // Remove files that aren't in the bundle
    for (const file of targetFiles) {
      if (!bundledSet.has(file)) {
        const filePath = path.join(targetDir, file);
        await fs.remove(filePath);
        console.log(chalk.gray(`   🗑️  Removed obsolete command: ${file}`));
      }
    }

  } catch (error) {
    console.log(chalk.yellow(`   ⚠️  Could not sync commands directory: ${error instanceof Error ? error.message : String(error)}`));
  }
}

/**
 * Clean up obsolete directories from previous versions
 */
async function cleanupObsoleteDirectories(projectDir: string): Promise<void> {
  try {
    // Remove old .claude/flashback/commands/ directory (moved to .claude/commands/)
    const obsoleteCommandsDir = path.join(projectDir, '.claude', 'flashback', 'commands');
    if (await fs.pathExists(obsoleteCommandsDir)) {
      await fs.remove(obsoleteCommandsDir);
      console.log(chalk.gray('   🗑️  Removed obsolete .claude/flashback/commands/ directory'));
    }

  } catch (error) {
    console.log(chalk.yellow(`   ⚠️  Could not cleanup obsolete directories: ${error instanceof Error ? error.message : String(error)}`));
  }
}

/**
 * Install required MCP servers for Flashbacker
 */
async function installMcpServers(projectDir: string): Promise<void> {
  const mcpServers = [
    // Existing editor-oriented servers
    { name: 'context7', package: '@upstash/context7-mcp', command: 'npx', args: ['-y', '@upstash/context7-mcp'] },
    { name: 'playwright', package: 'mcp-playwright', command: 'npx', args: ['mcp-playwright'] },
    { name: 'sequential-thinking', package: '@modelcontextprotocol/server-sequential-thinking', command: 'npx', args: ['-y', '@modelcontextprotocol/server-sequential-thinking'] },

    // Core servers used by background agents
    { name: 'filesystem', package: '@modelcontextprotocol/server-filesystem', command: 'npx', args: ['-y', '@modelcontextprotocol/server-filesystem'] },
    // For git and shell servers we prefer uvx. We'll still verify availability below.
    { name: 'git', package: 'mcp-server-git', command: 'uvx', args: ['mcp-server-git'] },
    { name: 'shell', package: 'mcp-shell-server', command: 'uvx', args: ['mcp-shell-server'] },
  ];

  const claudeDir = path.join(projectDir, '.claude');
  const configPath = path.join(claudeDir, 'claude_desktop_config.json');

  // Ensure .claude directory exists
  await fs.ensureDir(claudeDir);

  try {
    // Check if npm is available
    try {
      await execAsync('npm --version');
    } catch (error) {
      throw new Error('npm is required to install MCP servers. Please install Node.js and npm.');
    }

    // Detect uv/uvx or suggest pipx for Python-based servers
    let hasUvx = false;
    try {
      await execAsync('uvx --version', { timeout: 5000 });
      hasUvx = true;
    } catch {
      // try uv as well; some envs alias uvx
      try {
        await execAsync('uv --version', { timeout: 5000 });
        // uv present but uvx may not be; still proceed with guidance
      } catch {}
    }

    // Install each MCP server globally (npm packages only); python ones require uvx/pipx
    console.log(chalk.gray('   📦 Installing MCP server packages...'));
    console.log(chalk.yellow('   ⚠️  MCP package installation is experimental - may require manual installation'));

    for (const server of mcpServers) {
      try {
        if (server.package.startsWith('@modelcontextprotocol/server-') || server.package === 'mcp-playwright' || server.package === '@upstash/context7-mcp' || server.package === '@modelcontextprotocol/server-sequential-thinking') {
          // Node-based packages installable via npm
          console.log(chalk.gray(`   ⬇️  Installing ${server.package}...`));
          await execAsync(`npm install -g ${server.package}`, { timeout: 60000 });
          console.log(chalk.green(`   ✅ ${server.name} installed`));
        } else if (server.package === 'mcp-server-git' || server.package === 'mcp-shell-server') {
          // Python-based servers; advise installation if uvx/pipx missing
          if (!hasUvx) {
            console.log(chalk.yellow(`   ⚠️  ${server.package} requires Python with uvx (preferred) or pipx.`));
            console.log(chalk.gray('      Guidance: Install uv from https://docs.astral.sh/uv/ or use: pipx install mcp-server-git / pipx install mcp-shell-server'));
          }
        }
      } catch (error) {
        console.log(chalk.yellow(`   ⚠️  Could not install ${server.name}: ${error instanceof Error ? error.message : String(error)}`));
        if (server.package === 'mcp-server-git' || server.package === 'mcp-shell-server') {
          console.log(chalk.gray(`   💡 Try manual install with uvx/pipx: uvx ${server.package} --help or pipx install ${server.package}`));
        } else {
          console.log(chalk.gray(`   💡 Try manual install: npm install -g ${server.package}`));
        }
        // Continue with configuration even if package install fails
      }
    }

    // Update Claude Code configuration
    console.log(chalk.gray('   ⚙️  Updating Claude Code configuration...'));
    await updateClaudeConfig(configPath, mcpServers);

    // Verify installations
    console.log(chalk.gray('   🔍 Verifying MCP server installations...'));
    await verifyMcpServers(mcpServers);

    console.log(chalk.green('   ✅ MCP servers installation complete'));
    console.log(chalk.yellow('   ⚠️  Restart Claude Code to load the new MCP servers'));

  } catch (error) {
    throw new Error(`MCP servers installation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Update Claude Code configuration to include MCP servers
 */
async function updateClaudeConfig(configPath: string, mcpServers: Array<{ name: string; package: string; command: string; args: string[] }>): Promise<void> {
  try {
    let config: any = {};

    // Read existing config if it exists
    if (await fs.pathExists(configPath)) {
      const configContent = await fs.readFile(configPath, 'utf-8');
      config = JSON.parse(configContent);
    }

    // Initialize mcpServers section if it doesn't exist
    if (!config.mcpServers) {
      config.mcpServers = {};
    }

    // Add each MCP server to config
    for (const server of mcpServers) {
      config.mcpServers[server.name] = {
        command: server.command,
        args: server.args,
      };
    }

    // Write updated config
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    console.log(chalk.green('   ✅ Claude Code configuration updated'));

  } catch (error) {
    throw new Error(`Failed to update Claude Code configuration: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Verify MCP server installations
 */
async function verifyMcpServers(mcpServers: Array<{ name: string; package: string; command: string; args: string[] }>): Promise<void> {
  for (const server of mcpServers) {
    try {
      // Try to run the MCP server with --help to verify it's installed
      const cmd = `${server.command} ${server.args.join(' ')} --help`;
      await execAsync(cmd, { timeout: 10000 });
      console.log(chalk.green(`   ✅ ${server.name} is working`));
    } catch (error) {
      console.log(chalk.yellow(`   ⚠️  ${server.name} verification failed - may need manual check`));
    }
  }
}

