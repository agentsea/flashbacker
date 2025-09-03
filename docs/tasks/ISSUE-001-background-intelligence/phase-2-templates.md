# Phase 2: Template-Driven Intelligence (Week 2)

**Goal**: Create SMART prompt templates using existing template system (NO hardcoded prompts)

## 2.1 Background Context Analysis Template
**Deliverable**: Model-agnostic prompt template for AI to analyze project context intelligently
**Acceptance Criteria**: Template distributed via existing system, AI model can reason about context
**Dependencies**: Phase 1 complete
**Estimated Time**: 2 hours

- [ ] 2.1.1 Create `templates/.claude/flashback/prompts/background-context-analysis.md`
- [ ] 2.1.2 Design template for AI model to analyze session context usage and recommend actions
- [ ] 2.1.3 Include GPT-5-nano parameter defaults (textVerbosity: low, reasoning_effort: low)
- [ ] 2.1.4 Test template with real project context from existing utilities

## 2.2 Memory Management Intelligence Template
**Deliverable**: Model-agnostic template for AI to make memory-related decisions  
**Acceptance Criteria**: AI model can decide memory updates, rotation, decay actions
**Dependencies**: 1.4, 2.1 complete
**Estimated Time**: 2 hours

- [ ] 2.2.1 Create `templates/.claude/flashback/prompts/memory-management.md`
- [ ] 2.2.2 Design template for AI model to analyze memory relevance and recommend rotation
- [ ] 2.2.3 Add memory decay assessment prompt for confidence scoring
- [ ] 2.2.4 Test template with existing REMEMBER.md and TODO_CHAIN.md files

## 2.3 Session Intelligence Template
**Deliverable**: Template for AI model to analyze session importance and save decisions
**Acceptance Criteria**: AI model can intelligently decide when sessions need saving
**Dependencies**: 2.1 complete
**Estimated Time**: 2 hours

- [ ] 2.3.1 Create `templates/.claude/flashback/prompts/session-analysis.md`
- [ ] 2.3.2 Design template for AI model to assess session value and priority
- [ ] 2.3.3 Include reasoning summary capture for decision transparency
- [ ] 2.3.4 Test template with various session states and activity levels

## 2.4 Git Analysis Intelligence Template
**Deliverable**: Template for AI model to analyze git changes and update memory
**Acceptance Criteria**: AI model can assess commit significance and recommend memory updates
**Dependencies**: 2.1 complete
**Estimated Time**: 2 hours

- [ ] 2.4.1 Create `templates/.claude/flashback/prompts/git-intelligence.md`
- [ ] 2.4.2 Design template for AI model to analyze git commits and extract insights
- [ ] 2.4.3 Add project-specific context awareness for git analysis
- [ ] 2.4.4 Test template with real git histories from existing projects

## 2.5 Weekly Memory Audit Template
**Deliverable**: Template for AI model to perform weekly memory audits
**Acceptance Criteria**: AI model can audit memory files and recommend cleanup/updates
**Dependencies**: 2.2 complete
**Estimated Time**: 2 hours

- [ ] 2.5.1 Create `templates/.claude/flashback/prompts/weekly-memory-audit.md`
- [ ] 2.5.2 Design template for AI model to assess memory decay and obsolescence
- [ ] 2.5.3 Include configurable model selection (default gpt-5-nano, user can override to gpt-5-mini/gpt-5)
- [ ] 2.5.4 Test audit template with aged memory files

## 2.6 Pattern Detection Intelligence Template
**Deliverable**: Template for AI model to detect user behavior patterns
**Acceptance Criteria**: AI model can identify significant patterns from conversation logs
**Dependencies**: 2.1 complete
**Estimated Time**: 2 hours

- [ ] 2.6.1 Create `templates/.claude/flashback/prompts/pattern-intelligence.md`
- [ ] 2.6.2 Design template for AI model to analyze conversation patterns with confidence scoring
- [ ] 2.6.3 Add pattern frequency analysis and significance assessment
- [ ] 2.6.4 Test pattern template with existing conversation logs

## 2.7 Template Distribution Integration
**Deliverable**: New templates distributed via existing template system
**Acceptance Criteria**: Templates appear in user projects via existing distribution mechanism
**Dependencies**: 2.1-2.6 complete
**Estimated Time**: 1 hour

- [ ] 2.7.1 Integrate new prompt templates into existing template distribution system
- [ ] 2.7.2 Update template scanning to include new background intelligence prompts
- [ ] 2.7.3 Test distribution via existing `flashback init --refresh` command
- [ ] 2.7.4 Verify templates appear in `.claude/flashback/prompts/` in user projects

## 2.8 Template Testing and Validation
**Deliverable**: Validated templates that work reliably with existing Flashbacker patterns
**Acceptance Criteria**: All templates produce consistent AI model responses
**Dependencies**: 2.7 complete
**Estimated Time**: 2 hours

- [ ] 2.8.1 Test all templates follow existing Flashbacker prompt template patterns
- [ ] 2.8.2 Validate AI model response quality and consistency across templates
- [ ] 2.8.3 Verify GPT-5 parameter optimization works in all templates
- [ ] 2.8.4 Test templates with multiple project contexts

---

**Phase 2 Success Criteria:**
- ✅ ALL intelligence handled by AI model via prompt templates (NO embedded AI)
- ✅ Templates distributed via existing proven template system
- ✅ GPT-5 parameter controls integrated for cost optimization
- ✅ Weekly audit templates with user-controlled model selection
- ✅ Templates follow existing Flashbacker architectural patterns