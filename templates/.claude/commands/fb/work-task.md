# Work on Specific Atomic Task

Focus AI attention on a single atomic task with full context and clear deliverables.

## Directory Structure
```
docs/tasks/                     # Task files location (read from here)
├── ISSUE-XXX-name/             # Per-issue task directories
│   ├── README.md               # Task progress dashboard
│   ├── phase-1-name.md         # Task file containing specific tasks
│   ├── phase-2-name.md         # Additional phase files
│   └── phase-N-name.md         # Phase files to search for task

docs/issues/                    # Issue files location (reference for context)
├── ISSUE-XXX-title.md          # Parent issue for background context
└── README.md                   # Issue tracking for dependencies
```

## Usage
`/fb:work-task <task-id> [context] [verify] [dependency-check]`

**Examples:**
- `/fb:work-task ISSUE-027.1.1.1` - Work on template signing research task
- `/fb:work-task ISSUE-027.2.3.2 context` - Include full project context for complex task
- `/fb:work-task ISSUE-015.1.2 verify` - Complete task and verify acceptance criteria
- `/fb:work-task ISSUE-027.1.1.4 dependency-check` - Check dependencies before starting

---

## Command Implementation

Parse the command arguments:
- **Argument 1** (required): Task ID in format ISSUE-XXX.PHASE.CATEGORY.TASK
- **Argument 2** (optional): "context" to include full project memory and working plan
- **Argument 3** (optional): "verify" to check acceptance criteria after completion
- **Argument 4** (optional): "dependency-check" to validate prerequisites

### Argument Parsing Logic
1. **Extract Task ID**: First argument must match ISSUE-XXX.N.N.N pattern
2. **Parse Components**: Split task ID into issue, phase, category, task numbers
3. **Check Flags**: Look for "context", "verify", "dependency-check" in remaining arguments
4. **Validate Task**: Ensure task exists in appropriate phase file

## How It Works

### Step 1: Task Loading
1. **Parse Task ID**: Extract issue number, phase, category, and task number
2. **Load Task File**: Read `docs/tasks/ISSUE-XXX/phase-N-name.md`
3. **Extract Task Details**: Get specific task, deliverables, acceptance criteria
4. **Check Dependencies**: Validate prerequisite tasks are marked complete

### Step 2: Context Assembly
1. **Task Context**: Load specific task details and requirements
2. **Issue Context**: Include relevant issue background and goals
3. **Project Context**: Add project memory if --context flag used
4. **Dependency Context**: Include completed dependency task outputs
5. **Tool Context**: Identify which Railway plugin tools are needed

### Step 3: Task Execution
1. **Present Task**: Clear description of what needs to be accomplished
2. **Provide Context**: All necessary background and requirements
3. **Execute Work**: AI implements the specific task deliverable
4. **Verify Completion**: Check against acceptance criteria if --verify used

## Task Context Template

When working on a task, provide this structured context:

```markdown
# Working on Task: ISSUE-XXX.X.X.X

## Task Details
**Task**: [Specific task name from task file]
**Deliverable**: [What specific output this task produces]
**Acceptance Criteria**: [How to verify task completion]
**Estimated Time**: [1-4 hours]
**Dependencies**: [Previous tasks that must be complete]

## Task Description
[Full task description from phase file]

## Relevant Context
### Issue Background
[Brief summary of parent issue goals and requirements]

### Completed Dependencies
[List of completed prerequisite tasks and their outputs]

### Available Tools
[Which Railway plugin tools are relevant for this task]

### Success Criteria
[Clear definition of what constitutes successful task completion]
```

## Implementation Instructions

### For Claude AI:
1. **Parse Task ID**: Extract ISSUE-XXX.PHASE.CATEGORY.TASK components
2. **Load Task File**: Use Read tool to get `docs/tasks/ISSUE-XXX/phase-N-name.md`
3. **Find Specific Task**: Locate the exact task within the phase file
4. **Check Dependencies**: Verify prerequisite tasks are marked complete (checkbox ✅)
5. **Assemble Context**: Gather all relevant background and requirements
6. **Execute Task**: Implement the specific deliverable with clear acceptance criteria
7. **Verify Completion**: If --verify flag, check against acceptance criteria

### Dependency Validation
```bash
# Task dependency examples
ISSUE-027.1.1.2 depends on ISSUE-027.1.1.1 ✅
ISSUE-027.2.1.1 depends on ISSUE-027.1.2.4 ✅
ISSUE-027.3.1.1 depends on ISSUE-027.2.3.3 ⏳ (not ready)
```

### Context Loading Strategy
- **Minimal Context**: Task details + immediate dependencies
- **Full Context** (--context): + project memory + working plan + issue background
- **Dependency Context**: Outputs from completed prerequisite tasks
- **Tool Context**: Relevant Railway plugin tools and their capabilities

## Error Handling

### Invalid Task ID
- Provide clear error message with correct format
- List available task IDs for the specified issue
- Suggest valid task alternatives

### Missing Dependencies
- List incomplete prerequisite tasks
- Explain dependency chain and why task can't proceed
- Suggest working on prerequisite tasks first

### Task Already Complete
- Confirm task is already marked complete
- Offer to re-work task if --force flag provided
- Suggest next logical task to work on

## CRITICAL: Task Focus Principles

### 🎯 Atomic Task Discipline (MANDATORY)
- **One Task, One Deliverable**: Focus ONLY on the specific atomic task requested
- **No Scope Creep**: Do not expand beyond the exact task requirements
- **Complete Solutions Only**: Never create placeholder files or "TODO" implementations
- **Working Code Required**: Every deliverable must be functional, not scaffolding

### 🚫 Anti-Patterns (NEVER DO THESE)
- **No Placeholder Hell**: Never create empty files with "TODO" comments
- **No E2E Test Madness**: Do not write comprehensive end-to-end tests for incomplete features
- **No File Generation Spree**: Do not create dozens of related files beyond task scope
- **No Speculative Code**: Only implement what the specific task requires

### ✅ Task Execution Standards
- **Read Before Write**: Always check existing codebase for similar patterns
- **Minimal Implementation**: Implement exactly what the task deliverable specifies
- **Manual Testing First**: Verify functionality works before writing any tests
- **Targeted Tests Only**: Write focused tests that verify the specific task deliverable

### Tool Pattern Compliance
- Tasks must align with CRUD/T/M/Comp operations
- No tasks should create "intelligent tools"
- All tasks follow AI Tool Interaction Pattern
- Claude provides orchestration, tools remain dumb

---

**Usage**: `/fb:work-task <TASK-ID> [--context] [--verify] [--dependency-check]`