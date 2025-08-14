# Update Task Progress and Completion

Mark tasks as complete, update progress tracking, and maintain task dashboards.

## Directory Structure
```
docs/tasks/                     # Task files location (read/write here)
├── ISSUE-XXX-name/             # Per-issue task directories
│   ├── README.md               # Task progress dashboard (update this)
│   ├── phase-1-name.md         # Phase task files (update checkboxes here)
│   ├── phase-2-name.md         # Additional phase files
│   └── phase-N-name.md         # All phase files for completion tracking

docs/issues/                    # Issue files location (reference only)
├── ISSUE-XXX-title.md          # Parent issue files
└── README.md                   # Issue tracking (may update status here)
```

## Usage
`/fb:update-tasks <issue-number> <action> [task-id] [notes]`

**Examples:**
- `/fb:update-tasks ISSUE-027 complete 1.1.1` - Mark task 1.1.1 as complete
- `/fb:update-tasks ISSUE-027 start 2.1.1` - Mark task as started/in-progress
- `/fb:update-tasks ISSUE-027 block 1.3.2 waiting for security review` - Block task with reason
- `/fb:update-tasks ISSUE-027 dashboard` - Regenerate progress dashboard
- `/fb:update-tasks ISSUE-027 complete 1.1.2 implemented template signer` - Complete with notes

---

## Command Implementation

Parse the command arguments:
- **Argument 1** (required): Issue number (ISSUE-027, ISSUE-015, etc.)
- **Argument 2** (required): Action (complete, start, block, dashboard, progress)
- **Argument 3** (conditional): Task ID for complete/start/block actions (1.1.1, 2.3.4, etc.)
- **Argument 4+** (optional): Notes or reason text (remaining arguments joined as text)

### Argument Parsing Logic
1. **Extract Issue Number**: First argument must match ISSUE-XXX pattern
2. **Extract Action**: Second argument determines operation type
3. **Extract Task ID**: Third argument for actions requiring specific task
4. **Extract Notes/Reason**: Remaining arguments joined as notes or block reason
5. **Validate Inputs**: Ensure issue exists and task ID is valid format

## Actions

### Mark Task Complete
`/fb:update-tasks ISSUE-027 --complete 1.1.1 [--notes "implementation details"] [--verify]`

**Operation**:
1. **Find Task**: Locate task 1.1.1 in appropriate phase file
2. **Update Checkbox**: Change `- [ ]` to `- [x]` for completed task
3. **Add Completion Notes**: Append implementation details or verification results
4. **Update Dashboard**: Regenerate progress statistics in README.md
5. **Check Dependencies**: Update dependent tasks that can now proceed
6. **Verify Acceptance**: If --verify, check against task acceptance criteria

### Mark Task Started
`/fb:update-tasks ISSUE-027 --start 2.1.1`

**Operation**:
1. **Validate Dependencies**: Ensure prerequisite tasks are complete
2. **Mark In Progress**: Update task status to indicate active work
3. **Update Dashboard**: Show current active task in progress section
4. **Log Start Time**: Track when task work began for estimation

### Block Task
`/fb:update-tasks ISSUE-027 --block 1.3.2 --reason "waiting for security review"`

**Operation**:
1. **Mark Blocked**: Update task status to blocked with reason
2. **Update Dashboard**: Show blocked tasks in separate section
3. **Check Impact**: Identify dependent tasks that are also blocked
4. **Add Resolution Path**: Suggest steps to unblock if possible

### Update Category Progress
`/fb:update-tasks ISSUE-027 --progress 1.2`

**Operation**:
1. **Calculate Progress**: Count completed vs total tasks in category 1.2
2. **Update Dashboard**: Refresh progress bars and statistics
3. **Update Phase Status**: Mark phase as complete if all categories done
4. **Next Task Suggestions**: Identify next logical tasks to work on

### Regenerate Dashboard
`/fb:update-tasks ISSUE-027 --dashboard`

**Operation**:
1. **Scan All Tasks**: Read all phase files and count completion status
2. **Calculate Statistics**: Overall progress, phase completion, active tasks
3. **Update README**: Regenerate complete dashboard with current status
4. **Identify Blockers**: Highlight any blocked tasks or missing dependencies

## Implementation Instructions

