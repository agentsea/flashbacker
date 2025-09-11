# Flashbacker User Guide

> **Claude Code state management with session continuity and specialized AI personas**

## 🎉 Current Status (v2.3.7 - September 11, 2025)

**Flashbacker provides:** 

1) session continuity for Claude Code through intelligent state management memory commands
2) specialized AI personas accessed via `/fb:` slash commands
3) Dedicated agents accessed via @agent-{AGENT-NAME} commands
4) Agent discussion system for complex issues
5) A code task management system for complex issues
6) A code quality and fix system for complex issues


## 🚀 Quick Installation

**Option 1: NPM Package (RECOMMENDED)**
```bash
# Install from npm registry
npm install -g flashbacker

# Initialize in your project with MCP servers
cd /path/to/your/project
flashback init --mcp              # Includes context7, playwright, sequential-thinking
```

**Option 2: Source Installation (Development)**
```bash
# Clone and build from source
git clone https://github.com/agentsea/flashbacker.git
cd flashbacker
npm install && npm run build

# Link globally
npm link

# Initialize in your project
cd /path/to/your/project
flashback init --mcp
```

> 📖 **[Complete Installation Guide →](INSTALLATION.md)** - Full installation options, troubleshooting, and MCP setup

### How You Actually Use Flashbacker ✅

**🎯 PRIMARY USAGE - SLASH COMMANDS IN CLAUDE CODE:**

**🎭 DUAL-LAYER AI SYSTEM:**
- ✅ **Layer 1 - Personas**: Direct template application in current conversation (`/fb:persona`)
- ✅ **Layer 2 - Agents**: Dedicated subagents with project context (`@agent-{name}`)
- ✅ **Context Bundles**: Agents auto-gather REMEMBER.md, WORKING_PLAN.md, conversation history
- ✅ **Discussion System**: Multi-persona AI debates for complex decisions

**Note: Personas are NOT sub-agents. They are specialized templates that are applied to the current conversation.**

- ✅ `/fb:persona architect "review API design"` # Get specialized architectural analysis
- ✅ `/fb:persona security "analyze vulnerabilities"` # Security expert analysis
- ✅ **Automatic Context Loading**: SessionStart hook loads project memory + working plan

**Note: Agents ARE sub-agents. They are largely the same as personas but launch dedicated SUBAGENTS.**

- ✅ `@agent-architect "review API design"` # Get specialized architectural analysis
- ✅ `@agent-security "analyze vulnerabilities"` # Security expert analysis
- ✅ `@agent-john-carmack "analyze hot path performance and control flow"` # Performance-critical systems analysis with game engine principles in the style of the legendary John Carmack
- ✅ `@agent-code-critic "be brutally honest about this code and tell me what is actually implemented and what is not realistically!"`      # Code quality enforcement

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

**🧠 SESSION CONTINUITY SYSTEM AND MEMORY:**

**Note: This allows Claude to overcome amnesia when it /compact is called or it auto-compacts or if you use /exit to exit the session. DETAILS in 'Session Management Commands'**

- ✅ `/fb:working-plan` # AI updates development priorities from conversation to the ./claude/flashback/memory/WORKING_PLAN.md file
- ✅ `/fb:save-session` # Capture session insights before compaction to the ./claude/flashback/memory/CURRENT_SESSION.md file

### 📟 Claude Context Status Line (New in v2.3.7)

Flashbacker now ships a status line monitor that shows real-time Claude context usage:

```
[Claude Sonnet 4] 📁 my-project | 🌿 main | 🧠 25.6K/1M (2.6%)
```

- Installed at `.claude/statusline/claude_context_monitor.js` during `flashback init`/`--refresh`
- Detects 1M vs 200K context windows (Claude 4/Sonnet 4 vs others)
- Uses real `usage` tokens from your conversation transcript

Quick test after init:

```bash
node .claude/statusline/claude_context_monitor.js <<'JSON'
{ "model": "claude-4.1", "transcriptPath": ".claude/statusline/examples/sample-transcript-1m.json", "cwd": "." }
JSON
```

See `.claude/statusline/README.md` for details and examples.
- ✅ `/fb:remember "always remember to do XYZ with this project"` # AI updates key insights from conversation to the ./claude/flashback/memory/REMEMBER.md file

## 🔄 **Complete Session Management Workflows**

### Workflow 1: After Context Compaction

**Does memory management happen automatically? NO!!!! Claude Code does not have proper hooks for pre and post compaction at this time so session management is done manually!**

When you see Claude has about **10% context window left** run the following:

1. `/fb:working-plan` command AND/OR `/fb:save-session` to capture session insights before compaction to the `./claude/flashback/memory/WORKING_PLAN.md` file or the `./claude/flashback/memory/CURRENT_SESSION.md` file respectively.

2. AFTER COMPACTION, RUN `/fb:session-start` to restore the context from the `./claude/flashback/memory/CURRENT_SESSION.m` file


## 🔄 Complete Session Continuity System Commands

### Working Plan Intelligence
```bash
/fb:working-plan  "create a new working plan based on everything we just discussed"  # AI analyzes conversation and updates development priorities
```
This command:
- Analyzes recent conversation for accomplishments and new tasks
- Updates current phase and priorities
- Moves completed tasks to "Recently Completed" section
- Identifies next steps discovered during the session

### Getting Claude to Understand and Output a Plan to Implement
```bash
/fb:how                  # Get structured implementation planning prompt
/fb:how "Explain exactly what you understood from what I just told you and output a plan to implement it" # Focused planning for specific topic only
```
This command:
- Prompts Claude to understand your request clearly so you know you are aligned as AI often DOES NOT UNDERSTAND YOU and you can save a LOT of TIME and TROUBLE and frustration by having it explain what it understood and what it's plan is to implement it.
- Requires step-by-step implementation plan


### Memory Management
```bash
/fb:remember {key information here}    # Add important info to project memory
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


## 🎯 More Details on How You Actually Use Flashbacker

After installation, you primarily use Flashbacker through **slash commands in Claude Code**:

### Primary Commands (What You'll Use Daily)
```bash
# Persona Commands (Current Conversation) - These are specialized templates that are applied to the current conversation.
/fb:persona architect "review our API design"     # Direct template application
/fb:persona security "analyze authentication"     # Security expert analysis  

# Agent Commands (Dedicated Subagents) - These launch a dedicated subagent with full context.
@agent-architect "comprehensive API analysis"     # Spawns subagent with full context
@agent-security "security audit with remediation" # Project-aware security analysis

# Agent Discussion system - Spawns a series of dedicated agents and injects them with full context to analyze a specific issues/debate architecture or fix a specific issue. Recommended READ ONLY to claude so that multiple agents do not try to change the codebase at the same time.
flashback discuss "Should we use microservices? Research the pros and cons and provide concrete recommendations with a clear list and a summary of your findings and citations." john-carmack,architect,devops,security

# Session Management
**Use the working-plan command to save a comprehensive working plan of what you are developing and to keep that plan updated with information**
/fb:working-plan  {additional information to tell Claude}                                # Update development priorities and capture them in a document ./claude/flashback/memory/WORKING_PLAN.md (which you can read directly in your project)

**Use the remember command to save bite size, important info like a) tests always go in ./tests b) .env files must always go in .gitignore c) etc.**
/fb:remember {key insight or decision}             # Save important info to memory to ./claude/flashback/memory/REMEMBER.md (which you can read directly in your project). 

/fb:save-session                                  # Capture session insights and capture them in a document ./claude/flashback/memory/CURRENT_SESSION.md  (which you can read directly in your project)

