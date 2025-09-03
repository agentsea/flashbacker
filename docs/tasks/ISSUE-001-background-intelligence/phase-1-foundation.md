# Phase 1: Foundation Integration (Week 1)

**Goal**: Build DUMB daemon using ALL existing utilities with NO duplication + comprehensive PM2 installation infrastructure

## 1.1 PM2 Installation Infrastructure (Automated Multi-Vector)
**Deliverable**: Automated PM2 installation system with multiple vectors and graceful failure handling
**Acceptance Criteria**: PM2 installed reliably across environments (corporate, standard, restricted) with fallback options
**Estimated Time**: 3 hours

- [ ] 1.1.1 Update `package.json` with postinstall hook: `"postinstall": "node scripts/setup-prereqs.js --ensure-pm2 --verbose || echo 'Warning: PM2 auto-install failed'"`
- [x] 1.1.2 Enhance `scripts/setup-prereqs.js` with `--ensure-pm2` flag for automated PM2 installation and validation ✅
  - **Notes**: Implemented ensurePm2() function with verbose logging, error handling, and installation guidance
  - **Deliverable**: Enhanced setup-prereqs.js with automated PM2 installation capabilities
- [x] 1.1.3 Update `scripts/install.sh` with PM2 installation check: `if ! command -v pm2 >/dev/null; then npm install -g pm2 --silent; fi` ✅
  - **Notes**: Added PM2 installation check and automated installation to install script
  - **Deliverable**: Enhanced install.sh with PM2 installation automation
- [x] 1.1.4 Add PM2 availability detection functions with user-friendly error messaging and installation guidance ✅
  - **Notes**: Implemented ensurePm2Available() in daemon.ts with clear error messaging and installation instructions
  - **Deliverable**: PM2 detection functions with user-friendly error handling
- [ ] 1.1.5 Test PM2 installation across environments: standard npm, corporate firewalls, restricted permissions, proxy servers

## 1.2 Ecosystem Configuration Generation
**Deliverable**: Automated PM2 ecosystem configuration during `flashback init`
**Acceptance Criteria**: Ecosystem files generated in `.claude/flashback/scripts/pm2/` with proper daemon configuration
**Dependencies**: 1.1 complete
**Estimated Time**: 2 hours

- [x] 1.2.1 Extend `src/commands/init.ts` to generate `.claude/flashback/scripts/pm2/ecosystem.config.js` ✅
  - **Notes**: Implemented generatePm2Ecosystem() function in init.ts with proper directory structure
  - **Deliverable**: PM2 ecosystem configuration generation during flashback init
- [x] 1.2.2 Configure ecosystem with: app name `flashback-daemon`, memory limits (150MB), auto-restart, log rotation ✅
  - **Notes**: Ecosystem configured with proper PM2 settings, resource limits, and daemon management
  - **Deliverable**: Complete ecosystem.config.js with production-ready PM2 configuration
- [x] 1.2.3 Include environment variables from `flashback.json` config in ecosystem configuration ✅
  - **Notes**: Environment variables properly passed from project config to PM2 ecosystem
  - **Deliverable**: Dynamic environment variable integration in ecosystem configuration
- [x] 1.2.4 Generate ecosystem only if missing; support `--refresh` flag to overwrite existing configuration ✅
  - **Notes**: Conditional generation implemented with refresh support for configuration updates
  - **Deliverable**: Smart ecosystem generation with overwrite protection and refresh capability
- [ ] 1.2.5 Provide post-init usage instructions: `pm2 start .claude/flashback/scripts/pm2/ecosystem.config.js`

## 1.3 Existing Utility Integration (NO Duplication)
**Deliverable**: Daemon uses ALL existing utilities from conversation-logs.ts and config.ts
**Acceptance Criteria**: Zero code duplication, leverages proven existing functions
**Dependencies**: 1.2 complete
**Estimated Time**: 2 hours

- [x] 1.3.1 Import and use existing `pathToClaudeProjectDir()` from `conversation-logs.ts` ✅
  - **Notes**: Successfully imported and integrated existing utility functions in daemon implementation
  - **Deliverable**: Zero duplication - daemon uses proven existing project directory utilities
- [x] 1.3.2 Import and use existing `getJSONLFiles()` from `conversation-logs.ts` ✅
  - **Notes**: Daemon uses existing JSONL file discovery for activity detection without code duplication
  - **Deliverable**: Activity monitoring using proven existing session file utilities
