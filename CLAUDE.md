# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Build and development
npm run build              # Compile TypeScript to lib/
npm run dev               # Watch mode compilation
npm link                  # Link for global CLI testing

# Testing (Most tests deleted as obsolete)
npm test                  # Build + run remaining tests (main command to use)
npm run test:unit         # Unit tests (if any remain)
npm run test:coverage     # Coverage report

# Code quality (Run before commits)
npm run lint              # ESLint TypeScript files
npm run lint:fix          # Auto-fix ESLint issues (use this first)
npm run format            # Prettier formatting

# Prerequisites checking
npm run setup:prereqs     # Check Node.js/npm compatibility before development

# Development workflow
npm run build && npm link  # After changes, rebuild and relink globally
flashback --version        # Verify installation (should show 2.2.6)
```

**Development Pattern**: Always run `npm run lint:fix` before `npm run build` to auto-fix style issues.

## Architecture Overview

### Hybrid AI+Computer Operations Pattern (CRITICAL)

This codebase implements a breakthrough pattern that separates **programmatic operations** (handled by CLI) from **intelligence operations** (handled by Claude/subagents):

**Programmatic Operations → `flashback` CLI:**
- File management (archive, prune, directory creation)  
- Data extraction (JSONL parsing, git status, session detection)
- System operations (file paths, formatting, structural tasks)
- **Why CLI**: Claude does these differently each time, creating inconsistency

**Intelligence Operations → Claude Subagent Prompts:**
- Analysis (code review, architectural assessment, security)
- Content creation (session summaries, documentation, recommendations)  
- Decision making (prioritization, strategic planning, creative work)
- **Why prompts**: Require domain expertise, context understanding, intelligence

**The Pattern:**
```bash
/fb:persona architect "review auth system"
# 1. Slash command → Claude runs: flashback persona architect --context "review auth system"  
# 2. CLI programmatically gathers context (consistent every time)
# 3. Claude spawns subagent with gathered context for intelligent analysis
```

### Dual-Layer AI System (CRITICAL - v2.2.x)

The system provides **two complementary ways** to access 12 AI specialists:

**Layer 1: Personas (Immediate Analysis)**
- **Usage**: `/fb:persona {name} "request"`
- **Purpose**: Fast, in-conversation analysis using specialist templates
- **Implementation**: Direct template reading from `.claude/flashback/personas/{name}.md`
- **Benefits**: Immediate specialist expertise without leaving current conversation

**Layer 2: Agents (Project-Aware Analysis)**  
- **Usage**: `@agent-{name} "request"` (Claude Code native agents)
- **Purpose**: Deep analysis in dedicated subagent conversations with full project context
- **Context Bundle**: Agents auto-gather REMEMBER.md, WORKING_PLAN.md, conversation history
- **Implementation**: Claude Code agents with context gathering via `flashback agent --context`
- **Benefits**: Project-aware analysis with complete understanding of codebase patterns

**17 Available Specialists**: architect, security, refactorer, performance, frontend, backend, devops, qa, analyzer, mentor, product, code-critic, debate-moderator, debt-hunter, database-architect, api-designer, data-engineer, platform-engineer

**IMPORTANT**: The templates/ directory is currently empty in this repository. Templates are distributed at runtime via dynamic scanning from bundled npm package. Never hardcode template content - always use `getRequiredFlashbackDirectories()` from `src/utils/file-utils.ts` for dynamic template discovery.

### Template-Driven Architecture (CRITICAL)

**NEVER hardcode paths or fallback content**. The entire system is template-driven:

- **Init system**: ALWAYS uses bundles from `./templates` to distributed files
- **Dynamic scanning**: All structure derived from template bundle at runtime via `getRequiredFlashbackDirectories()`
- **Zero exceptions**: Template-first approach prevents drift and ensures consistency
- **Variable replacement**: Templates use `{{PROJECT_NAME}}`, `{{VERSION}}`, `{{TIMESTAMP}}`
- **Agent Templates**: Must be `.md` files with standard YAML frontmatter (name, description only)

### Core System Architecture

**CLI Entry Point:** `src/cli.ts`
- Commander.js-based CLI with subcommands
- Each command maps to `src/commands/*.ts`
- Version dynamically read from `package.json`

**Working Commands (Post-Cleanup):**
- `init`: Template-driven project initialization with failsafe memory protection and MCP server integration
- `persona`: AI persona system with 17 specialists (architect, security, database-architect, api-designer, data-engineer, platform-engineer, etc.)
- `agent`: Context gathering for Claude Code agent subagents 
- `memory`: REMEMBER.md management for persistent project knowledge
- `working-plan`: Development plan tracking across sessions with AI analysis
- `save-session`: Session insight capture using comprehensive context gathering (fixed architecture)
- `session-start`: Context loading for session restoration after compaction
- `discuss`: Multi-persona AI debates using real subagents
- `debt-hunter`: Technical debt and duplicate code detection with CLI scanning
- `doctor`: System diagnostics and health checks
- `status`: Installation status with accurate slash commands detection

**Key Utilities:**
- `src/utils/file-utils.ts`: Dynamic template scanning functions
- `src/utils/config.ts`: Project directory detection and configuration
- `src/utils/conversation-logs.ts`: Claude Code session log parsing with dual session support
- `src/utils/claude-config.ts`: Slash commands detection and Claude Code integration
- `src/core/hooks.ts`: Claude Code hook system integration

**Template System:**
- `templates/.claude/flashback/`: Bundled templates distributed during init
- `templates/.claude/agents/`: 13 Claude Code agent definitions (*.md files with YAML frontmatter)
- `templates/.claude/flashback/personas/`: 13 AI specialist persona definitions
- `templates/.claude/commands/fb/`: Slash command templates for Claude Code integration
- `templates/.claude/flashback/memory/`: REMEMBER.md and WORKING_PLAN.md templates
- `templates/.claude/flashback/prompts/`: AI analysis prompt templates

### Session Continuity System

**Files Created in User Projects:**
- `.claude/agents/*.md`: Claude Code agent definitions with YAML frontmatter
- `.claude/flashback/memory/REMEMBER.md`: Long-term project knowledge
- `.claude/flashback/memory/WORKING_PLAN.md`: Development priorities and session tracking
- `.claude/flashback/config/flashback.json`: Configuration with dynamic version sync
- `.claude/commands/fb/*.md`: Slash command definitions
- `.claude/flashback/scripts/session-start.sh`: Hook script for automatic context loading

**Hook Integration:**
- SessionStart hook automatically loads project context after compaction
- Hook scripts installed in `.claude/flashback/scripts/`
- Automatic context injection prevents repeated corrections across sessions

### Save-Session System Architecture (FIXED v2.2.6+)

**Previous Issue**: Save-session was architecturally broken - expected Claude to write files through slash commands (impossible).

**Fixed Architecture**: Now follows Hybrid AI+Computer pattern correctly:
- **CLI (`flashback save-session --context`)**: Gathers comprehensive context like session-start
- **Claude**: Provides structured analysis in conversation (no file writing)
- **Context includes**: Project memory, working plan, full conversation logs, git analysis
- **Output**: Structured session summary for continuity, not broken file operations

## Development Patterns

### Recent Major Changes

#### v2.2.6+ - Post-MCP Integration (Current)
- **MCP Server Integration**: Added context7, playwright, and sequential-thinking MCP servers for enhanced capabilities
- **Critical Bug Fixes**: Fixed slash commands detection issues in `flashback status` and config validation
- **Save-Session Overhaul**: Completely fixed broken save-session system using session-start architecture
- **Documentation Improvements**: Enhanced README with User Guide links and better navigation
- **Template System**: All templates properly updated in `templates/` directory for consistent distribution

#### v2.2.6 - Public Release
- **Framework Coexistence**: Fixed catastrophic init system bug that destroyed entire .claude directories
- **Dynamic Template Scanning**: Replaced hardcoded agent/persona lists with runtime template discovery
- **Security Protections**: Full GitHub security suite (branch protection, secret scanning, CodeQL)
- **Public Repository**: Clean public release at github.com/agentsea/flashbacker with professional docs
- **Non-destructive Cleanup**: --clean install only removes Flashbacker files, preserves other frameworks

#### v2.2.4 - Production Release
- **Node.js Engine Constraints**: Added strict Node.js 18.x-22.x LTS version support in package.json
- **Prerequisites System**: Added automated compatibility checker (`npm run setup:prereqs`)
- **ESLint Configuration**: Comprehensive code quality enforcement with consistent formatting rules
- **Native Module Compatibility**: Resolved tree-sitter compilation issues through engine constraints
- **Developer Experience**: Enhanced setup with .nvmrc, colored output, and auto-fix capabilities

#### v2.2.0 - Dual-Layer AI System Implementation  
- **Revolutionary Architecture**: Implemented dual-layer persona/agent system
- **Persona Layer**: Simplified `/fb:persona` commands for immediate analysis in current conversation
- **Agent Layer**: Proper Claude Code `@agent-{name}` system with dedicated subagent conversations
- **Context Integration**: Agents automatically gather project context via `flashback agent --context`
- **Template Updates**: All 17 specialists available in both persona and agent formats

#### v2.1.2 - Hunter Commands
- **Debt-Hunter Command**: CLI-based technical debt scanning with duplicate function detection
- **Hallucination-Hunter Command**: AI-based semantic analysis using code-critic subagent
- **Hybrid Pattern Validation**: Both commands demonstrate different aspects of AI+Computer pattern
- **Template Integration**: Commands fully integrated with slash command template system

#### v2.0.8 - Major Cleanup 
**WARNING**: This codebase underwent a major "slash and burn" cleanup that eliminated 1,111+ lines of obsolete code:

- **Removed obsolete commands**: `cleanup`, `mcp`, `prune`, `state` commands were deleted
- **Architectural correction**: Fixed wrong `.claude/state/` references to correct `.claude/flashback/` paths
- **Test cleanup**: Deleted all obsolete tests that were testing wrong commands/architecture
- **Scratchpad elimination**: Removed all references to "scratchpad" concept that never worked

### Adding New Commands

1. **Create Command Handler**: Add to `src/commands/new-command.ts`
   - Follow patterns from existing commands like `debt-hunter.ts` or `persona.ts`
   - Use `getProjectDirectory()` for project path resolution
   - Support `--context` flag for hybrid AI+Computer pattern integration

2. **Register CLI Command**: Add to `src/cli.ts` with Commander.js
   - Import command function at top
   - Add `.command()` definition with appropriate options
   - Follow existing patterns for option naming and descriptions

3. **Create Slash Command Template** (if needed): Add to `templates/.claude/commands/fb/new-command.md`
   - Use `$ARGUMENTS` for dynamic argument parsing
   - Follow hybrid pattern: CLI gathers context, AI provides intelligence
   - Include usage instructions and examples
   - Templates automatically distributed during `flashback init --refresh`

4. **Implement Hybrid Pattern**: Distinguish between programmatic vs intelligence operations
   - **CLI operations**: File scanning, data extraction, formatting, structural tasks
   - **AI operations**: Analysis, recommendations, decision making, content creation

### Template System Development

**CRITICAL**: The template system uses dynamic scanning - never hardcode content:

- **Template Bundle**: All templates in `templates/.claude/flashback/` get bundled with npm package
- **Dynamic Scanning**: `src/utils/file-utils.ts` scans templates at runtime via `getRequiredFlashbackDirectories()`
- **Init Process**: `src/commands/init.ts` copies from scanned template bundle to user projects
- **Zero Hardcoding**: Never use fallback content - always use template bundle as source of truth
- **Variable Replacement**: Templates support `{{PROJECT_NAME}}`, `{{VERSION}}`, `{{TIMESTAMP}}`
- **Template Distribution**: Use `flashback init --refresh` to distribute updated templates to existing projects

## Node.js Compatibility Requirements (CRITICAL - v2.2.4)

**Strict Version Constraints**: Node.js 18.x-22.x LTS only
- **Engine constraint**: `"node": ">=18.0.0 <25.0.0"` in package.json
- **Why strict**: Native modules (tree-sitter) have specific Node.js version dependencies
- **Auto-detection**: `.nvmrc` file contains `22.11.0` for automatic nvm switching
- **Validation**: Always run `npm run setup:prereqs` before development

**Prerequisites Script**: `scripts/setup-prereqs.js`
- Color-coded compatibility checking with visual indicators
- Automatic nvm installation guidance for unsupported versions
- npm version validation (requires 9.x+)
- Clear next-step instructions for manual setup

**Common Issues**:
- **Native module compilation errors**: Usually caused by unsupported Node.js versions
- **Solution**: Use supported version (18.x-22.x), clean install: `rm -rf node_modules && npm install`

## Code Quality Standards (CRITICAL - v2.2.4)

**ESLint Configuration**: `.eslintrc.js` enforces consistent code style
- **Formatting rules**: Semicolons, single quotes, 2-space indentation, trailing commas
- **TypeScript integration**: Proper unused variable handling with `_` prefix pattern
- **CLI-specific**: `no-console: off` (CLI tools need console output)
- **Auto-fix**: `npm run lint:fix` resolves most formatting issues automatically

**Development Workflow**:
1. Write code following existing patterns
2. Run `npm run lint:fix` to auto-fix style issues
3. Fix remaining ESLint errors manually
4. Run `npm run build` to validate TypeScript compilation

## Memory System Integration

The project memory (`REMEMBER.md`) contains critical architectural insights including the Hybrid AI+Computer Operations pattern and Template-Driven Architecture principles. Always check project memory when making significant changes.

## Package Distribution

**Published as:** `flashbacker` on npm  
**Global install:** `npm install -g flashbacker`
**Files included:** `lib/`, `bin/`, `templates/`, `README.md`, `package.json`
**Repository:** `github.com/agentsea/flashbacker` (public)

The `templates/` directory is crucial - it contains all the bundled content that gets distributed to user projects during initialization.

## Current Status

**v2.2.6+**: "POST-MCP INTEGRATION" - Enhanced with MCP servers and critical bug fixes. Fixed save-session architecture, slash commands detection, and template distribution. All 17 specialists available with MCP-enhanced capabilities including context7, playwright, and sequential-thinking servers for comprehensive analysis and automation.

## Single Test Command

Since most tests were deleted as obsolete, run the remaining tests with:
```bash
npm test                  # Builds and runs all remaining tests
```

For development testing:
```bash
npm run build && npm link  # After making changes, rebuild and relink globally
flashback --version        # Should show current version (2.2.6)
```