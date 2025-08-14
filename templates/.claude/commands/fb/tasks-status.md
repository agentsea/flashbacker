# Task Status Dashboard

Display comprehensive progress dashboard across all active issues with granular task tracking.

## Directory Structure
```
docs/tasks/                     # Task files location (read from here)
├── ISSUE-XXX-name/             # Per-issue task directories
│   ├── README.md               # Task progress dashboards (read these)
│   ├── phase-1-name.md         # Phase task files (scan for completion)
│   ├── phase-2-name.md         # Additional phase files
│   └── phase-N-name.md         # All phase files for status analysis

docs/issues/                    # Issue files location (reference for context)
├── ISSUE-XXX-title.md          # Issue titles and descriptions
└── README.md                   # Issue priority and status reference
```

## Usage
`/fb:tasks-status [issue-number] [view-type]`

**Examples:**
- `/fb:tasks-status` - Show overview of all active issues with tasks
- `/fb:tasks-status ISSUE-027` - Detailed view of specific issue's task progress
- `/fb:tasks-status blocked` - Show only blocked tasks across all issues
- `/fb:tasks-status ISSUE-027 detailed` - Full task breakdown with acceptance criteria
- `/fb:tasks-status summary` - High-level summary for quick status check

---

## Command Implementation

Parse the command arguments:
- **Argument 1** (optional): Issue number (ISSUE-027, ISSUE-015) or view type (blocked, summary, detailed)
- **Argument 2** (optional): View type if first argument was issue number

### Argument Parsing Logic
1. **Check First Argument**: If matches ISSUE-XXX pattern, it's an issue number
2. **Determine View Type**: Look for "detailed", "blocked", "summary" in arguments
3. **Set Scope**: Issue-specific view or all-issues view based on presence of issue number
4. **Default Behavior**: If no arguments, show overview of all active issues

## Dashboard Views

### Default Overview (All Issues)
```markdown
# SoftMachine Task Progress Overview

## Active Issues with Tasks
┌─────────────┬──────────────────────────────────┬──────────┬──────────┐
│ Issue       │ Title                            │ Progress │ Status   │
├─────────────┼──────────────────────────────────┼──────────┼──────────┤
│ ISSUE-027   │ Railway-Native Scaffolding       │ 15/52    │ 🔄 Phase 2│
│ ISSUE-015   │ Security Vulnerabilities         │ 3/4      │ 🔄 Phase 1│
│ ISSUE-019   │ SMPA Architectural Compliance    │ 0/8      │ ⏳ Waiting│
└─────────────┴──────────────────────────────────┴──────────┴──────────┘

## Current Focus
**Primary**: ISSUE-027.2.1.2 Railway GraphQL client authentication
**Secondary**: ISSUE-015.1.3 Input validation security patterns

## Recent Completions (Last 7 Days)
- ✅ ISSUE-027.1.1.4 Template integrity validation (2025-08-14)
- ✅ ISSUE-027.1.2.3 Package verification system (2025-08-14)
- ✅ ISSUE-015.1.1 Shell injection fix validation (2025-08-13)

## Blocked Tasks (Requiring Attention)
- 🚫 ISSUE-027.3.1.1 Template repository design (waiting for Phase 2 completion)
- 🚫 ISSUE-019.1.1 SMPA compliance audit (waiting for ISSUE-015 completion)
```

### Detailed Issue View
`/fb:tasks-status ISSUE-027 --detailed`

```markdown
# ISSUE-027: Railway-Native Scaffolding Progress

## Overview
- **Status**: Phase 2 - Performance Optimization & Railway API Migration
- **Progress**: 15/52 tasks (29%) ■■■□□□□□□□
- **Timeline**: Week 3 of 14 (on track)
- **Next Milestone**: Phase 2 completion (Performance foundation)

## Phase Breakdown
### Phase 1: Security Foundation ✅ COMPLETE (8/8 tasks)
- [x] 1.1 Template Cryptographic Signing (4/4 tasks) ✅
- [x] 1.2 Context7 Package Verification (4/4 tasks) ✅

### Phase 2: Performance & API Migration 🔄 IN PROGRESS (7/12 tasks)
- [x] 2.1 Railway GraphQL Client (3/4 tasks) 🔄
  - [x] 2.1.1 GraphQL client research and library selection ✅
  - [x] 2.1.2 Basic client implementation with authentication ✅
  - [x] 2.1.3 Connection pooling and error recovery ✅
  - [ ] 2.1.4 Batch mutation support for parallel operations
- [ ] 2.2 Context7 Caching (0/4 tasks) ⏳
- [ ] 2.3 Template Pre-loading (0/4 tasks) ⏳

### Phase 3: Template System ⏳ WAITING (0/15 tasks)
### Phase 4: Integration ⏳ WAITING (0/10 tasks)

## Current Active Tasks
**Working On**: 2.1.4 Batch mutation support
**Next Up**: 2.2.1 Context7 cache architecture design
**Dependencies Met**: All Phase 1 prerequisites complete

## Recent Activity
- ✅ 2.1.3 Connection pooling implemented (30 min ago)
- ✅ 2.1.2 Authentication handling complete (2 hours ago)
- 🔄 2.1.4 Batch mutations in progress (started 1 hour ago)
```