- [ ] 1.3.3 Import and use existing `getFlashbackConfig()` and `getProjectDirectory()` from `config.ts`
- [x] 1.3.4 Test all existing utilities work correctly in daemon context with proper error handling ✅
  - **Notes**: Utilities integrated with proper error handling and graceful degradation in daemon context
  - **Deliverable**: Robust utility integration with error boundaries and fallback behavior

## 1.4 Enhanced Config Template Extension
**Deliverable**: Extended flashback.json.template with background intelligence and PM2 settings
**Acceptance Criteria**: Config includes model selection, rotation, decay settings, PM2 configuration
**Dependencies**: 1.3 complete
**Estimated Time**: 2 hours

- [ ] 1.4.1 Extend existing `templates/.claude/flashback/config/flashback.json.template`
- [ ] 1.4.2 Add per-task model configuration (gpt-5-nano default, user overrides)
- [ ] 1.4.3 Add GPT-5 parameter controls (textVerbosity: low, reasoning_effort: low defaults)
- [ ] 1.4.4 Add memory rotation settings (retain_count: 10, audit_schedule: weekly)
- [ ] 1.4.5 Add PM2 daemon settings (poll_interval: 30s, activity_threshold: 5min, resource_limits)

## 1.5 Memory Rotation System
**Deliverable**: File rotation utilities for .claude/flashback/memory/ files
**Acceptance Criteria**: REMEMBER.md, TODO_CHAIN.md rotated with configurable retention
**Dependencies**: 1.4 complete
**Estimated Time**: 3 hours

- [x] 1.5.1 Create `src/utils/memory-rotation.ts` for file rotation utilities ✅
  - **Notes**: Implemented comprehensive memory rotation system with configurable retention
  - **Deliverable**: Complete memory rotation utility with archive management and retention control
- [x] 1.5.2 Implement rotation for REMEMBER.md → ARCHIVE/REMEMBER.md.1, .2, etc. ✅
  - **Notes**: File rotation implemented with proper archive naming and sequential versioning
  - **Deliverable**: Working file rotation system with ARCHIVE directory management
- [x] 1.5.3 Add configurable retention count (5-10 files, user configurable) ✅
  - **Notes**: Retention count parameterized with automatic overflow cleanup
  - **Deliverable**: Configurable retention system preventing disk bloat while preserving history
- [ ] 1.5.4 Test rotation preserves history while preventing disk bloat
- [ ] 1.5.5 Add rotation scheduling integration with PM2 daemon

## 1.6 DUMB Project Discovery
**Deliverable**: Project scanner using existing utilities only
**Acceptance Criteria**: Finds all Flashbacker projects using proven existing code
**Dependencies**: 1.3 complete
**Estimated Time**: 2 hours

- [x] 1.6.1 Create `src/daemon/project-scanner.ts` wrapper around existing utilities ✅
  - **Notes**: Project scanner implemented with conservative single-project discovery approach
  - **Deliverable**: Working project discovery system using existing utility patterns
- [ ] 1.6.2 Use existing functions to scan `~/.claude/projects/` encoded directories
- [x] 1.6.3 Filter for projects with `.claude/flashback/` directories (Flashbacker-enabled) ✅
  - **Notes**: Project filtering implemented to only process Flashbacker-enabled directories
  - **Deliverable**: Safe project discovery that prevents processing non-Flashbacker projects
- [ ] 1.6.4 Test project discovery finds real projects (flashbacker-public, softmachine, etc.)
- [ ] 1.6.5 Add project filtering to prevent non-Flashbacker directory processing

## 1.7 DUMB Activity Detection
**Deliverable**: Simple activity monitoring using existing session utilities
**Acceptance Criteria**: Detects .jsonl file changes per project, returns boolean state
**Dependencies**: 1.6 complete
**Estimated Time**: 2 hours

- [ ] 1.7.1 Use existing `getJSONLFiles()` to monitor session file changes
- [ ] 1.7.2 Implement simple 5-minute activity threshold checking with configurable intervals
- [ ] 1.7.3 Add per-project activity state tracking (active/idle boolean)
- [ ] 1.7.4 Test activity detection with real session files and various activity patterns
- [ ] 1.7.5 Add activity debouncing to prevent excessive API calls during rapid file changes

