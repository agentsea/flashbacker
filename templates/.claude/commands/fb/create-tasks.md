# Create Granular Tasks from Issue

Generate atomic, AI-friendly task breakdown from comprehensive issues following the ai-dev-tasks methodology.

## Directory Structure
```
docs/issues/                     # Source issue files (read from here)
├── ISSUE-XXX-title.md          # Individual issue files to analyze
└── README.md                   # Issue tracking reference

docs/tasks/                     # Task files location (write to here)
├── ISSUE-XXX-name/             # Per-issue task directories (create these)
│   ├── README.md               # Task progress dashboard
│   ├── phase-1-name.md         # Granular tasks for Phase 1
│   ├── phase-2-name.md         # Granular tasks for Phase 2
│   └── phase-N-name.md         # Additional phases as needed
└── metadata.json               # Task metadata and tracking
```

## Usage
`/fb:create-tasks <issue-number> [force] [phases]`

**Examples:**
- `/fb:create-tasks ISSUE-027` - Generate full task breakdown for XYZ project scaffolding
- `/fb:create-tasks ISSUE-015 force` - Regenerate tasks, overwrite existing  
- `/fb:create-tasks ISSUE-027 phases:1,2` - Generate only specific phases

---

## Command Implementation

Parse the command arguments:
- **Argument 1** (required): Issue number (ISSUE-027, ISSUE-015, etc.)
- **Argument 2** (optional): "force" to overwrite existing task files
- **Argument 3** (optional): "phases:1,2,3" to generate only specific phases

### Argument Parsing Logic
1. **Extract Issue Number**: First argument must match ISSUE-XXX pattern
2. **Check Force Flag**: Look for "force" in arguments to enable overwrite
3. **Parse Phases**: Look for "phases:" prefix followed by comma-separated numbers
4. **Validate Issue**: Ensure issue file exists in docs/issues/ directory

## How It Works

### Step 1: Issue Analysis
1. **Read Issue File**: Load `docs/issues/ISSUE-XXX-*.md`
2. **Parse Structure**: Extract phases, deliverables, acceptance criteria
3. **Identify Dependencies**: Map dependencies between phases and tasks
4. **Validate Scope**: Ensure issue is suitable for task breakdown

### Step 2: Task Generation
1. **Create Task Directory**: `docs/tasks/ISSUE-XXX-name/`
2. **Generate Phase Files**: One markdown file per phase with granular tasks
3. **Create Progress Dashboard**: README.md with overall status tracking
4. **Add Metadata**: Task dependencies, acceptance criteria, verification steps

### Step 3: Task Formatting
Follow ai-dev-tasks structure:
```markdown
# Phase N: Phase Name (Timeline)

## N.1 High-Level Task Category
- [ ] N.1.1 Atomic task with specific deliverable
- [ ] N.1.2 Another atomic task with clear acceptance criteria
- [ ] N.1.3 Task with dependencies on previous tasks

## N.2 Next Task Category
- [ ] N.2.1 Sequential task building on N.1 completion
```

## CRITICAL: Task Quality Standards

### Atomic Task Requirements
- **Single Deliverable**: Each task produces one specific output
- **Clear Acceptance Criteria**: Obvious definition of "done"
- **Bounded Scope**: Completable in 1-4 hours by AI
- **Dependency Clarity**: Tasks that depend on previous task completion
- **Tool Pattern Compliance**: Tasks align with CRUD/T/M/Comp operations

### 🚫 Task Generation Anti-Patterns (NEVER CREATE THESE)
- **No Placeholder Tasks**: Never create tasks that say "create placeholder files"
- **No Speculative Tasks**: Tasks must have clear, immediate deliverable value
- **No E2E Test Tasks**: Do not create comprehensive testing tasks for incomplete features
- **No File Explosion Tasks**: Avoid tasks that generate dozens of related files
- **No "Research Everything" Tasks**: Keep research tasks focused and actionable

### Task Format Template
```markdown
## X.Y Task Name
**Deliverable**: What specific output this task produces
**Acceptance Criteria**: How to verify task completion
**Dependencies**: Which previous tasks must be complete
**Estimated Time**: 1-4 hours
**Tools Used**: Which Railway plugin tools are involved

- [ ] X.Y.1 Specific atomic step with clear deliverable
- [ ] X.Y.2 Next step that builds on X.Y.1
- [ ] X.Y.3 Final step with verification/testing
```

## Implementation Instructions

### For Claude AI:
1. **Read the Issue**: Use Read tool to get full issue content
2. **Analyze Structure**: Identify phases, deliverables, and timeline
3. **Parse Requirements**: Extract security, performance, architecture requirements
4. **Generate Task Files**: Create atomic task breakdown following template format
5. **Create Dashboard**: Build progress tracking README with phase overview
6. **Validate Dependencies**: Ensure logical task ordering and dependencies

### Output Structure
```
docs/tasks/ISSUE-XXX-name/
├── README.md                    # Progress dashboard and overview
├── phase-1-name.md             # Granular tasks for Phase 1
├── phase-2-name.md             # Granular tasks for Phase 2
├── phase-N-name.md             # Additional phases as needed
└── metadata.json               # Task metadata and progress tracking
```

### Dashboard Format
```markdown
# ISSUE-XXX Task Progress Dashboard

## Overview
- **Issue**: [ISSUE-XXX](../issues/ISSUE-XXX-name.md)
- **Status**: In Progress / Completed
- **Total Tasks**: 45
- **Completed**: 12
- **Progress**: 27% ■■■□□□□□□□

## Phase Progress
- [x] **Phase 1**: Security Foundation (8/8 tasks) ✅
- [ ] **Phase 2**: Performance (3/12 tasks) 🔄  
- [ ] **Phase 3**: Templates (0/15 tasks) ⏳
- [ ] **Phase 4**: Integration (0/10 tasks) ⏳

## Current Focus
**Active Task**: [1.2.3 Package verification testing](phase-1-security.md#123)
**Next Up**: 1.2.4 Fallback strategy implementation
**Blocked**: None
```

## Quality Assurance

### Task Validation
- Each task must have clear deliverable and acceptance criteria
- Tasks should be completable in 1-4 hours
- Dependencies must be explicit and logical
- Tasks align with SMPA tool pattern compliance

### Progress Tracking
- Use checkbox completion for visual progress
- Update dashboard automatically when tasks complete
- Maintain task dependencies and logical ordering
- Provide clear next steps and current focus

## Security & Architecture Compliance

### SMPA Pattern Compliance
- Tasks must align with AI Tool Interaction Pattern
- No tasks should create "intelligent tools"
- All tasks follow CRUD/T/M/Comp operations
- Claude provides orchestration, tools remain dumb

### Security Requirements
- Tasks involving security must include verification steps
- Template security tasks require cryptographic validation
- Package verification tasks must include supply chain integrity
- Environment tasks require security review gates

---

**Usage**: `/fb:create-tasks <ISSUE-NUMBER> [--force] [--phases <list>]`