**Use this to ask Claude to explain WHAT it understood about your command and what its plan to implement it is.**
/fb:how                                           # Plan implementation before coding
/fb:how "I asked you to create a unit test and you created a suite of fake e2e tests. What did you understand about what I asked you to do?"                              # Plan implementation for specific topic only

**Use AST trees for Go, Python, TypeScript, JavaScript (with automatic language detection) heuristics to hunt down technical debt and code quality issues like placeholders, fake code, duplicate code, etc.**
# Code Quality & Fix Analysis
/fb:debt-hunter     

**Use to hunt down fake AI hallucinated code that does absolutely nothing and needs to be purged immediately.**    
# Hunt AI-generated code that doesn't work                          # Hunt technical debt and code quality issues
/fb:hallucination-hunter   

**Use this to reign in the worst of Claude nonsense. It tells claude to laser focus on specific issues to avoid creating dozens of placeholder files and fake e2e tests before features are complete.**

/fb:fix-master "error description"                 # Surgical fix methodology for precise bug fixes
```


### Direct CLI Commands (Rarely Used)
```bash
# Setup and diagnostics

** Run this to initialize your project with Flashbacker AFTER cding into your project directory!!!**
flashback init                    # Initialize project (one-time setup)

** Run this when a new version of Flashbacker is released to refresh commands and templates!**
flashback init --refresh                   # Initialize project (one-time setup)

** Run this to show the status of your Flashbacker installation**
flashback status                  # Show installation status

** Run this to run system diagnostics**
flashback doctor                  # Run system diagnostics
```

## ✨ Available AI Personas and Agents - CURRENT LIST

**Personas are specialized templates that are applied to the current conversation.**
**Agents are dedicated subagents with full context.**


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


### Session Management Commands
```bash
/fb:working-plan          # Update development plan with AI analysis
/fb:save-session         # Capture session insights before compaction
/fb:session-start        # Load project context (runs automatically via hook)
/fb:remember important insight here  # Add key information to project memory
```

### Code Quality & Fix Commands
```bash
/fb:persona-list         # Show all available AI personas with descriptions
/fb:agents-list          # Show all available Claude Code agents with descriptions
/fb:debt-hunter                      # Hunt technical debt and code quality issues
/fb:debt-hunter duplicates           # Focus on duplicate function detection
/fb:debt-hunter comprehensive        # Full technical debt + duplicate analysis
/fb:hallucination-hunter             # Hunt AI-generated code that doesn't actually work
/fb:fix-master "error description"    # Surgical fix methodology for systematic bug fixes
```


## 🧠 Using the Memory System

Flashbacker maintains project knowledge that survives context compactions if you manually use it. Unfortunately, Claude Code does not support AUTOMATIC memory HOOKS via pre-compaction or post-compaction.

**What You Should Do Next:**
```bash
# 1. Verify context loaded properly
"Can you remind me what we were working on?"

# 2. Check if any important decisions were missed
/fb:remember "any key insights from the previous session"

# 3. Update working plan if priorities changed
/fb:working-plan

# 4. Continue with your specific work
/fb:persona architect "continue with the authentication system review"
```

### Workflow 2: Starting a Brand New Session

**Complete startup sequence for maximum productivity:**

```bash
# 1. Load project context (automatic, but verify)
"What's the current state of this project?"

# 2. Review working plan and priorities
/fb:working-plan

# 3. Get implementation guidance for your session
/fb:how "today I want to work on user authentication"

# 4. Use specialized personas for your work
/fb:persona security "analyze current auth implementation"
/fb:persona backend "review API endpoints for user management"

# 5. As you work, update memory with key insights
/fb:remember "decided to use JWT tokens with refresh token rotation"

# 6. Before ending, capture the session
/fb:save-session
```

### Workflow 3: Mid-Session Context Management

**When conversation gets long (before hitting token limits):**

```bash
# 1. Capture current progress
/fb:save-session

# 2. Update working plan with accomplishments
/fb:working-plan

