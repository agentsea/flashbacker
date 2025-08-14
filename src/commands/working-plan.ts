import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getProjectDirectory } from '../utils/config';
import { getCurrentSessionId, getLatestConversationLog } from '../utils/conversation-logs';

interface WorkingPlanOptions {
  show?: boolean;
  update?: boolean;
  archive?: boolean;
  context?: boolean;
  prune?: number;
}

export async function workingPlanCommand(options: WorkingPlanOptions): Promise<void> {
  try {
    const projectDir = await getProjectDirectory();

    // Handle --show: display current working plan
    if (options.show) {
      await showWorkingPlan(projectDir);
      return;
    }

    // Handle --context: output context for Claude slash command analysis
    if (options.context) {
      await outputWorkingPlanContext(projectDir);
      return;
    }

    // Handle --archive: archive current plan and create new one
    if (options.archive) {
      await manuallyArchiveCurrentPlan(projectDir);
      return;
    }

    // Handle --prune: prune old plans (default 10)
    if (options.prune !== undefined) {
      const keepCount = options.prune || 10;
      await pruneOldPlansManually(projectDir, keepCount);
      return;
    }

    // Handle --update: update current plan with session analysis
    if (options.update) {
      await updateWorkingPlan(projectDir);
      return;
    }

    // Default: show help-like summary
    console.log(chalk.blue('📋 Flashback Working Plan Management'));
    console.log('');
    console.log('Maintain current development plans and track progress across sessions.');
    console.log('');
    console.log('Available commands:');
    console.log('  --show                Display current WORKING_PLAN.md');
    console.log('  --context             Output context for Claude slash command analysis');
    console.log('  --update              Update plan based on recent session analysis');
    console.log('  --archive             Archive current plan to .claude/flashback/memory/ARCHIVE/plans/');
    console.log('  --prune [N]           Prune old plans, keeping N most recent (default: 10)');
    console.log('');
    console.log('Examples:');
    console.log('  flashback working-plan --show');
    console.log('  flashback working-plan --update');
    console.log('  flashback working-plan --archive');
    console.log('  flashback working-plan --prune 5');

  } catch (error) {
    console.error(chalk.red('Error managing working plan:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function showWorkingPlan(projectDir: string): Promise<void> {
  const planPath = getWorkingPlanPath(projectDir);

  if (!await fs.pathExists(planPath)) {
    console.log(chalk.yellow('⚠️  No WORKING_PLAN.md found. Creating template...'));
    await initializeWorkingPlan(projectDir);
    return;
  }

  try {
    const content = await fs.readFile(planPath, 'utf-8');

    console.log(chalk.blue('📋 Current Working Plan'));
    console.log('');
    console.log(content);

    // Show metadata
    const stats = await fs.stat(planPath);
    const size = formatBytes(stats.size);
    const modified = stats.mtime.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    console.log('');
    console.log(chalk.gray(`📊 Size: ${size} | Last modified: ${modified}`));

  } catch (error) {
    console.log(chalk.red(`❌ Error reading working plan: ${error instanceof Error ? error.message : String(error)}`));
  }
}

async function updateWorkingPlan(projectDir: string): Promise<void> {
  const planPath = getWorkingPlanPath(projectDir);

  // Ensure working plan exists
  if (!await fs.pathExists(planPath)) {
    await initializeWorkingPlan(projectDir);
  }

  try {
    console.log(chalk.blue('🤖 Analyzing conversation to update working plan...'));

    // TEMPLATE PATTERN IMPLEMENTATION:
    // 1. Load AI prompt
    const promptPath = path.join(projectDir, '.claude', 'flashback', 'prompts', 'working-plan-update.md');
    if (!await fs.pathExists(promptPath)) {
      throw new Error('AI prompt not found. Run `flashback init --refresh` to install prompts.');
    }
    const _prompt = await fs.readFile(promptPath, 'utf-8'); // Reserved for future template processing

    // 2. Gather context data
    const currentPlan = await fs.readFile(planPath, 'utf-8');
    const sessionId = await getCurrentSessionId();
    const conversationLog = await getLatestConversationLog(projectDir, 50);

    // 3. AI Analysis using Task tool
    console.log(chalk.dim('   📊 Loading conversation transcript...'));
    console.log(chalk.dim('   🧠 Analyzing session with AI...'));

    const contextData = `Current Working Plan:
${currentPlan}

Recent Conversation Log (Last 50 entries):
${conversationLog}

Current Session ID: ${sessionId}
Timestamp: ${new Date().toISOString()}`;

    // CRITICAL LIMITATION: Task tool only available within Claude Code sessions
    // External CLI commands cannot access Claude Code's Task tool directly
    //
    // SOLUTION: The AI analysis should happen via slash command (/working-plan)
    // within Claude Code, not via external `flashback working-plan` command
    //
    // For now, we have the infrastructure in place:
    // ✅ Prompt loaded from .claude/prompts/working-plan-update.md
    // ✅ Context gathered (current plan + conversation log)
    // ❌ AI analysis needs to be triggered from within Claude Code session

    console.log(chalk.yellow('⚠️  AI analysis available via /working-plan slash command only'));
    console.log(chalk.dim('   External CLI falls back to timestamp update...'));
    console.log(chalk.dim('   Use /working-plan within Claude Code for full AI analysis'));

    // Write context data to a temp file for slash command to use
    const contextPath = path.join(projectDir, '.claude', 'flashback', 'memory', 'working-plan-context.md');
    await fs.writeFile(contextPath, `# Working Plan Update Context

${contextData}

---
*This context was prepared by 'flashback working-plan --update'*
*Use /working-plan to analyze this context with AI*`);

    console.log(chalk.blue('📄 Context prepared for AI analysis'));
    console.log(chalk.dim(`   Saved to: ${contextPath}`));

    throw new Error('Use /working-plan slash command for AI analysis');

  } catch (error) {
    // Fallback to timestamp-only update if AI analysis fails
    console.log(chalk.yellow(`⚠️  AI analysis failed, falling back to timestamp update: ${error instanceof Error ? error.message : String(error)}`));
    await updateWorkingPlanTimestampOnly(projectDir);
  }
}

async function updateWorkingPlanTimestampOnly(projectDir: string): Promise<void> {
  const planPath = getWorkingPlanPath(projectDir);
  let content = await fs.readFile(planPath, 'utf-8');

  // Get current session ID
  const sessionId = await getCurrentSessionId();

  // Update the current session reference
  const sessionRegex = /\*\*Current Session\*\*: `[^`]+`/;
  const newSessionRef = `**Current Session**: \`${sessionId}\``;

  if (sessionRegex.test(content)) {
    content = content.replace(sessionRegex, newSessionRef);
  } else {
    content = content.replace(
      /## 📋 Session Continuity Reference/,
      `## 📋 Session Continuity Reference\n\n${newSessionRef}\n`,
    );
  }

  // Update timestamp
  const timestampRegex = /\*\*Last Updated\*\*: .*/;
  const newTimestamp = `**Last Updated**: ${new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}`;

  if (timestampRegex.test(content)) {
    content = content.replace(timestampRegex, newTimestamp);
  }

  await fs.writeFile(planPath, content);

  console.log(chalk.green('✅ Working plan updated (timestamp only)'));
  console.log(chalk.dim(`📝 Updated: ${planPath}`));
}

async function _archiveCurrentPlan(_projectDir: string): Promise<void> { // Reserved for future archive functionality
  const planPath = getWorkingPlanPath(_projectDir);
  const archiveDir = path.join(_projectDir, '.claude', 'flashback', 'memory', 'ARCHIVE', 'working_plans');

  if (!await fs.pathExists(planPath)) {
    console.log(chalk.yellow('⚠️  No current working plan to archive.'));
    return;
  }

  try {
    // Ensure archive directory exists
    await fs.ensureDir(archiveDir);

    // Create timestamped archive filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const archivePath = path.join(archiveDir, `WORKING_PLAN_${timestamp}.md`);

    // Copy current plan to archive
    await fs.copy(planPath, archivePath);

    // Clean up old archives (keep only 10 most recent)
    await cleanupOldArchives(archiveDir, 10);

    // Create fresh working plan
    await initializeWorkingPlan(_projectDir);

    console.log(chalk.green('✅ Working plan archived successfully'));
    console.log(chalk.dim(`📁 Archived to: ${archivePath}`));
    console.log(chalk.dim(`📝 Fresh plan created: ${planPath}`));

  } catch (error) {
    console.log(chalk.red(`❌ Error archiving working plan: ${error instanceof Error ? error.message : String(error)}`));
  }
}

async function initializeWorkingPlan(projectDir: string): Promise<void> {
  const planPath = getWorkingPlanPath(projectDir);
  const memoryDir = path.dirname(planPath);

  // Ensure memory directory exists
  await fs.ensureDir(memoryDir);

  const template = await generateWorkingPlanTemplate(projectDir);
  await fs.writeFile(planPath, template);

  console.log(chalk.green('✅ Created WORKING_PLAN.md template'));
  console.log(chalk.dim(`📝 Location: ${planPath}`));
}

async function generateWorkingPlanTemplate(projectDir: string): Promise<string> {
  const projectName = path.basename(projectDir);
  const sessionId = await getCurrentSessionId();
  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `# ${projectName} Development Plan

## 🎯 CURRENT STATUS

**Last Updated**: ${timestamp}  
**Current Session**: \`${sessionId}\`

### Current Phase
*Document current development phase and objectives*

### Active Tasks
*List tasks currently in progress*

### Completed Recently
*Recent accomplishments and milestones*

## 🚧 NEXT PRIORITIES

### Immediate Tasks (This Session)
1. *Add specific tasks for current work*
2. *Break down complex features into steps*
3. *Document any blockers or dependencies*

### Short Term (Next Sessions)
1. *Plan upcoming features or improvements*
2. *Technical debt or refactoring needs*
3. *Testing and validation requirements*

### Medium Term (Next Week)
1. *Larger features or architectural changes*
2. *Integration work or external dependencies*
3. *Documentation and deployment tasks*

## 🎯 SUCCESS CRITERIA

### Definition of Done
*What constitutes completion of current objectives*

### Quality Gates
*Testing, validation, and review requirements*

### Acceptance Criteria
*User-facing requirements and expectations*

## 📋 Session Continuity Reference

**Current Session**: \`${sessionId}\`  
**Session Focus**: *Brief description of current session goals*

**Previous Accomplishments**: *Key achievements from recent sessions*

**Context for Next Session**: *Important context to remember after compaction*

---
*This file is automatically managed by the /working-plan command*
*Last updated: ${new Date().toLocaleString('en-US')}*`;
}

// getCurrentSessionId function removed - now using shared utility from conversation-logs.ts

// getLatestConversationLog function removed - now using shared utility from conversation-logs.ts

async function cleanupOldArchives(archiveDir: string, maxFiles: number): Promise<void> {
  try {
    const files = await fs.readdir(archiveDir);
    const planFiles = files.filter(f => f.startsWith('WORKING_PLAN_') && f.endsWith('.md'));

    if (planFiles.length <= maxFiles) {
      return; // No cleanup needed
    }

    // Sort by filename (which includes timestamp) and remove oldest
    planFiles.sort();
    const filesToRemove = planFiles.slice(0, planFiles.length - maxFiles);

    for (const file of filesToRemove) {
      await fs.remove(path.join(archiveDir, file));
    }

    console.log(chalk.dim(`🧹 Cleaned up ${filesToRemove.length} old archived plans`));

  } catch (error) {
    // Ignore cleanup errors - not critical
  }
}

function getWorkingPlanPath(projectDir: string): string {
  return path.join(projectDir, '.claude', 'flashback', 'memory', 'WORKING_PLAN.md');
}

async function outputWorkingPlanContext(projectDir: string): Promise<void> {
  try {
    console.log(chalk.blue('📊 Working Plan Context for Claude Analysis'));
    console.log('');

    // 1. Output AI Analysis Prompt
    const promptPath = path.join(projectDir, '.claude', 'flashback', 'prompts', 'working-plan-update.md');
    if (await fs.pathExists(promptPath)) {
      const prompt = await fs.readFile(promptPath, 'utf-8');
      console.log(chalk.green('## AI Analysis Prompt:'));
      console.log(prompt);
      console.log('');
    } else {
      console.log(chalk.yellow('⚠️  AI prompt not found at .claude/flashback/prompts/working-plan-update.md'));
    }

    // 2. Output Current Working Plan
    const planPath = getWorkingPlanPath(projectDir);
    if (await fs.pathExists(planPath)) {
      const currentPlan = await fs.readFile(planPath, 'utf-8');
      console.log(chalk.green('## Current Working Plan:'));
      console.log(currentPlan);
      console.log('');
    } else {
      console.log(chalk.yellow('⚠️  Working plan not found - will be created'));
    }

    // 3. Output Recent Conversation Log
    console.log(chalk.green('## Recent Conversation Log:'));
    const sessionId = await getCurrentSessionId();
    const conversationLog = await getLatestConversationLog(projectDir, 50);
    console.log(`Session: ${sessionId}`);
    console.log('');
    console.log(conversationLog);

  } catch (error) {
    console.error(chalk.red('Error gathering working plan context:'), error instanceof Error ? error.message : String(error));
  }
}

async function manuallyArchiveCurrentPlan(projectDir: string): Promise<void> {
  const planPath = getWorkingPlanPath(projectDir);

  if (!await fs.pathExists(planPath)) {
    console.log(chalk.yellow('⚠️  No current working plan found to archive.'));
    return;
  }

  try {
    const archiveDir = path.join(projectDir, '.claude', 'flashback', 'memory', 'ARCHIVE', 'plans');
    await fs.ensureDir(archiveDir);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archivePath = path.join(archiveDir, `working-plan-${timestamp}.md`);

    await fs.copy(planPath, archivePath);
    await fs.remove(planPath);

    console.log(chalk.green('✅ Working plan archived successfully:'));
    console.log(`   ${chalk.cyan(path.relative(projectDir, archivePath))}`);
    console.log('');
    console.log(chalk.dim('💡 Current plan cleared. Use /working-plan to create a new one.'));

    // Create fresh template
    await initializeWorkingPlan(projectDir);

  } catch (error) {
    console.error(chalk.red('❌ Error archiving working plan:'), error instanceof Error ? error.message : String(error));
  }
}

async function pruneOldPlansManually(projectDir: string, keepCount: number): Promise<void> {
  const archiveDir = path.join(projectDir, '.claude', 'flashback', 'memory', 'ARCHIVE', 'plans');

  if (!await fs.pathExists(archiveDir)) {
    console.log(chalk.yellow('⚠️  No archived plans found to prune.'));
    return;
  }

  try {
    const files = await fs.readdir(archiveDir);
    const planFiles = files
      .filter(f => f.startsWith('working-plan-') && f.endsWith('.md'))
      .map(f => ({
        name: f,
        path: path.join(archiveDir, f),
        stat: fs.statSync(path.join(archiveDir, f)),
      }))
      .sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime());

    if (planFiles.length > keepCount) {
      const toDelete = planFiles.slice(keepCount);
      for (const file of toDelete) {
        await fs.remove(file.path);
      }
      console.log(chalk.green(`✅ Plan pruning complete - kept ${keepCount} most recent, removed ${toDelete.length} old plans.`));
    } else {
      console.log(chalk.blue(`ℹ️  Found ${planFiles.length} archived plans, all within keep limit of ${keepCount}.`));
    }

  } catch (error) {
    console.error(chalk.red('❌ Error pruning plans:'), error instanceof Error ? error.message : String(error));
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
