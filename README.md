```
███████╗██╗      █████╗ ███████╗██╗  ██╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ 
██╔════╝██║     ██╔══██╗██╔════╝██║  ██║██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
█████╗  ██║     ███████║███████╗███████║██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝
██╔══╝  ██║     ██╔══██║╚════██║██╔══██║██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
██║     ███████╗██║  ██║███████║██║  ██║██████╔╝██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                                                                          
         ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
       ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░
     ░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
   ░░▒▒▓▓██████████████████████████████████████████████████████████████████▓▓▒▒░░
 ░░▒▒▓▓████  M E M O R I E S   F L O A T I N G   B A C K   I N   T I M E  ████▓▓▒▒░░
   ░░▒▒▓▓██████████████████████████████████████████████████████████████████▓▓▒▒░░
     ░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
       ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░
         ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

> **Claude Code state management with session continuity and AI personas**

**Flashbacker provides:** 

1) Session continuity for Claude Code through intelligent state management memory commands
2) Specialized AI personas accessed via `/fb:` slash commands
3) Dedicated agents accessed via @agent-{AGENT-NAME} commands
4) Agent discussion system for complex issues
5) A code task management system for complex issues
6) A code quality and fix system for complex issues

**Current Status: v2.3.7** - 🚧 **ALPHA** - Complete workflow system with 20 total specialists. Adds PM2 background daemon foundation with per-project ecosystem generation and CLI management. Includes new Claude context status line monitor.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.x, 20.x, or 22.x LTS (recommended: 22.x)
- **npm**: 9.x or later

#### Quick Prerequisites Installation
```bash
# Option 1: Use our automated installer script
npm run setup:prereqs

# Option 2: Manual nvm installation (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install 22
nvm use 22

# Option 3: Download from https://nodejs.org/ (LTS version)
```

### Quick Installation

**Option 1: NPM Package (RECOMMENDED)**
```bash
# Install globally from npm registry
npm install -g flashbacker

# Initialize in your project with MCP servers
cd /path/to/your/project
flashback init --mcp              # Includes context7, playwright, sequential-thinking
```

**Option 2: Automated Installer Script**
```bash
# Alternative: Single command installation with automatic template refresh
curl -fsSL https://raw.githubusercontent.com/agentsea/flashbacker/main/scripts/install.sh | bash

# Then initialize in your project
cd /path/to/your/project
flashback init --mcp              # Includes context7, playwright, sequential-thinking
```

**Option 3: Manual Source Installation**  
```bash
# For development or latest unreleased features
git clone https://github.com/agentsea/flashbacker.git
cd flashbacker
npm install && npm run build && npm link

# Initialize with MCP servers (RECOMMENDED)
cd /path/to/your/project
flashback init --mcp              # Includes context7, playwright, sequential-thinking
```

> 📖 **[Complete Installation Guide →](docs/user-guide/INSTALLATION.md)**  
> 📚 **[User Guide →](docs/user-guide/USER_GUIDE.md)**  
> Comprehensive command guide with workflows and how-to's

## 🎯 How You Actually Use Flashbacker

After installation, you use Flashbacker through **slash commands in Claude Code**:

### Primary Commands (What You'll Use Daily)
```bash
# Persona Commands (Current Conversation) - Specialized templates applied to current conversation
/fb:persona architect "review our API design"     # Systems architecture analysis
/fb:persona security "analyze authentication"     # Security expert analysis
/fb:persona database-architect "optimize schema" # Database design patterns
/fb:persona john-carmack "optimize hot path"      # Performance-critical systems

# Agent Commands (Dedicated Subagents) - Launch dedicated subagent with full context
@agent-architect "comprehensive API analysis"     # Spawns subagent with project context
@agent-security "security audit with remediation" # Project-aware security analysis
@agent-code-critic "brutally honest code review"  # Code quality enforcement
@agent-john-carmack "performance analysis"        # Game engine principles approach

# Session Management - Manual memory management (NO automatic hooks)
/fb:working-plan {context}                        # Update development priorities
/fb:save-session                                  # Capture session insights before compaction
/fb:session-start                                 # Restore context after compaction
/fb:remember {key insight}                        # Save important info to memory
/fb:how "explain what you understood"              # Get implementation plan

# Code Quality & Task Management
/fb:debt-hunter                                   # Hunt technical debt with AST analysis
/fb:hallucination-hunter                          # Hunt fake AI-generated code
/fb:fix-master "error description"                # Surgical fix methodology
/fb:create-tasks "issue description"               # Break down issues into atomic tasks
/fb:work-task {task-number}                       # Focus on specific task
/fb:update-tasks {task-number}                    # Update task progress

