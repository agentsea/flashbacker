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

## 🔄 **Complete Session Management Workflows**

### Workflow 1: After Context Compaction

**What Happens Automatically:**
1. **Claude Code compacts** your conversation to save tokens
2. **SessionStart Hook triggers** automatically (no action needed)
3. **Context injection occurs**:
   ```
   Loading project memory from REMEMBER.md...
   Loading working plan from WORKING_PLAN.md...
   Project context restored successfully! ✓
   ```

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

```bash
/fb:create-tasks "implement user authentication system"  # Create atomic tasks with clear deliverables
/fb:update-tasks                                        # Update task status and progress
/fb:tasks-status                                        # View current tasks and their status
/fb:work-task 1                                         # Focus on specific task with context
```

### Task Creation Workflow

**Creating well-defined tasks:**
```bash
# 1. Create tasks from high-level requirements
/fb:create-tasks "build user authentication system with JWT tokens"

# This creates atomic tasks like:
# Task 1: Design JWT authentication flow
# Task 2: Create user registration endpoint
# Task 3: Implement login/logout functionality 
# Task 4: Add password reset capability
# Task 5: Write authentication tests
```

### Task Management Best Practices

**Atomic Deliverables:**
- Each task has **one clear deliverable**
- Tasks are **independently testable**
- No placeholder implementations allowed
- **Surgical precision** - fix exactly what's broken

**Anti-Placeholder Enforcement:**
```bash
# ❌ BAD: Placeholder implementations
function authenticate(token) {
  // TODO: Implement token validation
  return true;
}

# ✅ GOOD: Complete, working implementation
function authenticate(token) {
  if (!token) throw new Error('Token required');
  return jwt.verify(token, process.env.JWT_SECRET);
}
```

### Working with Tasks

```bash
# Start working on a specific task
/fb:work-task 2  # Loads full context for task #2

# Update task progress
/fb:update-tasks # AI analyzes conversation and updates task status

# Check overall progress
/fb:tasks-status # Shows completed, in-progress, and pending tasks
```

### Integration with Memory System

**Tasks automatically integrate with:**
- **Working Plan**: High-level development priorities
- **Project Memory**: Key architectural decisions
- **Session Continuity**: Task context survives compaction

```bash
# Example integrated workflow:
/fb:create-tasks "refactor database layer for better performance"
/fb:work-task 1  # Start with task #1
/fb:persona database-architect "analyze current schema performance"
/fb:remember "identified N+1 query problem in user relations"
/fb:update-tasks # Mark analysis complete, move to implementation
```

## 🔄 Discussion System & Code Critique

### Multi-Agent Discussions for Complex Decisions

**CLI Command for Architecture Debates:**
```bash
# High-level architectural decisions
flashback discuss "Should we use microservices?" --personas architect,devops,security
flashback discuss "API design review" --personas backend,frontend,architect
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
/fb:persona architect "analyze the overall structure of this auth system"

# 2. Security deep-dive
/fb:persona security "identify security vulnerabilities in this code"

# 3. Performance assessment
/fb:persona performance "analyze bottlenecks and optimization opportunities"

# 4. Multi-agent discussion for consensus
/fb:discuss architect,security,performance "synthesize findings and provide unified recommendations"
```

#### Workflow 2: Targeted Code Issues

```bash
# For specific problems or bugs:
/fb:fix-master "authentication fails intermittently with 500 errors"

# Get multiple perspectives on the fix:
/fb:discuss backend,security "validate this authentication bug fix approach"

# Test strategy validation:
/fb:discuss qa,backend "review testing strategy for this auth fix"
```

#### Workflow 3: Pre-Implementation Review

```bash
# Before writing code, get design validation:
/fb:how "implement OAuth2 integration with Google"

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

#### Example 2: API Design Critique

```bash
# New API endpoint design
/fb:persona api-designer "review this REST API design for user management"
/fb:persona security "analyze API security implications"
/fb:persona frontend "evaluate API usability from frontend perspective"

# Multi-stakeholder discussion:
/fb:discuss api-designer,security,frontend "finalize user management API design"

# Result: Unified API specification with security and usability considerations
```

#### Example 3: Architecture Decision Validation

```bash
# Major architectural change
/fb:persona architect "evaluate microservices vs monolithic architecture"
/fb:persona devops "assess deployment and operational complexity"
/fb:persona performance "analyze performance implications"