# 3. Save any important insights
/fb:remember "key architectural decision: using Redis for session storage"

# 4. Let Claude Code compact naturally
# 5. SessionStart hook will restore context automatically
```

### Workflow 4: Session Transition (Switching Tasks)

**Moving from one major task to another:**

```bash
# 1. Complete current task documentation
/fb:save-session
/fb:working-plan  # Mark current task complete

# 2. Plan new task
/fb:how "implement user roles and permissions system"

# 3. Get specialized analysis for new task
/fb:persona security "design role-based access control"
/fb:persona database-architect "design user roles schema"

# 4. Update project memory with task transition
/fb:remember "completed auth system, moving to RBAC implementation"
```

## 📝 **Task & Issues Management System**

Flashbacker includes a comprehensive task management system with surgical discipline:

### Task Management Commands

**Task management currently reads from ./docs/issues in your CODEBASE and expects issues in that directory in the following format: ISSUE-008-non-interactive-deploy-and-e2e-tests.md**

**FIRST create your own issue file in ./docs/issues in your CODEBASE or tell claude to create one for you after you have discuss what you want to do next. THEN use the following commands to break that issue into TASKS, UPDATE TASKS, and WORK ON TASKS.**

### Task Creation Workflow

**Creating well-defined tasks:**
```bash
# 1. Create tasks from high-level requirements
/fb:create-tasks "break down ISSUE-014-non-interactive-deploy-and-e2e-tests into tasks"

# This creates atomic tasks like:
# Task 1: Design JWT authentication flow
# Task 2: Create user registration endpoint
# Task 3: Implement login/logout functionality 
# Task 4: Add password reset capability
# Task 5: Write authentication tests
```

### Working with Tasks

```bash
# Start working on a specific task
/fb:work-task {task-number}  # Loads full context for task #2

# Update task progress
/fb:update-tasks {task-number} # AI analyzes conversation and updates task status

# Check overall progress
/fb:tasks-status {task-number} # Shows completed, in-progress, and pending tasks
```


## 🔄 Discussion System & Code Critique

### Multi-Agent Discussions for Complex Decisions

**CLI Command for Architecture Debates:**
```bash
# High-level architectural decisions
flashback discuss john-carmack,security,typescript-master "Should we use microservices?" architect,devops,security
flashback discuss john-carmack,architect,code-critic "Do a comprehensive API design review and output a plan to update it so it is more consistent with our agreed upon architecture."
```

**Slash Command for Code Critique (In-Conversation):**
```bash
# Code review discussions
/fb:discuss architect,security,performance "review this authentication implementation"
/fb:discuss frontend,backend,qa "analyze this API integration"
/fb:discuss database-architect,performance "optimize this query structure"
```

### Code Critique Workflows

#### Workflow 1: Comprehensive Code Review

```bash
# 1. Start with architecture analysis
@agent-security "analyze the overall structure of this auth system"

# 2. Security deep-dive
@agent-security "identify security vulnerabilities in this code"

# 3. Performance assessment
@agent-code-critic "be brutally honest about this code and tell me what is actually implemented and what is not realistically!"

# 4. Multi-agent discussion for consensus
/fb:discuss architect,security,performance "synthesize findings and provide unified recommendations"
```

#### Workflow 2: Targeted Code Issues

```bash
# Get multiple perspectives on the fix:
/fb:discuss backend,security "validate this authentication bug fix approach. output a plan to fix it."

# For specific problems or bugs:
/fb:fix-master "authentication fails intermittently with 500 errors"

# Test strategy validation:
/fb:discuss qa,backend "review the fix for issues and suggest a plan to fix it."
```

#### Workflow 3: Pre-Implementation Review

```bash
# Before writing code, get design validation:
/fb:how "When I told you to implement OAuth2 integration with Google, you created a placeholder file. What did you understand about what I asked you to do?"