# Discussion System - Multi-agent collaboration (READ ONLY recommended)
flashback discuss "Should we use microservices?" john-carmack,architect,security
/fb:discuss architect,security "review this code" # In-conversation multi-agent review
```

### What Happens Behind the Scenes

**Persona Commands (`/fb:persona architect "review API"`):**
1. **Direct template application**: Reads persona template from `.claude/flashback/personas/architect.md`
2. **Simple output**: Template content + your request in current conversation
3. **Immediate analysis**: No subagent spawn, direct analysis

**Agent Commands (`@agent-architect "review API"`):**
1. **Agent spawning**: Claude Code spawns dedicated architect subagent
2. **Context gathering**: Agent runs `flashback agent --context` to get project bundle
3. **Rich context**: Agent receives REMEMBER.md, WORKING_PLAN.md, conversation history
4. **Project-aware analysis**: Specialized analysis with full project understanding

**Session Management (Manual - No Automatic Hooks):**
- When context window hits ~10%, run `/fb:save-session` or `/fb:working-plan`
- After compaction, run `/fb:session-start` to restore context
- Memory files: REMEMBER.md, WORKING_PLAN.md, CURRENT_SESSION.md

## ✨ Core Features

### 🧠 **Session Continuity System (Manual)**
- **Manual Memory Management**: Claude Code lacks pre/post-compaction hooks
- **Memory Injection**: REMEMBER.md prevents repeated corrections across sessions  
- **Working Plan Intelligence**: AI analyzes conversations to update development plans
- **Session Restoration**: `/fb:session-start` restores context after compaction

### 🎭 **Dual-Layer AI System**

**Layer 1: Personas (Current Conversation)**
- `/fb:persona architect "analyze API design"` - Direct template application
- All 20 personas available for immediate analysis in current conversation

**Layer 2: Agents (Dedicated Subagents)** 
- `@agent-architect "analyze API design"` - Spawns dedicated subagent with full project context
- Agents automatically gather context via `flashback agent --context`
- Project-aware analysis with REMEMBER.md, WORKING_PLAN.md, conversation history

**Available Specialists:**
- **architect**: Systems architecture, scalability, long-term design
- **security**: Threat modeling, vulnerability assessment
- **backend**: APIs, reliability, data integrity
- **frontend**: UX, accessibility, performance
- **database-architect**: Database design, query optimization, schema evolution with proven design patterns
- **api-designer**: REST/GraphQL API design, OpenAPI specifications, integration patterns with industry standards
- **data-engineer**: ETL pipelines, data modeling, analytics architecture, streaming systems with proven engineering patterns
- **platform-engineer**: Kubernetes, infrastructure-as-code, observability, developer experience with verified patterns
- **docker-master**: Docker, Docker Compose, Swarm orchestration, networking, volumes, and containerization with expert-level knowledge
- **cli-master**: Command-line interface design, human-machine interaction
- **typescript-master**: Advanced TypeScript development, type system mastery
- **debt-hunter**: Technical debt detection, code quality analysis with CLI scanning
- **hallucination-hunter**: AI code validation, semantic correctness analysis
- **analyzer**: Root cause analysis, investigation
- **mentor**: Knowledge transfer, documentation
- **refactorer**: Code quality, technical debt
- **performance**: Optimization, bottlenecks
- **qa**: Testing, quality assurance
- **devops**: Infrastructure, deployment
- **product**: User needs, business strategy
- **code-critic**: Code quality enforcement
- **gpt5-cursor**: GPT-5 integration for advanced analysis, second opinions, and complex problem solving
- **john-carmack**: Performance-critical systems analysis, game engine principles, functional programming discipline

### 🔄 **State Management**
- **Dynamic Template Scanning**: Zero hardcoded paths, everything from bundled templates
- **Memory System**: Persistent project knowledge across sessions
- **Working Plan**: AI-powered development priority tracking

### 🔌 **MCP Server Integration**
- **context7**: Up-to-date documentation and library context for any framework
- **playwright**: Browser automation, testing, and web interaction capabilities  
- **sequential-thinking**: Advanced multi-step reasoning and problem-solving chains

### 🧩 Background Daemon (PM2)

- PM2 auto-install: ensured during install via postinstall/prereqs/installer
- Per-project daemon: `flashback init` generates `.claude/flashback/scripts/pm2/ecosystem.config.js`
- Start/stop/status/logs:
  - `flashback daemon --start`
  - `flashback daemon --stop`
  - `flashback daemon --status`
  - `flashback daemon --logs`
- Naming: PM2 app name uses your `project_name` from `flashback.json` (sanitized)

## 🎯 Slash Commands You'll Use

### Persona Analysis (Current Conversation)
```bash
/fb:persona architect "should we refactor the database layer?"
/fb:persona security "review authentication in src/auth/"
/fb:persona database-architect "optimize our PostgreSQL schema and indexes"
/fb:persona api-designer "design GraphQL schema for user management"
/fb:persona data-engineer "review our Apache Kafka streaming pipeline"
/fb:persona platform-engineer "Kubernetes deployment and scaling strategy"
/fb:persona docker-master "optimize container deployment and orchestration"
/fb:persona performance "optimize our query performance"
/fb:persona qa "what edge cases should we test?"
/fb:persona john-carmack "analyze hot path performance and control flow"
```

### Agent Analysis (Dedicated Subagents)
```bash
@agent-architect "analyze our microservices architecture"
@agent-security "comprehensive security audit of auth system"
@agent-database-architect "database design review with optimization recommendations"
@agent-api-designer "REST API standards compliance and OpenAPI specification"
@agent-data-engineer "ETL pipeline performance and data quality analysis"
@agent-platform-engineer "infrastructure-as-code review and DevOps optimization"
@agent-docker-master "comprehensive containerization strategy and deployment optimization"
@agent-performance "deep performance analysis with recommendations"
@agent-qa "create comprehensive testing strategy"
```

### Session Management
```bash
/fb:working-plan          # Update development plan with AI analysis
/fb:save-session         # Capture session insights before compaction
/fb:session-start        # Load project context (runs automatically via hook)
/fb:how                  # Implementation planning prompt (plan before coding)
/fb:how "specific topic"         # Focused planning for specific topic only
/fb:remember important insight here  # Add key information to project memory
/fb:persona-list         # Show all available AI personas with descriptions
/fb:agents-list          # Show all available Claude Code agents with descriptions
/fb:discuss architect,security "topic"  # Multi-agent discussion coordination
```

### Multi-Language Code Quality Analysis
```bash
/fb:debt-hunter                      # Hunt technical debt across 6 programming languages
/fb:debt-hunter duplicates           # Focus on duplicate function detection
/fb:debt-hunter comprehensive        # Full analysis (debt + duplicates)
/fb:hallucination-hunter             # Hunt AI-generated code that doesn't actually work

