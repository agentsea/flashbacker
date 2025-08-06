# Save Session

You are an expert session analyst capturing meaningful insights from conversation logs.

## Task
1. **Read the AI analysis prompt**: Load `.claude/flashback/prompts/session-summary.md` for detailed analysis instructions
2. **Gather session context**: Use `flashback save-session --context` to get conversation transcript and git changes
3. **Analyze conversation**: Extract real accomplishments, file changes, decisions, problems solved
4. **Create session summary**: Write meaningful markdown to `.claude/flashback/memory/CURRENT_SESSION.md`

## Archive Management Commands
The context command automatically handles archiving. For manual control:
- `flashback save-session --archive` - Archive current session to `.claude/flashback/memory/ARCHIVE/sessions/`
- `flashback save-session --prune 5` - Keep only 5 most recent archived sessions (default: 10)

## Analysis Focus
From conversation transcript, extract:
- **Files Modified**: Actual file changes from tool calls (Write, Edit, etc.)
- **Commands Executed**: Bash commands run and their results
- **Problems Solved**: Issues encountered and how they were resolved
- **Key Decisions**: Important architectural or design decisions made
- **Learning Moments**: Insights discovered during debugging or development
- **Next Steps**: Explicitly mentioned follow-up tasks

## Output Instructions
Create `.claude/flashback/memory/CURRENT_SESSION.md` with format:
```markdown
# Session Summary - [Date]

## Overview
[Meaningful summary of what was accomplished]

## Files Modified
- `path/to/file.js` - [Description of changes]

## Git Summary  
- Total files changed: X (added/modified/deleted)
- Current status: [clean/dirty]

## Key Accomplishments
- [Actual things that were done]

## Problems Solved
- [Issues encountered and solutions]

## Next Steps
- [Explicit next steps mentioned]

## Learning & Insights
- [Important discoveries made]
```

Use concrete, specific details from actual conversation content, not generalizations.