# ISSUE-003: Claude Context Window Status Line

**Status**: 🔄 NEW  
**Priority**: MEDIUM  
**Assignee**: Development Team  
**Estimated Effort**: 4 hours  
**Dependencies**: @delexw's ctx_monitor.js as foundation

## Problem Statement

**Challenge**: Current status line shows project and branch but lacks context window monitoring for Claude models with different limits (1M vs 200K tokens).

**Context**: Status line updates when conversation messages change (max 300ms frequency). Need to show real-time token usage with proper Claude model detection.

**Impact**: No visibility into context window pressure, can't see when approaching Claude's limits.

## Strategic Solution

**Approach**: Enhance existing status line with Claude context window monitoring using actual token data from conversation logs.

**Architecture**: Fire-and-forget script that reads token usage from transcript, detects Claude model context window, calculates percentage.

**Benefits**: Real-time context awareness, proper 1M vs 200K model handling, preserves existing display.

## Files to Create

### Single Status Line Script
**File**: `templates/.claude/statusline/claude_context_monitor.js`
**Based on**: [@delexw's proven ctx_monitor.js](https://github.com/delexw/claude-code-misc/blob/main/.claude/statusline/ctx_monitor.js)

**Implementation**:
1. **Read Claude Code stdin** - get transcript path, model info, workspace
2. **Extract latest usage** - find most recent assistant message with token data
3. **Detect Claude model** - `claude-sonnet-4-*` = 1M, others = 200K
4. **Calculate percentage** - actual tokens / context window
5. **Format output** - preserve project/branch, add model + token info

### Target Output Format
```
[Claude Sonnet 4] 📁 flashbacker-public | 🌿 feature/background-intelligence | 🧠 25.6K/1M (2.6%)
```

## Implementation Plan

### Phase 1: Core Script (2 hours)
**Deliverable**: Working status line script with token monitoring
**Acceptance Criteria**: Shows model, project, branch, real token usage, percentage

- **Step 1**: Copy @delexw's ctx_monitor.js as foundation
- **Step 2**: Add Claude model detection function (sonnet-4 = 1M, others = 200K)  
- **Step 3**: Extract real token usage from conversation transcript
- **Step 4**: Calculate percentage with color coding
- **Step 5**: Format output preserving existing project/branch display

### Phase 2: Integration (2 hours)
**Deliverable**: Distributed via Flashbacker template system
**Acceptance Criteria**: Available in user projects, works with multiple Claude models

- **Step 1**: Add to `templates/.claude/statusline/` directory
- **Step 2**: Include in template distribution system
- **Step 3**: Test with different Claude models (1M vs 200K)
- **Step 4**: Validate color coding and percentage accuracy

## Success Metrics

- **Real token usage** from Claude API data (not estimates)
- **Dynamic model detection** handles 1M and 200K context windows
- **Preserves existing display** (project name, git branch)
- **Color-coded warnings** for context window pressure

## Technical Details

### Token Extraction (Real Data)
```javascript
// Extract from conversation transcript usage objects
function extractClaudeTokens(usage) {
  return (usage?.input_tokens ?? 0) + 
         (usage?.output_tokens ?? 0) + 
         (usage?.cache_read_input_tokens ?? 0) + 
         (usage?.cache_creation_input_tokens ?? 0);
}
```

### Claude Model Detection
```javascript
function getClaudeContextWindow(model) {
  if (model.includes('sonnet-4') || model.includes('claude-4')) return 1_000_000;
  return 200_000; // All other Claude models
}
```

---

**Credit**: Foundation based on excellent work by [@delexw](https://github.com/delexw/claude-code-misc/blob/main/.claude/statusline/ctx_monitor.js)