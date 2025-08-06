import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { spawn } from 'child_process';
import { getProjectDirectory } from '../utils/config';

interface MemoryCommandOptions {
  show?: boolean;
  add?: string;
  remove?: string;
  edit?: boolean;
  validate?: boolean;
}

// interface ProjectMemory { // Currently unused
//   key_learnings: string[];
//   critical_paths: Record<string, string>;
//   forbidden_commands: string[];
//   common_mistakes: string[];
//   project_patterns: string[];
//   last_updated: string;
// }

export async function memoryCommand(options: MemoryCommandOptions): Promise<void> {
  try {
    const projectDir = await getProjectDirectory();

    // Handle --show: display REMEMBER.md contents
    if (options.show) {
      await showMemory(projectDir);
      return;
    }

    // Handle --add <learning>: add entry to project wisdom
    if (options.add) {
      await addMemory(options.add, projectDir);
      return;
    }

    // Handle --remove <pattern>: remove entries matching pattern
    if (options.remove) {
      await removeMemory(options.remove, projectDir);
      return;
    }

    // Handle --edit: open REMEMBER.md for editing
    if (options.edit) {
      await editMemory(projectDir);
      return;
    }

    // Handle --validate: check memory against current project
    if (options.validate) {
      await validateMemory(projectDir);
      return;
    }

    // Default: show help-like summary
    console.log(chalk.blue('🧠 Flashback Memory Management'));
    console.log('');
    console.log('Long-term project wisdom that survives context compactions.');
    console.log('');
    console.log('Available commands:');
    console.log('  --show                Display REMEMBER.md contents');
    console.log('  --add "<learning>"    Add entry to project wisdom');
    console.log('  --remove "<pattern>"  Remove entries matching pattern or text');
    console.log('  --edit                Open REMEMBER.md for editing');
    console.log('  --validate            Check memory against current project');
    console.log('');
    console.log('Examples:');
    console.log('  flashback memory --show');
    console.log('  flashback memory --add "Docker compose in ./deploy directory"');
    console.log('  flashback memory --remove "outdated pattern"');
    console.log('  flashback memory --validate');

  } catch (error) {
    console.error(chalk.red('Error managing memory:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function showMemory(projectDir: string): Promise<void> {
  const memoryPath = getMemoryPath(projectDir);

  if (!fs.existsSync(memoryPath)) {
    console.log(chalk.yellow('🧠 No REMEMBER.md found. Creating template...'));
    await initializeMemoryFile(projectDir);
    return;
  }

  try {
    const content = fs.readFileSync(memoryPath, 'utf-8');

    console.log(chalk.blue('🧠 Project Memory (REMEMBER.md)'));
    console.log('');
    console.log(content);

    // Show metadata
    const stats = fs.statSync(memoryPath);
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
    console.log(chalk.red(`❌ Error reading memory: ${error instanceof Error ? error.message : String(error)}`));
  }
}

async function addMemory(learning: string, projectDir: string): Promise<void> {
  const memoryPath = getMemoryPath(projectDir);

  // Ensure memory file exists
  if (!fs.existsSync(memoryPath)) {
    await initializeMemoryFile(projectDir);
  }

  try {
    let content = fs.readFileSync(memoryPath, 'utf-8');
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Find the Key Learnings section and add the new learning
    const keyLearningsRegex = /(## Key Learnings[\s\S]*?)(\n## |$)/;
    const match = content.match(keyLearningsRegex);

    if (match) {
      const existingSection = match[1];
      const newEntry = `- **[${timestamp}]** ${learning}`;

      // Insert the new entry after the template comments
      let updatedSection;
      if (existingSection.includes('<!-- Example: - **[')) {
        // Insert after the example comment
        updatedSection = existingSection.replace(
          /(<!-- Example: - \*\*\[.*?-->\n)/,
          `$1\n${newEntry}\n`,
        );
      } else if (existingSection.includes('<!-- Add important discoveries')) {
        // Insert after the instruction comment
        updatedSection = existingSection.replace(
          /(<!-- Add important discoveries.*?-->\n)/,
          `$1\n${newEntry}\n`,
        );
      } else {
        // Just add to the end of the section
        updatedSection = existingSection.trimEnd() + '\n' + newEntry + '\n';
      }

      content = content.replace(keyLearningsRegex, updatedSection + (match[2] || ''));
    } else {
      // If no Key Learnings section found, append to end
      content += `\n\n## Key Learnings\n\n- **[${timestamp}]** ${learning}\n`;
    }

    // Update the last modified timestamp
    const lastUpdatedRegex = /Last Updated: .*/;
    const newTimestamp = `Last Updated: ${new Date().toLocaleString('en-US')}`;

    if (lastUpdatedRegex.test(content)) {
      content = content.replace(lastUpdatedRegex, newTimestamp);
    } else {
      content += `\n---\n*${newTimestamp}*\n`;
    }

    fs.writeFileSync(memoryPath, content);

    console.log(chalk.green('✅ Added to project memory:'));
    console.log(`   ${chalk.cyan(learning)}`);
    console.log('');
    console.log(chalk.dim(`📝 Updated: ${memoryPath}`));

  } catch (error) {
    console.log(chalk.red(`❌ Error adding to memory: ${error instanceof Error ? error.message : String(error)}`));
  }
}

async function removeMemory(pattern: string, projectDir: string): Promise<void> {
  const memoryPath = getMemoryPath(projectDir);

  if (!fs.existsSync(memoryPath)) {
    console.log(chalk.yellow('⚠️  No REMEMBER.md found to remove from.'));
    return;
  }

  try {
    let content = fs.readFileSync(memoryPath, 'utf-8');
    const _originalContent = content; // Currently unused
    let removedCount = 0;
    const removedItems: string[] = [];

    // Split content into lines for processing
    const lines = content.split('\n');
    const filteredLines = lines.filter((line) => {
      // Check if line contains the pattern
      if (line.toLowerCase().includes(pattern.toLowerCase())) {
        // Only remove actual content lines, not headers or structural elements
        if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
          removedItems.push(line.trim());
          removedCount++;
          return false; // Remove this line
        }
      }
      return true; // Keep this line
    });

    content = filteredLines.join('\n');

    // Clean up any resulting empty sections or extra whitespace
    content = content.replace(/\n\n\n+/g, '\n\n'); // Normalize multiple newlines

    if (removedCount === 0) {
      console.log(chalk.yellow(`⚠️  No entries found matching pattern: "${pattern}"`));
      console.log(chalk.dim('💡 Pattern matching is case-insensitive and searches within list items.'));
      return;
    }

    // Update the last modified timestamp
    const lastUpdatedRegex = /Last Updated: .*/;
    const newTimestamp = `Last Updated: ${new Date().toLocaleString('en-US')}`;

    if (lastUpdatedRegex.test(content)) {
      content = content.replace(lastUpdatedRegex, newTimestamp);
    } else {
      content += `\n---\n*${newTimestamp}*\n`;
    }

    fs.writeFileSync(memoryPath, content);

    console.log(chalk.green(`✅ Removed ${removedCount} entries matching "${pattern}":`));
    removedItems.forEach(item => {
      console.log(`   ${chalk.dim('•')} ${chalk.red(item)}`);
    });
    console.log('');
    console.log(chalk.dim(`📝 Updated: ${memoryPath}`));

  } catch (error) {
    console.log(chalk.red(`❌ Error removing from memory: ${error instanceof Error ? error.message : String(error)}`));
  }
}

async function editMemory(projectDir: string): Promise<void> {
  const memoryPath = getMemoryPath(projectDir);

  // Ensure memory file exists
  if (!fs.existsSync(memoryPath)) {
    await initializeMemoryFile(projectDir);
  }

  // Try to detect editor from environment
  const editor = process.env.EDITOR || process.env.VISUAL || 'nano';

  console.log(chalk.blue(`📝 Opening ${path.basename(memoryPath)} in ${editor}...`));

  return new Promise((resolve, reject) => {
    const child = spawn(editor, [memoryPath], {
      stdio: 'inherit',
      cwd: projectDir,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ Memory file updated.'));
        resolve();
      } else {
        console.log(chalk.red(`❌ Editor exited with code ${code}`));
        reject(new Error(`Editor failed with code ${code}`));
      }
    });

    child.on('error', (error) => {
      console.log(chalk.red(`❌ Failed to open editor: ${error.message}`));
      console.log(chalk.yellow('💡 Try setting EDITOR environment variable or edit manually:'));
      console.log(`   ${memoryPath}`);
      reject(error);
    });
  });
}

async function validateMemory(projectDir: string): Promise<void> {
  const memoryPath = getMemoryPath(projectDir);

  if (!fs.existsSync(memoryPath)) {
    console.log(chalk.yellow('⚠️  No REMEMBER.md found to validate.'));
    return;
  }

  try {
    const content = fs.readFileSync(memoryPath, 'utf-8');
    const projectRoot = projectDir;
    const issues: string[] = [];
    const validations: string[] = [];

    console.log(chalk.blue('🔍 Validating project memory against current state...'));
    console.log('');

    // Extract file/directory references from memory
    const pathReferences = extractPathReferences(content);

    for (const pathRef of pathReferences) {
      const fullPath = path.resolve(projectRoot, pathRef);

      if (fs.existsSync(fullPath)) {
        validations.push(`✅ Found: ${pathRef}`);
      } else {
        issues.push(`❌ Missing: ${pathRef}`);
      }
    }

    // Check for common files mentioned in memory
    const commonChecks = [
      { pattern: /docker.?compose/i, paths: ['docker-compose.yml', 'docker-compose.yaml', 'compose.yml'] },
      { pattern: /package\.json/i, paths: ['package.json'] },
      { pattern: /\.env/i, paths: ['.env', '.env.local', '.env.example'] },
      { pattern: /readme/i, paths: ['README.md', 'readme.md', 'README.txt'] },
    ];

    for (const check of commonChecks) {
      if (check.pattern.test(content)) {
        const found = check.paths.find(p => fs.existsSync(path.join(projectRoot, p)));
        if (found) {
          validations.push(`✅ Referenced file exists: ${found}`);
        } else {
          issues.push(`⚠️  Referenced but not found: ${check.paths[0]} (or variants)`);
        }
      }
    }

    // Show results
    if (validations.length > 0) {
      console.log(chalk.green('Valid References:'));
      validations.forEach(msg => console.log(`  ${msg}`));
      console.log('');
    }

    if (issues.length > 0) {
      console.log(chalk.yellow('Potential Issues:'));
      issues.forEach(msg => console.log(`  ${msg}`));
      console.log('');
      console.log(chalk.dim('💡 Consider updating REMEMBER.md if project structure has changed.'));
    } else {
      console.log(chalk.green('🎉 All references in memory appear valid!'));
    }

    // Check git status for validation
    if (fs.existsSync(path.join(projectRoot, '.git'))) {
      console.log(chalk.blue('🔍 Git Status Check:'));

      try {
        const { spawn } = require('child_process');

        // Check for uncommitted changes
        const gitStatus = spawn('git', ['status', '--porcelain'], { cwd: projectRoot });
        let statusOutput = '';

        gitStatus.stdout.on('data', (data: Buffer) => {
          statusOutput += data.toString();
        });

        gitStatus.on('close', (code: number) => {
          if (code === 0) {
            if (statusOutput.trim()) {
              const changedFiles = statusOutput.trim().split('\n').length;
              console.log(chalk.yellow(`  ⚠️  ${changedFiles} uncommitted changes detected`));
              console.log(chalk.dim('  💡 Consider updating memory if project structure changed'));
            } else {
              console.log(chalk.green('  ✅ Working directory clean'));
            }
          } else {
            console.log(chalk.dim('  ℹ️  Git status check failed (not a git repo?)'));
          }
        });

        gitStatus.on('error', () => {
          console.log(chalk.dim('  ℹ️  Git not available or not a git repository'));
        });

      } catch (error) {
        console.log(chalk.dim('  ℹ️  Git validation unavailable'));
      }
    } else {
      console.log(chalk.dim('💡 Not a git repository - consider version controlling your project'));
    }

  } catch (error) {
    console.log(chalk.red(`❌ Error validating memory: ${error instanceof Error ? error.message : String(error)}`));
  }
}

async function initializeMemoryFile(projectDir: string): Promise<void> {
  const memoryPath = getMemoryPath(projectDir);
  const memoryDir = path.dirname(memoryPath);

  // Ensure memory directory exists
  if (!fs.existsSync(memoryDir)) {
    fs.mkdirSync(memoryDir, { recursive: true });
  }

  const template = generateMemoryTemplate(projectDir);
  fs.writeFileSync(memoryPath, template);

  console.log(chalk.green('✅ Created REMEMBER.md template'));
  console.log(chalk.dim(`📝 Location: ${memoryPath}`));
  console.log('');
  console.log(chalk.blue('💡 Edit this file to add project-specific knowledge that should persist across sessions.'));
}

function getMemoryPath(projectDir: string): string {
  const memoryDir = path.join(projectDir, '.claude', 'flashback', 'memory');
  return path.join(memoryDir, 'REMEMBER.md');
}

function generateMemoryTemplate(projectDir: string): string {
  const projectName = path.basename(projectDir);
  const timestamp = new Date().toLocaleString('en-US');

  return `# Project Memory: ${projectName}

> **Long-term project knowledge that survives context compactions**
> Edit this file to capture essential project wisdom, common patterns, and lessons learned.

## Key Learnings

<!-- Add important discoveries and decisions with timestamps -->
<!-- Example: - **[2025-01-31]** Database migrations live in ./db/migrations, not ./migrations -->

## Critical Paths & Locations

<!-- Document where important files and directories are located -->
<!-- Example: -->
<!-- - Docker Compose: \`./deploy/docker-compose.yml\` -->
<!-- - Environment files: \`./config/.env.example\` -->
<!-- - Build scripts: \`./scripts/build.sh\` -->

## Forbidden Commands & Patterns

<!-- Commands or patterns that should NOT be used -->
<!-- Example: -->
<!-- - ❌ Never run \`rm -rf node_modules\` without backing up -->
<!-- - ❌ Don't modify production config directly -->

## Common Mistakes to Avoid

<!-- Frequent errors and their solutions -->
<!-- Example: -->
<!-- - Installing packages without \`--save\` flag breaks deployments -->
<!-- - Forgetting to run migrations after pulling changes -->

## Project Patterns & Conventions

<!-- Coding standards and architectural decisions -->
<!-- Example: -->
<!-- - All API routes use \`/api/v1/\` prefix -->
<!-- - Database models use singular naming -->
<!-- - Tests co-located with source files -->

## Dependencies & Requirements

<!-- Important system requirements and dependencies -->
<!-- Example: -->
<!-- - Node.js >= 18.0.0 required -->
<!-- - PostgreSQL 14+ needed for JSON operations -->
<!-- - Redis required for session storage -->

---
*Last Updated: ${timestamp}*
*This file is user-editable and version-controlled.*`;
}

function extractPathReferences(content: string): string[] {
  const paths: string[] = [];

  // Look for paths in backticks
  const backtickPaths = content.match(/`([^`]*[/\\][^`]*)`/g);
  if (backtickPaths) {
    backtickPaths.forEach(match => {
      const path = match.slice(1, -1); // Remove backticks
      if (path && !path.startsWith('http') && !path.includes(' ')) {
        paths.push(path);
      }
    });
  }

  // Look for common file extensions
  const filePatterns = [
    /([a-zA-Z0-9_-]+\.(js|ts|json|yml|yaml|md|txt|env|sh|py|go|rs))/g,
    /(\.\/[a-zA-Z0-9_/-]+)/g,
    /([a-zA-Z0-9_-]+\/[a-zA-Z0-9_/-]+)/g,
  ];

  for (const pattern of filePatterns) {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        if (!paths.includes(match) && !match.includes(' ')) {
          paths.push(match);
        }
      });
    }
  }

  return [...new Set(paths)]; // Remove duplicates
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