# Strategic decision discussion:
/fb:discuss architect,devops,performance,security "make final architecture recommendation"

# Result: Evidence-based architectural decision with implementation roadmap
```

### Discussion System Benefits

**Multi-Perspective Analysis:**
- **Reduces blind spots** in code review
- **Catches edge cases** from different domains
- **Provides balanced recommendations** considering multiple factors

**Consensus Building:**
- **Identifies conflicting recommendations** between specialists
- **Synthesizes unified solutions** from diverse inputs
- **Prioritizes concerns** based on project context

**Knowledge Transfer:**
- **Documents decision rationale** in project memory
- **Captures expert insights** for future reference
- **Builds team understanding** of complex trade-offs

How the discussion system works:
1. **Parse Agent List**: Extract comma-separated agents from command
2. **Gather Context**: Run `flashback agent --context` to get project bundle
3. **Sequential Agent Calls**: Call each requested agent individually with full context
4. **Synthesize Results**: Analyze responses for consensus, disagreements, and recommendations
5. **Generate Action Items**: Provide clear next steps based on collective analysis

## 🔗 **Integrated Workflow Examples**

### Complete Feature Development Workflow

**Scenario: Implementing User Profile Management**

```bash
# 1. Initial planning and task creation
/fb:create-tasks "implement user profile management with photo uploads"
/fb:how "build user profile system with image handling"

# 2. Architecture and design phase
/fb:persona architect "design user profile system architecture"
/fb:persona api-designer "design profile management API endpoints"
/fb:persona security "security considerations for profile data and file uploads"

# 3. Multi-agent design review
/fb:discuss architect,api-designer,security "finalize profile management design"

# 4. Implementation phase with task focus
/fb:work-task 1  # Start with first atomic task
/fb:persona backend "implement profile data model"
/fb:remember "using bcrypt for password hashing, S3 for profile images"

# 5. Continuous validation during development
/fb:persona qa "what should we test for profile image uploads?"
/fb:fix-master "profile image upload fails with large files"

# 6. Progress tracking and session management
/fb:update-tasks  # Update task progress based on conversation
/fb:working-plan  # Update overall development priorities
/fb:save-session  # Capture session insights
```

### Bug Investigation and Resolution Workflow

**Scenario: Critical Production Issue**

```bash
# 1. Initial problem analysis
/fb:fix-master "users can't login after password reset, getting 401 errors"

# 2. Multi-domain investigation
/fb:persona analyzer "investigate this login failure after password reset"
/fb:persona security "analyze authentication flow for password reset issues"
/fb:persona backend "debug API responses for login failures"

# 3. Root cause discussion
/fb:discuss analyzer,security,backend "determine root cause of password reset login issue"

# 4. Solution validation
/fb:persona qa "create test cases for password reset login flow"
/fb:remember "issue was token invalidation not happening after password reset"

# 5. Implementation tracking
/fb:create-tasks "fix password reset authentication flow"
/fb:work-task 1
/fb:update-tasks
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
/fb:create-tasks "refactor authentication module following modern patterns"
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

## 💡 **Best Practices & Real-World Scenarios**

### Daily Development Workflow

**Morning Startup (5 minutes):**
```bash
# 1. Verify project context loaded
"What did we accomplish yesterday and what's next?"

# 2. Review and update priorities
/fb:working-plan

# 3. Plan today's work
/fb:how "today I want to implement the user dashboard"

# 4. Get initial analysis
/fb:persona frontend "analyze requirements for user dashboard"
```

**During Development:**
```bash
# Before implementing major features
/fb:how "specific feature implementation"

# When stuck or unsure
/fb:persona relevant-expert "specific question"

# For code review
/fb:discuss multiple-experts "review this implementation"

# Document key decisions
/fb:remember "important architectural decision"
```

**End of Day (3 minutes):**
```bash
# 1. Update task progress
/fb:update-tasks

# 2. Update working plan
/fb:working-plan

# 3. Capture session insights
/fb:save-session
```

### Pro Tips for Maximum Productivity

#### 1. **Leverage the Dual-Layer System**
```bash
# Quick questions: Use personas in current conversation
/fb:persona security "is this password validation secure?"

# Deep analysis: Spawn dedicated agents with full context
@agent-security "comprehensive security audit of authentication system"
```

#### 2. **Master the Task System**
```bash
# Break down large features into atomic tasks
/fb:create-tasks "build user dashboard with analytics"

# Focus on one task at a time
/fb:work-task 2  # Loads full context for task #2

# Track progress continuously
/fb:update-tasks
```

