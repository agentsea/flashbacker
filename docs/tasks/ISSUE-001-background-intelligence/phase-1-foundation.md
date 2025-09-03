# Phase 1: Foundation Integration (Week 1)

**Goal**: Build DUMB daemon using ALL existing utilities with NO duplication

## 1.1 PM2 Daemon Setup (DUMB Operations Only)
**Deliverable**: Basic DUMB daemon that only monitors and detects (no embedded AI)
**Acceptance Criteria**: PM2 process runs, uses existing utilities for scanning
**Estimated Time**: 2 hours

- [ ] 1.1.1 Install PM2 globally: `npm install -g pm2`
- [ ] 1.1.2 Create basic `ecosystem.config.js` for DUMB daemon process
- [ ] 1.1.3 Create `src/daemon/index.ts` as simple monitoring loop (NO embedded intelligence)
- [ ] 1.1.4 Test PM2 start/stop/restart basic functionality

## 1.2 Existing Utility Integration (NO Duplication)
**Deliverable**: Daemon uses ALL existing utilities from conversation-logs.ts and config.ts
**Acceptance Criteria**: Zero code duplication, leverages proven existing functions
**Dependencies**: 1.1 complete
**Estimated Time**: 2 hours

- [ ] 1.2.1 Import and use existing `pathToClaudeProjectDir()` from `conversation-logs.ts`
- [ ] 1.2.2 Import and use existing `getJSONLFiles()` from `conversation-logs.ts`
- [ ] 1.2.3 Import and use existing `getFlashbackConfig()` and `getProjectDirectory()` from `config.ts`
- [ ] 1.2.4 Test all existing utilities work correctly in daemon context

## 1.3 Enhanced Config Template Extension
**Deliverable**: Extended flashback.json.template with background intelligence settings
**Acceptance Criteria**: Config includes model selection, rotation, decay settings
**Dependencies**: 1.2 complete
**Estimated Time**: 2 hours

- [ ] 1.3.1 Extend existing `templates/.claude/flashback/config/flashback.json.template`
- [ ] 1.3.2 Add per-task model configuration (gpt-5-nano default, user overrides)
- [ ] 1.3.3 Add GPT-5 parameter controls (textVerbosity: low, reasoning_effort: low defaults)
- [ ] 1.3.4 Add memory rotation settings (retain_count: 10, audit_schedule: weekly)

## 1.4 Memory Rotation System
**Deliverable**: File rotation utilities for .claude/flashback/memory/ files
**Acceptance Criteria**: REMEMBER.md, TODO_CHAIN.md rotated with configurable retention
**Dependencies**: 1.3 complete
**Estimated Time**: 3 hours

- [ ] 1.4.1 Create `src/utils/memory-rotation.ts` for file rotation utilities
- [ ] 1.4.2 Implement rotation for REMEMBER.md → ARCHIVE/REMEMBER.md.1, .2, etc.
- [ ] 1.4.3 Add configurable retention count (5-10 files, user configurable)
- [ ] 1.4.4 Test rotation preserves history while preventing disk bloat

## 1.5 DUMB Project Discovery
**Deliverable**: Project scanner using existing utilities only
**Acceptance Criteria**: Finds all Flashbacker projects using proven existing code
**Dependencies**: 1.2 complete
**Estimated Time**: 2 hours

- [ ] 1.5.1 Create `src/daemon/project-scanner.ts` wrapper around existing utilities
- [ ] 1.5.2 Use existing functions to scan `~/.claude/projects/` encoded directories
- [ ] 1.5.3 Filter for projects with `.claude/flashback/` directories (Flashbacker-enabled)
- [ ] 1.5.4 Test project discovery finds real projects (flashbacker-public, softmachine, etc.)

## 1.6 DUMB Activity Detection
**Deliverable**: Simple activity monitoring using existing session utilities
**Acceptance Criteria**: Detects .jsonl file changes per project, returns boolean state
**Dependencies**: 1.5 complete
**Estimated Time**: 2 hours

- [ ] 1.6.1 Use existing `getJSONLFiles()` to monitor session file changes
- [ ] 1.6.2 Implement simple 5-minute activity threshold checking
- [ ] 1.6.3 Add per-project activity state tracking (active/idle boolean)
- [ ] 1.6.4 Test activity detection with real session files

## 1.7 CLI Integration with Existing Patterns
**Deliverable**: Daemon commands integrated into existing CLI structure
**Acceptance Criteria**: Commands follow existing patterns in src/cli.ts
**Dependencies**: 1.1-1.6 complete
**Estimated Time**: 2 hours

- [ ] 1.7.1 Add `flashback daemon` command group to existing `src/cli.ts`
- [ ] 1.7.2 Create `src/commands/daemon.ts` following existing command patterns
- [ ] 1.7.3 Implement --start, --stop, --status, --logs subcommands
- [ ] 1.7.4 Test daemon CLI integration with existing command structure

## 1.8 Foundation Testing
**Deliverable**: Complete DUMB daemon following Hybrid AI+Computer pattern
**Acceptance Criteria**: Daemon purely programmatic, no embedded intelligence
**Dependencies**: 1.1-1.7 complete
**Estimated Time**: 2 hours

- [ ] 1.8.1 Test complete DUMB workflow: scan projects → detect activity → log state
- [ ] 1.8.2 Verify daemon contains zero embedded AI or intelligence
- [ ] 1.8.3 Confirm all existing utilities work correctly
- [ ] 1.8.4 Test daemon operates reliably with existing project portfolio

---

**Phase 1 Success Criteria:**
- ✅ Daemon is completely DUMB - only uses existing utilities for programmatic operations
- ✅ Zero code duplication - reuses ALL existing functions
- ✅ Config system properly extended with background intelligence settings
- ✅ Memory rotation system prevents file bloat with configurable retention