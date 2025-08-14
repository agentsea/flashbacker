# Flashbacker User Guide

> **Claude Code state management with session continuity and specialized AI personas**

## 🎉 Current Status (v2.3.5 - August 14, 2025)

**Flashbacker provides session continuity for Claude Code through intelligent state management and specialized AI personas accessed via `/fb:` slash commands.**

### How You Actually Use Flashbacker ✅

**🎯 PRIMARY USAGE - SLASH COMMANDS IN CLAUDE CODE:**
- ✅ `/fb:persona architect "review API design"` - Get specialized architectural analysis
- ✅ `/fb:persona security "analyze vulnerabilities"` - Security expert analysis
- ✅ `/fb:working-plan` - AI updates development priorities from conversation
- ✅ `/fb:save-session` - Capture session insights before compaction
- ✅ **Automatic Context Loading**: SessionStart hook loads project memory + working plan

**🧠 SESSION CONTINUITY SYSTEM:**
- ✅ **Memory Injection**: REMEMBER.md prevents repeated corrections across sessions
- ✅ **Working Plan Intelligence**: AI analyzes conversations to update development priorities
- ✅ **Template-Driven Architecture**: Dynamic scanning with zero hardcoded paths

**🎭 DUAL-LAYER AI SYSTEM:**
- ✅ **Layer 1 - Personas**: Direct template application in current conversation (`/fb:persona`)
- ✅ **Layer 2 - Agents**: Dedicated subagents with project context (`@agent-{name}`)
- ✅ **Context Bundles**: Agents auto-gather REMEMBER.md, WORKING_PLAN.md, conversation history
- ✅ **Discussion System**: Multi-persona AI debates for complex decisions

## 🚀 Installation

```bash
# Clone and build
git clone https://github.com/agentsea/flashbacker.git
cd flashbacker
npm install && npm run build

# Link globally
npm link

# Initialize in your project
cd /path/to/your/project
flashback init
```

## 🎯 How You Actually Use Flashbacker

After installation, you primarily use Flashbacker through **slash commands in Claude Code**:

### Primary Commands (What You'll Use Daily)
```bash
# Persona Commands (Current Conversation)
/fb:persona architect "review our API design"     # Direct template application
/fb:persona security "analyze authentication"     # Security expert analysis  

# Agent Commands (Dedicated Subagents)
@agent-architect "comprehensive API analysis"     # Spawns subagent with full context
@agent-security "security audit with remediation" # Project-aware security analysis

# Session Management
/fb:working-plan                                  # Update development priorities
/fb:save-session                                  # Capture session insights
/fb:how                                           # Plan implementation before coding
/fb:how "specific topic"                              # Plan implementation for specific topic only
/fb:remember key insight or decision              # Save important info to memory

# Code Quality & Fix Analysis
/fb:debt-hunter                                   # Hunt technical debt and code quality issues
/fb:hallucination-hunter                          # Hunt AI-generated code that doesn't work
/fb:fix-master "error description"                 # Surgical fix methodology for precise bug fixes
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

### Direct CLI Commands (Rarely Used)
```bash
# Setup and diagnostics
flashback init                    # Initialize project (one-time setup)
flashback status                  # Show installation status
flashback doctor                  # Run system diagnostics

# Memory management (if needed)
flashback memory --show           # View current project memory

# Discussion system (advanced)
flashback discuss "Should we use microservices?" --personas architect,devops,security
```

## ✨ Dual-Layer AI System

### Persona Commands (Current Conversation)
```bash
/fb:persona architect "should we refactor the database layer?"
/fb:persona database-architect "optimize database schema and queries"
/fb:persona api-designer "design REST API for user management"
/fb:persona data-engineer "review ETL pipeline architecture"
/fb:persona platform-engineer "Kubernetes deployment strategy"
/fb:persona docker-master "optimize container deployment and orchestration"
/fb:persona security "review authentication in src/auth/"
/fb:persona performance "optimize our query performance"
/fb:persona qa "what edge cases should we test?"
/fb:persona backend "review API reliability"
/fb:persona frontend "improve user experience"
/fb:persona analyzer "investigate this bug"
/fb:persona john-carmack "analyze hot path performance and control flow"
```

### Agent Commands (Dedicated Subagents)
```bash
@agent-architect "comprehensive architecture review"
@agent-database-architect "database design and optimization analysis"
@agent-api-designer "REST/GraphQL API architecture and specifications"
@agent-data-engineer "ETL pipeline and data architecture review"
@agent-platform-engineer "Kubernetes infrastructure and DevOps analysis"
@agent-docker-master "comprehensive Docker and container orchestration analysis"
@agent-security "full security audit with threat modeling"
@agent-performance "deep performance analysis and optimization"
@agent-qa "create comprehensive testing strategy"
@agent-backend "API reliability assessment"
@agent-frontend "UX analysis and accessibility audit"
@agent-analyzer "root cause analysis with investigation"
@agent-john-carmack "performance-critical systems analysis with game engine principles"
```

### Session Management Commands
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

### Code Quality & Fix Commands
```bash
/fb:debt-hunter                      # Hunt technical debt and code quality issues
/fb:debt-hunter duplicates           # Focus on duplicate function detection
/fb:debt-hunter comprehensive        # Full technical debt + duplicate analysis
/fb:hallucination-hunter             # Hunt AI-generated code that doesn't actually work
/fb:fix-master "error description"    # Surgical fix methodology for systematic bug fixes
```

## 🎭 Available AI Personas

**Layer 1: Personas** - Direct template application in current conversation  
**Layer 2: Agents** - Dedicated subagents with comprehensive project context

All 20 specialists available in both layers:

- **architect**: Systems architecture, scalability, design patterns
- **security**: Threat modeling, vulnerabilities, compliance  
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

## 🧠 Memory System

Flashbacker maintains project knowledge that survives context compactions:

### Automatic Memory Loading
- **SessionStart Hook**: Automatically loads REMEMBER.md + WORKING_PLAN.md after compaction
- **Context Injection**: Every persona gets full project context
- **Persistent Knowledge**: Key insights survive across sessions

### Manual Memory Management
```bash
# Add key information to project memory
/fb:remember important architectural decision about database design