# Get architectural input:
/fb:persona architect "design OAuth2 flow architecture"

# Security validation:
/fb:persona security "validate OAuth2 security implementation"

# Multi-agent design review:
/fb:discuss architect,security,backend "finalize OAuth2 implementation approach"
```

### Real-World Code Critique Examples

#### Example 1: Database Performance Issue

```bash
# Problem: Slow user queries
/fb:persona database-architect "analyze this user query performance issue"
/fb:persona performance "identify bottlenecks in user data retrieval"

# Multi-agent solution discussion:
/fb:discuss database-architect,performance,backend "design optimal user query solution"

# Result: Consensus on indexing strategy + query optimization
```


## 🔗 **Complete Integrated Workflow Examples**

### Complete Feature Development Workflow

**Scenario: Implementing User Profile Management**

```bash
# 1. Initial planning and task creation
/fb:how "What did you understand about what I asked you to do?"
/fb:create-tasks ISSUE-012 "implement user profile management with photo uploads"

# 2. Architecture and design phase
/fb:persona architect "design user profile system architecture"
/fb:persona api-designer "design profile management API endpoints"
/fb:persona security "security considerations for profile data and file uploads"

# 3. Multi-agent design review
/fb:discuss architect,api-designer,security "finalize profile management design"

# 4. Implementation phase with task focus
/fb:work-task TASK-001  # Start with first atomic task
/fb:persona backend "implement profile data model"
/fb:remember "using bcrypt for password hashing, S3 for profile images"

# 5. Continuous validation during development
/fb:persona qa "what should we test for profile image uploads?"
/fb:fix-master "profile image upload fails with large files"

# 6. Progress tracking and session management
/fb:update-tasks  # Update task progress based on conversation
/fb:working-plan  # Update overall development priorities
```

### Bug Investigation and Resolution Workflow

**Scenario: Critical Production Issue**

```bash

# 1. Multi-domain investigation
/fb:persona analyzer "investigate this login failure after password reset"
/fb:persona security "analyze authentication flow for password reset issues"
/fb:persona backend "debug API responses for login failures"

# 2. Fix the problem
/fb:fix-master-enhanced "users can't login after password reset, getting 401 errors"

# 3. Root cause discussion
/fb:discuss analyzer,security,backend "discuss the fix and validate that it works"

# 4. Solution validation
/fb:persona qa "create test cases for password reset login flow"
/fb:remember "issue was token invalidation not happening after password reset"

# 5. Implementation tracking
/fb:update-tasks "update the issue with the stuff we just checked into git by looking at the diffs"
```

### Code Review and Refactoring Workflow

**Scenario: Legacy Code Modernization**

```bash
# 1. Comprehensive code analysis
/fb:debt-hunter comprehensive  # Scan for technical debt
/fb:hallucination-hunter        # Check for non-functional code

# 2. Multi-agent code review
/fb:persona code-critic "review this legacy authentication module"
/fb:persona refactorer "suggest refactoring approach for cleaner code"
/fb:persona security "identify security improvements needed"

# 3. Collaborative refactoring plan
/fb:discuss code-critic,refactorer,security "create refactoring roadmap"

# 4. Incremental improvement
/fb:create-tasks "refactor authentication module following everything the agents outlined"
/fb:work-task 1  # Start with first refactoring task

# 5. Validation and testing
/fb:persona qa "test strategy for refactored authentication"
/fb:working-plan  # Update priorities with refactoring progress
```

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

## 🔒 Security

Flashbacker automatically excludes `.claude/` from git commits to protect sensitive data.

## 🔧 Requirements

- **Node.js 16+**: Required for TypeScript and modern features
- **Claude Code**: Latest version for hook system compatibility

---

**v2.3.7 Status**: 🚧 **ALPHA** - **Complete Workflow System** with 20 total specialists. Adds Claude context status line monitor and init integration; keep templates refreshed with `flashback init --refresh`.