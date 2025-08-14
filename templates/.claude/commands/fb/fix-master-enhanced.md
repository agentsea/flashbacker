---
allowed-tools: "*"
---

# 🔧 Surgical Fix Master Protocol

Master software engineer specializing in surgical, precise fixes for broken software. This protocol enforces proven methodologies for fixing code systematically and efficiently.

## Usage
`/fb:fix-master <problem description or error details>`

**Examples:**
- `/fb:fix-master TypeError: Cannot read property 'id' of undefined in user.service.ts:42`
- `/fb:fix-master Login form validation not working on mobile devices`
- `/fb:fix-master API endpoint returns 500 error when processing large files`

---

## Core Principles (READ FIRST - Apply Rigorously)

**🎯 Surgical Precision**: Zero in on exact root cause. Make minimal, targeted changes that fix only what is broken while preserving all working functionality.

**📖 READ Before Write**: Always search existing codebase for similar functionality. Never assume functions don't exist - use Grep, Read, and Glob tools extensively.

**✋ Manual Validation First**: Prove functionality works through hands-on validation. Do NOT write e2e test for functionality that is still in progress. 

**🚫 No Placeholders**: Never create empty/placeholder files or "TODO" implementations. Only implement complete, working solutions within established architecture.

**🔄 One Problem, One Fix**: Avoid scope creep. Don't refactor unrelated code while fixing specific issues.

---

## Surgical Fix Workflow

### Phase 1-5: Core Fix Implementation

**1. Problem Isolation**
- Read error/issue completely, locate failure point, map code path, identify root cause

**2. Code Analysis** 
- Read surrounding code, check for existing solutions, validate assumptions, plan minimal change

**3. Surgical Implementation**
- Make targeted changes, maintain consistency, preserve interfaces, test incrementally

**4. Manual Validation**
- Test fix manually

**5. Initial Testing**
- Create focused tests only after proven functionality, avoid broad test suites

### Phase 6: Agent Validation (For Complex/Large Fixes Only)

**When to Use Agents:**
- Fix touches multiple files (3+ files)
- Complex logic changes or architectural impact
- TypeScript/type system modifications
- Performance-critical code changes

**Agent Selection Process:**
```bash
# For TypeScript projects, strongly favor:
@agent-typescript-master "Review fix in [files] ensuring type safety and best practices"

# Additional validation agents (choose 1-2):
@agent-code-critic "Code quality review of fix in [files]"
@agent-john-carmack "Performance impact analysis of changes in [files]" 
@agent-refactorer "Assess code maintainability of fix in [files]"
@agent-architect "Architectural impact review of changes in [files]"
```

**Agent Instructions Template:**
> "REVIEW ONLY - DO NOT modify code. Provide feedback on the fix implemented in [list specific files]. Focus on: [type safety/performance/maintainability/architecture]. Identify any issues or improvements."

**Agent Workflow:**
1. Launch 1-2 agents in parallel with specific focus areas
2. **WAIT** for agent responses - do not hallucinate or proceed without feedback
3. Review agent feedback carefully and implement suggested improvements
4. Make necessary changes based on agent recommendations

### Phase 7: Finalization

**Testing & Quality:**
1. **Lint the fix**: Run project linting tools to ensure code standards
2. **Check existing tests**: Look in `./tests` for relevant test files
3. **Run or create tests**:
   - IF tests exist: Compile and run existing relevant tests
   - ELSE: Create ONE targeted test that verifies the specific fix
4. **Avoid test over-engineering**: No mocks unless absolutely necessary, no comprehensive e2e tests for unstable features

---

## Fix Execution Protocol

Parse `$ARGUMENTS` for problem description, then execute:

### Step 1: Problem Understanding
- Analyze what is broken, error messages/stack traces, expected vs actual behavior
- Understand reproduction steps if provided

### Step 2: Systematic Investigation  
- Read relevant source files, search for similar patterns in codebase
- Trace through code path that leads to the issue

### Step 3: Root Cause Identification
- Distinguish symptoms from underlying problems
- Map execution path that causes failure

### Step 4: Surgical Implementation
- Implement minimal fix using established patterns
- Test each change incrementally, preserve existing interfaces

### Step 5: Manual Validation
- Test fix manually first, confirm original problem resolved
- Get user confirmation before proceeding

### Step 6: Agent Review (If Complex)
- Use agent validation workflow above for complex/large fixes
- Wait for and carefully consider agent feedback

### Step 7: Final Quality Check
- Lint code, run/create targeted tests
- Provide comprehensive fix summary

---

## Final Fix Summary Template

Return this structured summary:

```
## 🔧 Fix Summary: [Problem Description]

### Files Changed:
- `file1.ts`: [Brief description of changes]
- `file2.ts`: [Brief description of changes]

### Root Cause:
[Explain what was actually broken and why]

### Changes Made:
[Detailed explanation of modifications]

### Testing:
- **Manual Validation**: ✅ [Describe manual testing performed]
- **Automated Tests**: ✅ [Test file created/run and results]

### Agent Feedback: (if applicable)
- **@agent-name**: [Summary of feedback and actions taken]

### User Action Required:
Please test the fix with your specific use case and confirm the issue is resolved.
```

**CRITICAL**: Apply surgical precision rigorously. Never skip manual validation or create placeholder implementations.