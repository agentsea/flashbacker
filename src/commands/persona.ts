import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getProjectDirectory } from '../utils/config';
import { getLatestConversationLog } from '../utils/conversation-logs';

interface PersonaCommandOptions {
  context?: string;
  list?: boolean;
}

export async function personaCommand(personaName?: string, options: PersonaCommandOptions = {}): Promise<void> {
  try {
    const projectDir = await getProjectDirectory();
    const personaTemplatesDir = path.join(projectDir, '.claude', 'flashback', 'personas');

    // Handle --list: show available personas
    if (options.list || !personaName) {
      await listAvailablePersonas(personaTemplatesDir);
      return;
    }

    // Handle --context: gather context for AI analysis
    if (options.context) {
      await gatherPersonaContext(personaName, options.context, personaTemplatesDir, projectDir);
      return;
    }

    // Default: show usage help
    showPersonaHelp();

  } catch (error) {
    console.error(chalk.red('Persona command error:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function listAvailablePersonas(personaTemplatesDir: string): Promise<void> {
  if (!fs.existsSync(personaTemplatesDir)) {
    console.log(chalk.yellow('⚠️  No persona templates found in .claude/flashback/personas/'));
    console.log(chalk.gray('Templates should be installed automatically when flashback is set up.'));
    return;
  }

  const personaFiles = fs.readdirSync(personaTemplatesDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''))
    .sort();

  if (personaFiles.length === 0) {
    console.log(chalk.yellow('📭 No persona templates found in .claude/flashback/personas/'));
    return;
  }

  console.log(chalk.blue('🎭 Available Personas'));
  console.log('');

  for (const persona of personaFiles) {
    try {
      const personaPath = path.join(personaTemplatesDir, `${persona}.md`);
      const content = fs.readFileSync(personaPath, 'utf-8');

      // Extract first line as description (skip # title)
      const lines = content.split('\n').filter(line => line.trim());
      const description = lines.find(line => !line.startsWith('#') && line.trim()) || 'No description';

      console.log(`  ${chalk.cyan(persona.padEnd(12))} ${chalk.gray(description.substring(0, 80))}`);
    } catch (error) {
      console.log(`  ${chalk.cyan(persona.padEnd(12))} ${chalk.red('Error reading template')}`);
    }
  }

  console.log('');
  console.log(chalk.gray('Usage: flashback persona <name> --context "your request"'));
}

async function gatherPersonaContext(personaName: string, userRequest: string, personaTemplatesDir: string, projectDir: string): Promise<void> {
  // Load persona template
  const personaPath = path.join(personaTemplatesDir, `${personaName}.md`);

  if (!fs.existsSync(personaPath)) {
    console.error(chalk.red(`❌ Persona '${personaName}' not found. Available personas:`));
    const availablePersonas = fs.readdirSync(personaTemplatesDir)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
    console.error(chalk.gray(`   ${availablePersonas.join(', ')}`));
    process.exit(1);
  }

  const personaTemplate = fs.readFileSync(personaPath, 'utf-8');

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

  // Output structured context for Claude to use with subagents
  console.log('# Persona Context');
  console.log('');
  console.log('## Persona Template');
  console.log('```markdown');
  console.log(personaTemplate);
  console.log('```');
  console.log('');
  console.log('## User Request');
  console.log(`"${userRequest}"`);
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
  console.log('## Recent Conversation Context');
  console.log('```');
  console.log(conversationContext);
  console.log('```');
  console.log('');
  console.log('## Instructions for Claude');
  console.log('Use the Task tool to spawn a subagent with the persona template above as the system prompt.');
  console.log('Include the user request, project memory, working plan, and conversation context for full project awareness.');
  console.log('Let the persona subagent analyze the request using their specialized expertise with complete project context.');
}

function showPersonaHelp(): void {
  console.log(chalk.blue('🎭 Flashback Persona System'));
  console.log('');
  console.log('Specialized AI personas for focused analysis and expertise.');
  console.log('');
  console.log('Available commands:');
  console.log('  --list                               List all available personas');
  console.log('  <persona> --context "request"        Analyze request with specified persona');
  console.log('');
  console.log('Examples:');
  console.log('  flashback persona --list');
  console.log('  flashback persona architect --context "review authentication system"');
  console.log('  flashback persona security --context "analyze API vulnerabilities"');
  console.log('  flashback persona refactorer --context "improve code quality in src/utils"');
  console.log('');
  console.log(chalk.green('💡 Each persona provides specialized expertise and focused analysis'));
  console.log(chalk.gray('Personas use real Claude subagents with domain-specific prompts'));
}