# View current memory (CLI command)
flashback memory --show
```

## 🔄 Session Continuity System

### Working Plan Intelligence
```bash
/fb:working-plan    # AI analyzes conversation and updates development priorities
```
This command:
- Analyzes recent conversation for accomplishments and new tasks
- Updates current phase and priorities
- Moves completed tasks to "Recently Completed" section
- Identifies next steps discovered during the session

### Implementation Planning
```bash
/fb:how                  # Get structured implementation planning prompt
/fb:how "specific topic" # Focused planning for specific topic only
```
This command:
- Prompts Claude to understand your request clearly
- Requires step-by-step implementation plan
- Identifies file changes, risks, and success criteria
- Ensures approval before beginning implementation
- **NEW**: Accepts optional arguments for focused planning on specific topics

### Memory Management
```bash
/fb:remember key information here    # Add important info to project memory
```
This command:
- Adds information to `.claude/flashback/memory/REMEMBER.md`
- Categorizes information into appropriate sections
- Ensures key insights survive context compactions
- Makes knowledge available to all personas and future sessions

### Session Capture
```bash
/fb:save-session    # Capture session insights before compaction
```
This command:
- Creates structured session summary
- Documents files modified with descriptions
- Records key accomplishments and problems solved
- Identifies next steps for future sessions

### Automatic Session Restoration
- **SessionStart Hook**: Automatically loads project context after compaction
- **Context Loading**: REMEMBER.md + WORKING_PLAN.md + conversation history
- **No Manual Action Required**: Everything loads automatically

## 🔄 Discussion System (Advanced)

Create AI-to-AI debates for complex decisions:

```bash
# CLI command for multi-persona debates:
flashback discuss "Should we use microservices?" --personas architect,devops,security
flashback discuss "API design review" --personas backend,frontend,architect
```

How it works:
1. **Parse Agent List**: Extract comma-separated agents from command
2. **Gather Context**: Run `flashback agent --context` to get project bundle
3. **Sequential Agent Calls**: Call each requested agent individually with full context
4. **Synthesize Results**: Analyze responses for consensus, disagreements, and recommendations

## 🔧 Setup & Troubleshooting

### Initial Setup
```bash
# After installation, initialize in your project:
cd /path/to/your/project
flashback init

# Verify everything works:
flashback status
flashback doctor
```

### Common Issues

**Issue: `/fb:` commands don't work**
- Solution: Run `flashback init` in your project directory first

**Issue: Personas don't have project context**
- Solution: Ensure `.claude/flashback/memory/` contains REMEMBER.md and WORKING_PLAN.md

**Issue: Wrong version or outdated templates**
```bash
# Re-build and refresh:
cd /path/to/flashback
npm run build && npm unlink && npm link
flashback init --refresh  # In your project
```

## 🏗️ How It Works

### 1. Installation & Setup
- Run `flashback init` once per project
- Creates `.claude/flashback/` directory structure
- Installs SessionStart hook for automatic context loading

### 2. Daily Usage
- Use `/fb:persona <name> "request"` for specialized analysis
- Use `/fb:working-plan` to keep development priorities current  
- Use `/fb:save-session` before major context compactions
- Memory automatically loads via SessionStart hook

### 3. Behind the Scenes
- **CLI**: Gathers project context, loads templates, formats prompts
- **Claude**: Executes Task tool with specialized persona prompts
- **Hybrid Pattern**: Computer handles data, AI handles intelligence

## 💡 Best Practices

1. **Start with `/fb:persona` commands**: Get specialized analysis for any technical question
2. **Use Memory System**: Add key insights with `/fb:remember "important decision about X"`
3. **Update Working Plans**: Use `/fb:working-plan` regularly to track progress
4. **Plan Before Coding**: Use `/fb:how` to ensure clear understanding before implementation
5. **Capture Sessions**: Use `/fb:save-session` before major context compactions
6. **Trust the Hook System**: SessionStart automatically loads context after compaction
7. **Multi-persona Discussions**: Use `flashback discuss` for complex architectural decisions

## 🔒 Security

Flashbacker automatically excludes `.claude/` from git commits to protect sensitive data.

## 🔧 Requirements

- **Node.js 16+**: Required for TypeScript and modern features
- **Claude Code**: Latest version for hook system compatibility

---

**v2.3.5 Status**: 🚧 **ALPHA** - Comprehensive task management system with 20 total specialists. Added `/fb:create-tasks`, `/fb:update-tasks`, `/fb:tasks-status`, and `/fb:work-task` commands with surgical discipline enforcement and atomic deliverable focus.