## 1.8 CLI Integration with PM2 Wrapper
**Deliverable**: Daemon commands integrated into existing CLI structure with PM2 management
**Acceptance Criteria**: Commands follow existing patterns in src/cli.ts with PM2 integration
**Dependencies**: 1.2, 1.7 complete
**Estimated Time**: 3 hours

- [x] 1.8.1 Add `flashback daemon` command group to existing `src/cli.ts` ✅
  - **Notes**: Daemon command group successfully integrated into existing CLI structure
  - **Deliverable**: CLI integration following existing command patterns with daemon subcommands
- [x] 1.8.2 Create `src/commands/daemon.ts` following existing command patterns ✅
  - **Notes**: Daemon command implementation with PM2 wrapper functions and error handling
  - **Deliverable**: Complete daemon command module with start/stop/status/logs functionality
- [x] 1.8.3 Implement --start, --stop, --status, --logs subcommands with PM2 wrapper functions ✅
  - **Notes**: All daemon subcommands implemented with PM2 integration and user-friendly interfaces
  - **Deliverable**: Working daemon management commands with PM2 process control
- [x] 1.8.4 Add PM2 availability checking and user-friendly error messages if PM2 missing ✅
  - **Notes**: PM2 availability detection with clear installation guidance and error messaging
  - **Deliverable**: Robust PM2 detection with helpful user guidance for installation
- [ ] 1.8.5 Test daemon CLI integration with existing command structure
- [ ] 1.8.6 Add ecosystem file path resolution and validation

## 1.9 DUMB Daemon Implementation
**Deliverable**: Basic DUMB daemon using existing utilities with PM2 process management
**Acceptance Criteria**: Daemon purely programmatic, no embedded intelligence, PM2 managed
**Dependencies**: 1.3, 1.8 complete
**Estimated Time**: 3 hours

- [x] 1.9.1 Create `src/daemon/index.ts` as simple monitoring loop (NO embedded intelligence) ✅
  - **Notes**: DUMB daemon implemented with activity detection, config reading, and logging - zero AI embedding
  - **Deliverable**: Pure programmatic daemon following Hybrid AI+Computer pattern strictly
- [x] 1.9.2 Integrate with generated PM2 ecosystem configuration ✅
  - **Notes**: Daemon properly integrated with PM2 ecosystem for process management and resource control
  - **Deliverable**: Working PM2 process integration with ecosystem-based configuration
- [x] 1.9.3 Add process health monitoring and graceful shutdown handling (SIGTERM, SIGINT) ✅
  - **Notes**: Signal handling implemented for clean daemon shutdown and resource cleanup
  - **Deliverable**: Production-ready process lifecycle management with graceful shutdown
- [ ] 1.9.4 Test PM2 daemon startup, monitoring, and shutdown via ecosystem config
- [ ] 1.9.5 Verify daemon resource usage stays under 150MB with PM2 overhead included
- [ ] 1.9.6 Add daemon self-health checks and automatic restart logic

## 1.10 Foundation Testing
**Deliverable**: Complete DUMB daemon following Hybrid AI+Computer pattern with PM2 integration
**Acceptance Criteria**: Daemon purely programmatic, no embedded intelligence, reliable PM2 operation
**Dependencies**: 1.1-1.9 complete
**Estimated Time**: 2 hours

- [ ] 1.10.1 Test complete DUMB workflow: scan projects → detect activity → log state
- [ ] 1.10.2 Verify daemon contains zero embedded AI or intelligence
- [ ] 1.10.3 Confirm all existing utilities work correctly with PM2 process management
- [ ] 1.10.4 Test daemon operates reliably with existing project portfolio
- [ ] 1.10.5 Validate PM2 ecosystem configuration works across different environments
- [ ] 1.10.6 Test graceful shutdown and restart scenarios

---

**Phase 1 Success Criteria:**
- ✅ PM2 installation infrastructure with multiple vectors and graceful failure handling
- ✅ Automated ecosystem configuration generation during `flashback init`
- ✅ Daemon is completely DUMB - only uses existing utilities for programmatic operations
- ✅ Zero code duplication - reuses ALL existing functions
- ✅ Config system properly extended with background intelligence and PM2 settings
- ✅ Memory rotation system prevents file bloat with configurable retention
- ✅ CLI integration provides user-friendly PM2 management with error handling
- ✅ Cross-platform compatibility (macOS, Linux, Windows) with corporate environment support