# Create Issue from Working Plan

Generate comprehensive issue documentation from working plan insights and session analysis following SoftMachine issue methodology.

## Directory Structure
```
docs/issues/                     # Issue files location (write to here)
├── ISSUE-XXX-title.md           # Individual issue files to create
└── README.md                    # Issue tracking reference

.claude/flashback/memory/        # Source files (read from here)
├── WORKING_PLAN.md              # Current development priorities and context
├── REMEMBER.md                  # Project knowledge and patterns
└── CURRENT_SESSION.md           # Session summaries (if exists)
```

## Usage
`/fb:create-issue <title> [priority] [effort]`

**Examples:**
- `/fb:create-issue auto-context-management` - Generate issue for current working plan focus
- `/fb:create-issue security-hardening high 4-weeks` - Create high priority security issue  
- `/fb:create-issue performance-optimization critical 2-weeks` - Critical performance issue

---

## Command Implementation

Parse the command arguments:
- **Argument 1** (required): Issue title (kebab-case, becomes filename)
- **Argument 2** (optional): Priority level (critical, high, medium, low)
- **Argument 3** (optional): Estimated effort (1-week, 2-weeks, 1-month, etc.)

### Argument Parsing Logic
1. **Extract Title**: First argument becomes issue filename and header title
2. **Parse Priority**: Second argument sets priority level (default: high)
3. **Parse Effort**: Third argument sets estimated effort (default: based on complexity)
4. **Generate Issue Number**: Auto-increment from existing issues in docs/issues/

## How It Works

### Step 1: Context Analysis
1. **Read Working Plan**: Analyze current priorities and session context
2. **Read Project Memory**: Extract relevant background from REMEMBER.md
3. **Parse Session Insights**: Include recent session accomplishments if available
4. **Identify Scope**: Determine if issue is feature, bug fix, architecture, or strategic

### Step 2: Issue Generation
1. **Create Issue File**: `docs/issues/ISSUE-XXX-title.md` with auto-incremented number
2. **Generate Header**: Status, priority, assignee, effort estimates
3. **Problem Statement**: Clear articulation of challenge or opportunity
4. **Strategic Solution**: Architecture approach and implementation strategy
5. **Requirements Sections**: Security, performance, architecture requirements
6. **Implementation Phases**: Multi-phase breakdown with deliverables

### Step 3: Issue Formatting
Follow SoftMachine issue structure:
```markdown
# ISSUE-XXX: Issue Title

**Status**: 🚨 CRITICAL / 🔄 NEW / ⏳ PLANNING  
**Priority**: CRITICAL / HIGH / MEDIUM / LOW  
**Assignee**: Architecture Team / Development Team  
**Estimated Effort**: X weeks  
**Dependencies**: Previous issues or external dependencies

## Problem Statement

**Challenge**: Clear description of the problem or opportunity
**Context**: Background information and current situation
**Impact**: Why this matters and consequences of not addressing

## Strategic Solution

**Approach**: High-level solution strategy
**Architecture**: Technical approach and patterns
**Benefits**: Expected outcomes and value delivery

## Architecture Requirements

### Mandatory Requirements (MANDATORY - Agent Review)
- **Requirement 1**: Specific technical requirement with acceptance criteria
- **Requirement 2**: Another requirement with measurable outcomes

### Performance Requirements (MANDATORY - Agent Review)  
- **Performance Target 1**: Specific performance criteria
- **Performance Target 2**: Another measurable performance goal

### Recommended Requirements (RECOMMENDED - Agent Review)
- **Nice to Have 1**: Optional but valuable features
- **Future Considerations**: Extensibility and scalability thoughts

## Implementation Phases

### Phase 1: Foundation (Timeline)
**Deliverables**: What will be built in this phase
**Acceptance Criteria**: How to verify phase completion
**Dependencies**: What must be complete before starting

### Phase 2: Core Implementation (Timeline)
**Deliverables**: Next set of implementation work
**Acceptance Criteria**: Measurable completion criteria
**Dependencies**: Previous phase completions

## Success Metrics
- **Primary Goal 1**: Key success measurement
- **Primary Goal 2**: Another critical outcome
- **Quality Gates**: Non-negotiable quality criteria

## Technical Architecture
Brief technical overview of implementation approach

## Dependencies and Risks
- **Technical Dependencies**: External requirements
- **Implementation Risks**: Potential challenges
- **Mitigation Strategies**: How to address risks
```

