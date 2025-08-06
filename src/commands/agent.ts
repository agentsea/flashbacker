import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getProjectDirectory } from '../utils/config';
import { getLatestConversationLog } from '../utils/conversation-logs';

interface AgentCommandOptions {
  context?: boolean;
  list?: boolean;
}

export async function agentCommand(options: AgentCommandOptions = {}): Promise<void> {
  try {
    const projectDir = await getProjectDirectory();

    // Handle --context: gather context bundle for agents
    if (options.context) {
      await gatherAgentContext(projectDir);
      return;
    }

    // Handle --list: show available agents
    if (options.list) {
      await listAvailableAgents(projectDir);
      return;
    }

    // Default: show usage help
    showAgentHelp();

  } catch (error) {
    console.error(chalk.red('Agent command error:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

export async function gatherAgentContext(projectDir: string): Promise<void> {

  // Get project memory (REMEMBER.md)
  let projectMemory = '';
  try {
    const memoryPath = path.join(projectDir, '.claude', 'flashback', 'memory', 'REMEMBER.md');
    if (fs.existsSync(memoryPath)) {
      projectMemory = fs.readFileSync(memoryPath, 'utf-8');
    }
  } catch (error) {
    projectMemory = 'No project memory available.';
  }

  // Get current working plan (WORKING_PLAN.md)
  let workingPlan = '';
  try {
    const planPath = path.join(projectDir, '.claude', 'flashback', 'memory', 'WORKING_PLAN.md');
    if (fs.existsSync(planPath)) {
      workingPlan = fs.readFileSync(planPath, 'utf-8');
    }
  } catch (error) {
    workingPlan = 'No working plan available.';
  }

  // Get project architecture guide (CLAUDE.md)
  let projectArchitecture = '';
  try {
    const claudePath = path.join(projectDir, 'CLAUDE.md');
    if (fs.existsSync(claudePath)) {
      projectArchitecture = fs.readFileSync(claudePath, 'utf-8');
    }
  } catch (error) {
    projectArchitecture = 'No project architecture guide available.';
  }

  // Get latest conversation context
  let conversationContext = '';
  try {
    const conversationLog = await getLatestConversationLog(projectDir);
    if (conversationLog) {
      // Extract recent user/assistant exchanges (last 10 messages)
      const messages = conversationLog.split('\n')
        .filter(line => line.trim())
        .slice(-10)
        .map(line => {
          try {
            const entry = JSON.parse(line);
            if (entry.type === 'user_message' || entry.type === 'assistant_message') {
              const role = entry.type === 'user_message' ? 'User' : 'Assistant';
              const content = typeof entry.content === 'string' ? entry.content :
                Array.isArray(entry.content) ? entry.content.map((c: any) => c.text || c.content || '').join(' ') : '';
              return `${role}: ${content.substring(0, 200)}${content.length > 200 ? '...' : ''}`;
            }
            return null;
          } catch {
            return null;
          }
        })
        .filter((item): item is string => Boolean(item));

      if (messages.length > 0) {
        conversationContext = messages.join('\n\n');
      }
    }
  } catch (error) {
    // Continue without conversation context if it fails
    conversationContext = 'No recent conversation context available.';
  }

  // Output context bundle for agent consumption
  console.log('# Project Context Bundle');
  console.log('');

  console.log('## Project Memory');
  console.log('```markdown');
  console.log(projectMemory);
  console.log('```');
  console.log('');

  console.log('## Current Working Plan');
  console.log('```markdown');
  console.log(workingPlan);
  console.log('```');
  console.log('');

  console.log('## Project Architecture');
  console.log('```markdown');
  console.log(projectArchitecture);
  console.log('```');
  console.log('');

  console.log('## Recent Conversation Context');
  console.log('```');
  console.log(conversationContext);
  console.log('```');
}

async function listAvailableAgents(projectDir: string): Promise<void> {
  const agentsDir = path.join(projectDir, '.claude', 'agents');

  if (!fs.existsSync(agentsDir)) {
    console.log(chalk.yellow('⚠️  No agents found in .claude/agents/'));
    console.log(chalk.gray('Run `flashback init --refresh` to install agent templates.'));
    return;
  }

  const agentFiles = fs.readdirSync(agentsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''))
    .sort();

  if (agentFiles.length === 0) {
    console.log(chalk.yellow('📭 No agent templates found in .claude/agents/'));
    return;
  }

  console.log(chalk.blue('🤖 Available Agents'));
  console.log('');

  for (const agent of agentFiles) {
    try {
      const agentPath = path.join(agentsDir, `${agent}.md`);
      const content = fs.readFileSync(agentPath, 'utf-8');

      // Extract description from YAML frontmatter
      const yamlMatch = content.match(/---\n(.*?)\n---/s);
      let description = 'No description';

      if (yamlMatch) {
        const yaml = yamlMatch[1];
        const descMatch = yaml.match(/description:\s*(.+)/);
        if (descMatch) {
          description = descMatch[1].trim();
        }
      }

      console.log(`  ${chalk.cyan(agent.padEnd(15))} ${chalk.gray(description)}`);
    } catch (error) {
      console.log(`  ${chalk.cyan(agent.padEnd(15))} ${chalk.red('Error reading template')}`);
    }
  }
  console.log('');
  console.log(chalk.gray('Usage: @agent-<name> "your request" in Claude Code conversations'));
}

function showAgentHelp(): void {
  console.log(chalk.blue('🤖 Flashback Agent Context System'));
  console.log('');
  console.log('Provides project context bundle for Claude Code agents.');
  console.log('');
  console.log('Available commands:');
  console.log('  --list                 List all available agents with descriptions');
  console.log('  --context              Generate project context bundle for agent use');
  console.log('');
  console.log('Examples:');
  console.log('  flashback agent --list');
  console.log('  flashback agent --context');
  console.log('');
  console.log(chalk.green('💡 Agents are called via @agent-<name> in Claude Code conversations'));
  console.log(chalk.gray('Context bundle provides project memory, working plan, and conversation history'));
}
