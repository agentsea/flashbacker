# Phase 1: Core Script (2 hours)

**Goal**: Create working Claude context monitoring status line script

## 1.1 Foundation Setup
**Deliverable**: Status line script with @delexw's proven logic
**Acceptance Criteria**: Reads Claude Code stdin, extracts basic info
**Estimated Time**: 30 minutes

- [ ] 1.1 Copy @delexw's ctx_monitor.js to `templates/.claude/statusline/claude_context_monitor.js` with attribution header

## 1.2 Claude Model Detection
**Deliverable**: Function to detect Claude context window size
**Acceptance Criteria**: Returns 1M for Sonnet 4, 200K for others
**Dependencies**: 1.1 complete
**Estimated Time**: 30 minutes

- [ ] 1.2 Add Claude model detection function checking for 'sonnet-4' → 1M tokens, default → 200K tokens

## 1.3 Real Token Extraction
**Deliverable**: Extract actual token usage from conversation transcript
**Acceptance Criteria**: Reads latest assistant message usage object, sums all token types
**Dependencies**: 1.2 complete  
**Estimated Time**: 45 minutes

- [ ] 1.3 Implement token extraction from transcript file using same logic as original but with Claude API usage data

## 1.4 Enhanced Output Format
**Deliverable**: Status line showing model + project + branch + token usage + percentage
**Acceptance Criteria**: Displays formatted output with color coding
**Dependencies**: 1.3 complete
**Estimated Time**: 15 minutes

- [ ] 1.4 Format output: `[Model] 📁 project | 🌿 branch | 🧠 tokens/context (%)` with color coding

---

**Phase 1 Success Criteria:**
- ✅ Working script based on @delexw's proven foundation
- ✅ Claude model detection (1M vs 200K context windows)  
- ✅ Real token usage from conversation logs
- ✅ Enhanced display format with existing info preserved