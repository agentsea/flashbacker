# Phase 3: Command Extensions (Week 3)

**Goal**: Extend existing commands (memory.ts, save-session.ts, etc.) with background intelligence capabilities

## 3.1 Memory Command Extension
**Deliverable**: Enhanced memory.ts with rotation and decay capabilities
**Acceptance Criteria**: `flashback memory` supports rotation, decay, audit operations
**Dependencies**: Phase 2 complete
**Estimated Time**: 3 hours

- [ ] 3.1.1 Extend existing `src/commands/memory.ts` with rotation functionality
- [ ] 3.1.2 Add `--rotate` flag to manually trigger memory file rotation
- [ ] 3.1.3 Add `--decay-audit` flag to trigger memory decay assessment
- [ ] 3.1.4 Add `--audit-model [gpt-5-nano|gpt-5-mini|gpt-5]` for user model selection
- [ ] 3.1.5 Test enhanced memory command with existing memory files

## 3.2 Save Session Command Extension
**Deliverable**: Enhanced save-session.ts with background intelligence integration
**Acceptance Criteria**: Save-session can trigger background analysis and use insights
**Dependencies**: Phase 2 complete
**Estimated Time**: 2 hours

- [ ] 3.2.1 Extend existing `src/commands/save-session.ts` with background integration
- [ ] 3.2.2 Add background intelligence summary reading from memory files
- [ ] 3.2.3 Integrate background insights into session summaries
- [ ] 3.2.4 Test enhanced save-session with background intelligence data

## 3.3 Session Start Command Extension
**Deliverable**: Enhanced session-start.ts with background intelligence summaries
**Acceptance Criteria**: Session restoration includes background insights when available
**Dependencies**: Phase 2 complete
**Estimated Time**: 2 hours

- [ ] 3.3.1 Extend existing `src/commands/session-start.ts` with background summaries
- [ ] 3.3.2 Add background intelligence report reading from rotated memory files
- [ ] 3.3.3 Integrate weekly audit summaries into session restoration
- [ ] 3.3.4 Test enhanced session-start with various background intelligence states

## 3.4 Background Intelligence CRUD Tools
**Deliverable**: Simple CRUD tools AI model can call (extending existing commands)
**Acceptance Criteria**: AI model can call tools to execute memory, session, file operations
**Dependencies**: 3.1-3.3 complete
**Estimated Time**: 3 hours

- [ ] 3.4.1 Create tool interface extending existing memory command functionality
- [ ] 3.4.2 Add DUMB file operation tools (read-memory-file, write-memory-file, append-memory)
- [ ] 3.4.3 Create DUMB git tools (git-status, git-log, get-recent-commits)
- [ ] 3.4.4 Test CRUD tools execute AI model decisions without embedded intelligence

## 3.5 Config Management Extension
**Deliverable**: Enhanced config commands for background intelligence settings
**Acceptance Criteria**: Users can configure model selection, rotation, decay via CLI
**Dependencies**: 1.3 complete
**Estimated Time**: 2 hours

- [ ] 3.5.1 Extend existing config management with background intelligence settings
- [ ] 3.5.2 Add `flashback config --set-model <task> <model>` for user model overrides
- [ ] 3.5.3 Add `flashback config --set-audit-schedule <weekly|daily|monthly>`
- [ ] 3.5.4 Test config management with various user preferences

## 3.6 Daemon CLI Integration
**Deliverable**: Daemon management integrated into existing CLI structure
**Acceptance Criteria**: Daemon commands follow existing CLI patterns in src/cli.ts
**Dependencies**: 1.7 complete
**Estimated Time**: 2 hours

- [ ] 3.6.1 Complete `src/commands/daemon.ts` following existing command patterns
- [ ] 3.6.2 Add daemon status reporting with per-project breakdown
- [ ] 3.6.3 Integrate daemon commands into existing `src/cli.ts` structure
- [ ] 3.6.4 Test daemon CLI works with existing command architecture

## 3.7 Template-Prompt Integration
**Deliverable**: Daemon can call AI model with prompt templates when activity detected
**Acceptance Criteria**: DUMB daemon calls SMART AI model via templates when needed
**Dependencies**: 2.7, 3.6 complete
**Estimated Time**: 2 hours

- [ ] 3.7.1 Create template-prompt calling interface in daemon
- [ ] 3.7.2 Add activity-triggered AI model calling with project context
- [ ] 3.7.3 Implement template selection based on detected activity type
- [ ] 3.7.4 Test DUMB→SMART workflow: daemon detects → calls AI model → AI model uses tools

## 3.8 Extension Testing
**Deliverable**: All extended commands work with existing Flashbacker functionality
**Acceptance Criteria**: No conflicts with existing commands, proper integration
**Dependencies**: 3.1-3.7 complete
**Estimated Time**: 2 hours

- [ ] 3.8.1 Test enhanced commands don't conflict with existing functionality
- [ ] 3.8.2 Verify background intelligence enhances existing workflows
- [ ] 3.8.3 Test graceful degradation when daemon not running
- [ ] 3.8.4 Confirm all extensions follow existing Flashbacker patterns

---

**Phase 3 Success Criteria:**
- ✅ ALL commands extended, not replaced (memory.ts, save-session.ts, session-start.ts)
- ✅ CRUD tools enable AI model to execute decisions via existing command patterns
- ✅ Config system supports user model selection and parameter controls
- ✅ Template-prompt integration follows DUMB→SMART→DUMB pattern
- ✅ No conflicts with existing Flashbacker functionality