# Automatically detects and analyzes:
# - JavaScript/TypeScript: console.log(), debugger;, empty functions
# - Python: print(), pdb.set_trace(), NotImplementedError
# - Go: fmt.Println(), panic(), runtime.Breakpoint()
# - Java: System.out.println(), UnsupportedOperationException
# - Rust: println!(), panic!(), unimplemented!()
# - Universal patterns: TODO comments, generic names, similar functions
```

### Memory Management
```bash
# Add key information to project memory:
/fb:remember important architectural decision about database design

# View current project memory:
flashback memory --show
```

## 🏗️ How It Works

### 1. Installation & Setup
- Run `flashback init --mcp` once per project (recommended)
- Creates `.claude/flashback/` directory structure  
- Installs SessionStart hook for automatic context loading
- Configures powerful MCP servers for enhanced capabilities

### 2. Daily Usage
- Use `/fb:persona <name> "request"` for specialized analysis
- Use `/fb:working-plan` to keep development priorities current  
- Use `/fb:save-session` before major context compactions
- Memory automatically loads via SessionStart hook

### 3. Behind the Scenes
- **CLI**: Gathers project context, loads templates, formats prompts
- **Claude**: Executes Task tool with specialized persona prompts
- **Hybrid Pattern**: Computer handles data, AI handles intelligence

## 🔧 Advanced Features

### Discussion System
```bash
# CLI command for multi-agent analysis (READ ONLY recommended):
flashback discuss "Should we use microservices?" john-carmack,architect,devops,security

# In-conversation multi-agent discussions:
/fb:discuss architect,security,performance "review this authentication implementation"
```

### Diagnostics (When Things Go Wrong)
```bash
flashback doctor          # Check system health
flashback status          # Verify installation
flashback init --refresh  # Update templates
flashback init --mcp      # Add MCP servers to existing setup
```

## 🏗️ Architecture

### Template-Driven System
- **Dynamic Directory Scanning**: Reads bundled templates at runtime
- **Zero Hardcoded Paths**: All structure derived from template bundle
- **Variable Replacement**: {{PROJECT_NAME}}, {{VERSION}}, {{TIMESTAMP}}
- **Version Sync**: Automatically uses package.json version

### Hybrid AI+Computer Operations
- **CLI**: Handles programmatic operations (file management, data extraction)
- **AI**: Handles intelligence operations (analysis, planning, decisions)
- **Clear Separation**: Computer does deterministic work, AI does creative work

## 🔧 Requirements

- **Node.js 18.x-22.x LTS**: Required for tree-sitter native modules and modern features  
- **npm 9.x+**: Required for lockfile version 3 support
- **Claude Code**: Latest version for hook system compatibility

**⚠️ Note**: Versions outside the Node.js 18-22 range may cause native module compilation errors.

## 🔒 Security

Flashbacker automatically excludes `.claude/` from git commits to protect sensitive data.

## 📄 License

MIT License

---

**v2.3.7 Status**: 🚧 **ALPHA** - **Complete Workflow System** + **20 Total Specialists**. Adds PM2 background daemon foundation and readable per-project process names. Includes Claude context status line monitor.

## 🙏 Acknowledgments

This project draws inspiration and prompts from:

- **[SuperClaude Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)** - Advanced AI persona system concepts
- **[CCPlugins](https://github.com/brennercruvinel/CCPlugins)** - Some excellent prompt inspiration