#### 3. **Use Discussion System for Complex Decisions**
```bash
# Architecture decisions
/fb:discuss architect,devops,security "microservices vs monolithic"

# Code review
/fb:discuss backend,frontend,qa "API integration approach"

# Performance optimization
/fb:discuss performance,database-architect "query optimization strategy"
```

#### 4. **Optimize Session Continuity**
```bash
# Proactive session management (before hitting token limits)
/fb:save-session    # Capture current progress
/fb:working-plan    # Update priorities
/fb:remember "key decision: using Redis for session storage"

# Let compaction happen naturally - context will restore automatically
```

#### 5. **Build Project Knowledge Systematically**
```bash
# Document architectural decisions
/fb:remember "authentication uses JWT with refresh token rotation"

# Capture lessons learned
/fb:remember "N+1 query issue resolved by adding user.posts index"

# Record important patterns
/fb:remember "using repository pattern for data access layer"
```

### Troubleshooting Common Scenarios

#### "I'm Stuck on a Bug"
```bash
# 1. Systematic investigation
/fb:fix-master "detailed error description"

# 2. Multi-angle analysis
/fb:persona analyzer "investigate this bug"
/fb:persona backend "debug server-side issues"

# 3. Collaborative debugging
/fb:discuss analyzer,backend,qa "determine root cause and fix"
```

#### "Need to Make an Architectural Decision"
```bash
# 1. Get expert perspectives
/fb:persona architect "evaluate options for user data storage"
/fb:persona performance "analyze performance implications"
/fb:persona devops "consider operational complexity"

# 2. Collaborative decision making
/fb:discuss architect,performance,devops "make final recommendation"

# 3. Document decision
/fb:remember "chose PostgreSQL over MongoDB for ACID requirements"
```

#### "Working on Legacy Code"
```bash
# 1. Comprehensive analysis
/fb:debt-hunter comprehensive
/fb:hallucination-hunter

# 2. Get modernization guidance
/fb:persona refactorer "suggest refactoring approach"
/fb:persona code-critic "identify improvement priorities"

# 3. Plan incremental improvements
/fb:create-tasks "modernize authentication module"
```

### Advanced Workflow Patterns

#### **The "Feature Complete" Pattern**
1. **Plan**: `/fb:how "implement feature X"`
2. **Design**: Multi-agent discussion for architecture
3. **Implement**: Task-focused development with continuous validation
4. **Review**: Code critique with discussion system
5. **Document**: Update memory with key decisions
6. **Track**: Update working plan with progress

#### **The "Bug Hunter" Pattern**
1. **Investigate**: `/fb:fix-master "error description"`
2. **Analyze**: Multiple persona perspectives on the issue
3. **Collaborate**: Discussion system for root cause analysis
4. **Resolve**: Focused task work with validation
5. **Prevent**: Update memory and tests to prevent recurrence

#### **The "Architecture Review" Pattern**
1. **Assess**: Current architecture with architect persona
2. **Critique**: Multi-agent review of design decisions
3. **Discuss**: Collaborative evaluation of alternatives
4. **Decide**: Evidence-based architectural choices
5. **Document**: Memory system for future reference

### Workflow Integration Principles

**Memory → Tasks → Working Plan:**
- **Memory**: Long-term architectural decisions and patterns
- **Tasks**: Short-term atomic deliverables with clear outcomes
- **Working Plan**: Medium-term priorities and development phases

**Personas → Discussions → Agents:**
- **Personas**: Quick expert analysis in current conversation
- **Discussions**: Multi-perspective collaborative decision making
- **Agents**: Deep analysis with full project context in dedicated conversations

**Sessions → Continuity → Context:**
- **Sessions**: Individual work periods with focused outcomes
- **Continuity**: Automatic context restoration across sessions
- **Context**: Rich project understanding that survives compactions

## 🔒 Security

Flashbacker automatically excludes `.claude/` from git commits to protect sensitive data.

## 🔧 Requirements

- **Node.js 16+**: Required for TypeScript and modern features
- **Claude Code**: Latest version for hook system compatibility

---

**v2.3.5 Status**: 🚧 **ALPHA** - **Complete Workflow System** with 20 total specialists. Enhanced with comprehensive task management, advanced discussion system, and integrated workflow patterns for professional development teams.