### Blocked Tasks View
`/fb:tasks-status --blocked`

```markdown
# Blocked Tasks Requiring Attention

## ISSUE-027: Railway-Native Scaffolding
- 🚫 **3.1.1** Template repository architecture design
  - **Blocked By**: Phase 2 completion (2.3.4 Template pre-loading)
  - **Impact**: Blocks all Phase 3 work (15 tasks)
  - **Estimated Unblock**: 1-2 weeks

## ISSUE-019: SMPA Compliance  
- 🚫 **1.1** Architectural compliance audit
  - **Blocked By**: ISSUE-015 security vulnerabilities completion
  - **Impact**: Blocks compliance validation work
  - **Estimated Unblock**: 1-2 days

## Resolution Actions
1. **Priority**: Complete ISSUE-027 Phase 2 tasks (7 remaining)
2. **Secondary**: Finish ISSUE-015.1.4 security testing
3. **Impact**: Unblocking will enable 23 additional tasks
```

## Implementation Instructions

### For Claude AI:
1. **Parse Arguments**: Extract issue number and requested view type
2. **Scan Task Directory**: Read all task files in `docs/tasks/ISSUE-XXX/`
3. **Calculate Progress**: Count completed (✅) vs total tasks per phase/category
4. **Identify Status**: Determine current phase, active tasks, blocked tasks
5. **Generate Dashboard**: Create appropriate view based on arguments
6. **Update Timestamps**: Include recent activity and completion timing

### Progress Calculation Logic
```typescript
interface TaskProgress {
  completed: number;
  total: number;
  percentage: number;
  phase: string;
  category?: string;
  blocked: string[];
  active: string[];
}

// Calculate from checkbox states in task files
const progress = calculateProgress(taskFiles);
```

### Dashboard Generation
```markdown
## Progress Bar Generation
15/52 tasks = 29%
Progress Bar: ■■■□□□□□□□ (3 filled, 7 empty for 10-segment bar)

## Status Icons
✅ Complete
🔄 In Progress  
⏳ Waiting/Not Started
🚫 Blocked
```

## File Update Operations

### Task Completion Update
**Before**:
```markdown
- [ ] 1.1.1 Research Ed25519 signing libraries for Node.js
```

**After**:
```markdown
- [x] 1.1.1 Research Ed25519 signing libraries for Node.js ✅ (Completed: 2025-08-14)
  - **Notes**: Selected @noble/ed25519 library for performance and security
  - **Deliverable**: Library selection document with security analysis
```

### Dashboard Progress Update
**Calculate and Update**:
```markdown
## Phase Progress
- [x] **Phase 1**: Security Foundation (8/8 tasks) ✅ Completed 2025-08-14
- [ ] **Phase 2**: Performance (7/12 tasks) 🔄 58% complete
  - **Active**: 2.1.4 Batch mutation support
  - **Next**: 2.2.1 Context7 cache architecture
  - **ETA**: 3-4 days remaining
```

## Quality Assurance

### Task Validation
- Verify task exists before marking complete
- Validate dependencies are satisfied before starting tasks
- Ensure acceptance criteria are met for completion
- Check that blocked tasks have valid reasons

### Progress Accuracy
- Recalculate all statistics when updating
- Validate phase completion when all category tasks done
- Update timeline estimates based on actual completion rates
- Maintain accuracy of dependency relationships

## Integration Features

### Automatic Notifications
- Notify when phases complete (trigger celebration/milestone recognition)
- Alert when tasks become unblocked (ready to proceed)
- Warn when blocked tasks are creating bottlenecks

### Working Plan Sync
- Major milestones update `.claude/flashback/memory/WORKING_PLAN.md`
- Phase completions trigger working plan status updates
- Task progress influences immediate priority updates

### Memory Updates
- Significant task completions add learnings to project memory
- Failed task approaches documented to avoid repetition
- Successful patterns captured for future reference

## CRITICAL: Status Reporting Standards

### 🚫 False Progress Indicators (NEVER REPORT AS COMPLETE)
- **Placeholder Files**: Tasks marked complete that only created empty/TODO files
- **Speculative Implementation**: Code that appears to work but hasn't been tested
- **Partial E2E Tests**: Testing tasks marked complete for incomplete features
- **File Explosion**: Tasks that generated excessive files beyond deliverable scope

### ✅ Accurate Progress Criteria
- **Functional Deliverables**: Only count tasks with working, tested implementations
- **Clear Acceptance**: Task completion verified against acceptance criteria
- **Quality Standards**: Implementation follows project patterns and standards
- **Focused Scope**: Task completed exactly as specified without scope creep

---

**Usage**: `/fb:tasks-status [ISSUE-NUMBER] [VIEW-TYPE] [OPTIONS]`