### For Claude AI:
1. **Parse Arguments**: Extract issue number, action, and task ID
2. **Locate Task Files**: Find task directory `docs/tasks/ISSUE-XXX/`
3. **Load Task Content**: Read relevant phase file containing the task
4. **Perform Action**: Execute the specified action (complete, start, block, etc.)
5. **Update Files**: Modify task files and dashboard as needed
6. **Verify Changes**: Ensure updates are consistent and accurate

### Task File Updates

**Completion Example**:
```markdown
## 1.1 Template Cryptographic Signing
- [x] 1.1.1 Research Ed25519 signing libraries ✅ (Completed: 2025-08-14)
  - **Notes**: Selected @noble/ed25519 library for cryptographic operations
  - **Deliverable**: Library selection document with security analysis
- [x] 1.1.2 Implement template signing utility ✅ (Completed: 2025-08-14)
  - **Notes**: Created plugins/railway/tools/template-signer.ts with signing/verification
  - **Deliverable**: Working template signing utility with tests
- [ ] 1.1.3 Add signature verification to scaffold-discovery.ts
- [ ] 1.1.4 Create template integrity validation tests
```

### Dashboard Updates

**Progress Calculation**:
```markdown
## Phase Progress
- [x] **Phase 1**: Security Foundation (8/8 tasks) ✅ Completed 2025-08-14
- [ ] **Phase 2**: Performance (3/12 tasks) 🔄 In Progress
  - **Active**: 2.1.2 Railway GraphQL client implementation
  - **Next**: 2.1.3 Authentication handling
- [ ] **Phase 3**: Templates (0/15 tasks) ⏳ Waiting for Phase 2
- [ ] **Phase 4**: Integration (0/10 tasks) ⏳ Waiting for Phase 3

## Recent Completions
- ✅ 1.1.4 Template integrity validation tests (2025-08-14)
- ✅ 1.2.3 Supply chain security verification (2025-08-14)
- ✅ 1.2.4 Package verification testing (2025-08-14)
```

## Error Handling

### Invalid Task ID
```markdown
❌ Task ID "ISSUE-027.1.1.9" not found

Available tasks in Phase 1, Category 1:
- ISSUE-027.1.1.1 (✅ Complete)
- ISSUE-027.1.1.2 (✅ Complete)  
- ISSUE-027.1.1.3 (🔄 In Progress)
- ISSUE-027.1.1.4 (⏳ Waiting)
```

### Missing Dependencies
```markdown
❌ Cannot start task ISSUE-027.2.1.1 - missing dependencies:

Required prerequisite tasks:
- ISSUE-027.1.2.4 Supply chain verification ⏳ (Not Complete)

Complete prerequisite tasks first, then try again.
```

### Task Already Complete
```markdown
ℹ️ Task ISSUE-027.1.1.1 is already marked complete

Completed: 2025-08-14
Notes: Selected @noble/ed25519 library for cryptographic operations

Use --force to re-work this task or work on next task:
- Next: ISSUE-027.1.1.5 Template signing integration testing
```

## Integration with Existing Workflow

### Flashback Memory Integration
- Task completion updates project memory with key learnings
- Successful patterns captured for future task generation
- Failed approaches documented to avoid repetition

### Working Plan Updates
- Major task milestones update current working plan
- Phase completions trigger working plan status updates
- Blocked tasks noted in working plan blockers section

### Issue Status Sync
- Task completion progress reflects in parent issue status
- Phase completions may trigger issue status updates
- Major milestones sync with issue acceptance criteria

## CRITICAL: Task Completion Standards

### 🚫 Completion Anti-Patterns (NEVER MARK COMPLETE)
- **Placeholder Implementation**: Don't mark tasks complete if only placeholder files created
- **Partial E2E Tests**: Don't complete testing tasks that test incomplete features
- **Speculative Code**: Don't mark complete if implementation is theoretical or untested
- **File Explosion**: Don't complete if task generated excessive unnecessary files
- **"TODO" Implementations**: Don't mark complete if deliverable contains TODO comments

### ✅ Valid Completion Criteria
- **Working Implementation**: Task deliverable is functional and tested manually
- **Clear Acceptance**: All acceptance criteria objectively met
- **Focused Scope**: Task completed exactly as specified, no scope creep
- **Quality Output**: Implementation follows project patterns and standards

---

**Usage**: `/fb:update-tasks <ISSUE-NUMBER> <ACTION> [OPTIONS]`