## CRITICAL: Issue Quality Standards

### Issue Requirements
- **Single Focus**: Each issue addresses one specific challenge or opportunity
- **Clear Problem Statement**: Obvious articulation of what needs to be solved
- **Strategic Solution**: High-level approach with architectural considerations
- **Phased Implementation**: Multi-phase breakdown for complex issues
- **Measurable Success**: Clear acceptance criteria and success metrics

### 🚫 Issue Generation Anti-Patterns (NEVER CREATE THESE)
- **No Vague Issues**: Avoid "improve system" or "fix bugs" without specifics
- **No Duplicate Issues**: Check existing issues before creating new ones
- **No Micro-Issues**: Don't create issues for single file changes
- **No Research-Only Issues**: Issues must have clear deliverable outcomes
- **No Placeholder Issues**: Every issue must have actionable implementation plan

### Issue Template Requirements
```markdown
## MANDATORY Sections:
- Problem Statement with clear challenge articulation
- Strategic Solution with architectural approach  
- Architecture Requirements (Mandatory/Performance/Recommended)
- Implementation Phases with deliverables and acceptance criteria
- Success Metrics with measurable outcomes

## OPTIONAL Sections (include if relevant):
- Technical Architecture overview
- Dependencies and Risks analysis
- Market Impact or strategic considerations
```

## Implementation Instructions

### For Claude AI:
1. **Analyze Context**: Read working plan, project memory, and session context
2. **Generate Issue Number**: Auto-increment from existing issues (ISSUE-001, ISSUE-002, etc.)
3. **Create Problem Statement**: Clear articulation based on current priorities
4. **Design Solution**: Strategic approach leveraging project patterns and architecture
5. **Define Requirements**: Security, performance, and architecture requirements
6. **Plan Phases**: Multi-phase implementation with clear deliverables
7. **Set Success Metrics**: Measurable outcomes and quality gates

### Issue Status Guidelines
- **🚨 CRITICAL**: Blocking progress, security issues, major bugs
- **🔄 NEW**: Newly created issues ready for planning
- **⏳ PLANNING**: Issues being analyzed and designed
- **🔄 IN PROGRESS**: Active development work
- **✅ COMPLETED**: Finished and verified

### Priority Guidelines
- **CRITICAL**: Must be addressed immediately (security, blocking bugs)
- **HIGH**: Important for current milestone or user experience
- **MEDIUM**: Valuable improvements that can be scheduled
- **LOW**: Nice-to-have features or optimizations

## Quality Assurance

### Issue Validation
- Each issue must solve a specific, identifiable problem
- Solutions must be technically feasible with clear implementation path
- Requirements must be measurable and verifiable
- Phases must have logical dependencies and clear deliverables

### Documentation Standards
- Use clear, professional language appropriate for technical teams
- Include specific technical details when relevant
- Reference existing project patterns and architecture
- Provide implementation guidance without being prescriptive

## Integration with Task System

### Task Generation
- Issues can be broken down into granular tasks using `/fb:create-tasks ISSUE-XXX`
- Tasks follow ai-dev-tasks methodology with atomic, completable work items
- Task breakdown should align with issue phases and deliverables

### Progress Tracking
- Issues provide high-level strategic view
- Tasks provide granular implementation tracking
- Working plan captures current focus and priorities
- Session continuity maintained through memory system

---

**Usage**: `/fb:create-issue <title> [priority] [effort]`
**Next Step**: Use `/fb:create-tasks ISSUE-XXX` to generate implementation tasks