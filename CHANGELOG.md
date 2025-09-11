# Changelog

All notable changes to Flashbacker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.7] - 2025-09-11

### Added
- **Claude Context Status Line Monitor**: New script `claude_context_monitor.js` with real token usage and color-coded pressure
  - Installed via `flashback init` to `.claude/statusline/`
  - Detects 1M vs 200K context windows based on Claude model
  - Example transcripts and README included under `templates/.claude/statusline/`

### Changed
- Init process now installs statusline templates and marks scripts executable

## [2.3.5] - 2025-08-14

### Added
- **NEW TASK TEMPLATES**: Added comprehensive task management system with 4 new slash commands
  - **`/fb:create-tasks`**: Generate atomic, AI-friendly task breakdown from comprehensive issues
  - **`/fb:update-tasks`**: Mark tasks complete, update progress tracking, maintain dashboards
  - **`/fb:tasks-status`**: Display comprehensive progress dashboard across all active issues
  - **`/fb:work-task`**: Focus AI attention on single atomic task with full context and clear deliverables
- Enhanced project management capabilities with granular task tracking and atomic deliverable focus

### Enhanced
- **Surgical Discipline Integration**: All task templates now enforce fix-master principles
  - **Anti-placeholder enforcement**: Strong language against creating empty/TODO files
  - **Focused implementation**: Prevents E2E test creation for incomplete features
  - **Atomic task discipline**: One task, one deliverable, no scope creep
  - **Quality standards**: Working code required, manual testing first, targeted tests only

### Technical
- Created 4 comprehensive task management templates following template-driven architecture
- Enhanced all task templates with CRITICAL sections and anti-pattern enforcement
- Integrated surgical discipline principles from fix-master methodology across task system
- Maintained template consistency with relative paths and dynamic scanning compatibility

## [2.3.4] - 2025-08-14

### Fixed
- **CRITICAL**: NPM template distribution reliability
  - Implemented dual-path template resolution for published vs. dev environments
  - Enhanced build to copy `templates/` into `lib/templates/` for runtime discovery
  - Verified `npm pack` includes both `templates/` and `lib/templates/`
  - Added validation steps to test install from tarball and runtime health

### Documentation
- Updated `README.md`, `USER_GUIDE.md`, and `INSTALLATION.md` to reflect v2.3.4
- Documented template distribution strategy at a high level

## [2.3.3] - 2025-08-14

### Enhanced
- **ENHANCED FIX-MASTER**: Significantly improved `/fb:fix-master` surgical fix protocol
  - **Refined workflow structure**: Clear 7-phase methodology with better decision points
  - **Agent validation integration**: Smart agent selection for complex fixes with explicit criteria  
  - **Enhanced agent workflow**: Template-driven agent instructions with focus areas (TypeScript, performance, architecture)
  - **Structured final reporting**: Comprehensive fix summary template with files changed, root cause, testing, and agent feedback
  - **Improved manual validation**: Stronger emphasis on hands-on testing before e2e tests
  - **Better decision logic**: Clear criteria for when to engage agents vs. simple fixes

### Technical
- Completely rewrote fix-master-enhanced.md with condensed principles and clear workflow guidelines
- Enhanced agent selection process with specific focus areas and review-only instructions
- Improved template consistency and removed redundant content for better usability
- Added structured agent feedback integration with explicit wait requirements

## [2.3.2] - 2025-08-13

### Added
- **NEW AGENT**: Added `@agent-john-carmack` as a full Claude Code agent
  - **Complete dual-layer coverage**: John Carmack now available in both persona (`/fb:persona john-carmack`) and agent (`@agent-john-carmack`) formats
  - **Project-aware analysis**: Agent automatically gathers full project context via `flashback agent --context`
  - **Performance-critical systems expertise**: Game engine principles, hot path optimization, functional programming discipline
  - **Template consistency**: Agent template follows established YAML frontmatter and context-gathering patterns
- Enhanced dual-layer AI system completeness with all 20 specialists available in both formats

### Technical
- Created comprehensive john-carmack agent template with YAML frontmatter and context-gathering instructions
- Agent template includes performance-critical systems analysis focus and game engine methodology
- Full integration with existing agent infrastructure and template distribution system
- Maintains consistency across all 20 specialists in dual-layer architecture

## [2.3.1] - 2025-08-11

### Added
- **AUTOMATED INSTALLER**: Added `scripts/install.sh` for single-command installation and updates
  - **Smart template refresh**: Automatically updates existing projects with new personas and agents
  - **Prerequisites validation**: Checks Node.js 18.x-22.x and npm 9.x+ compatibility before installation
  - **Shell integration**: Auto-detects Zsh/Bash and creates flashback command alias
  - **Update detection**: Intelligently handles both fresh installs and updates with different workflows
  - **Project discovery**: Finds and refreshes all existing Flashbacker projects automatically
- Enhanced installation experience with single `curl | bash` command
- Comprehensive error handling and user feedback throughout installation process

### Enhanced
- Installation documentation now features automated installer as the recommended option
- Manual installation remains available as Option 2 for users who prefer it
- Better user onboarding with clearer installation paths and next steps
- Reduced installation complexity from 4 commands to 1 for most users

### Technical
- Created robust installer script with comprehensive prerequisite checking
- Implemented smart project discovery to refresh templates during updates
- Added shell configuration detection and automatic alias creation
- Enhanced installation architecture supports both fresh installs and seamless updates
- Full backward compatibility with existing manual installation workflows

## [2.3.0] - 2025-08-10

### Added
- **NEW PERSONA**: Added `john-carmack` persona for performance-critical systems analysis
  - **Performance optimization**: Hot path clarity and deterministic performance analysis
  - **Functional programming discipline**: Minimal side effects and pure function advocacy
  - **Control flow simplification**: Shallow conditional logic and consistent execution paths
  - **Language-agnostic principles**: Real-time systems optimization applicable across all languages
  - **Game engine methodology**: Applies proven game engine principles to any performance-critical codebase
- Enhanced specialist ecosystem from 19 to **20 total specialists**
- All personas maintain dual-layer availability (slash commands + dedicated subagents)

### Enhanced
- Performance analysis capabilities through specialized John Carmack methodology
- Architectural review focusing on hot path optimization and functional patterns
- Code quality analysis emphasizing deterministic behavior and minimal side effects
- System design guidance for predictable performance and reduced bug risk

### Technical
- Created comprehensive john-carmack persona template with performance-focused analysis patterns
- Template distribution system supports performance optimization workflow
- Full dual-layer system maintains consistency across all 20 specialists
- Enhanced context-gathering capabilities for performance-critical analysis

## [2.2.9] - 2025-08-09

### Added
- **NEW SLASH COMMAND**: Added `/fb:fix-master` for surgical code fixes
  - **fix-master protocol**: Systematic 5-phase fix methodology (isolation → analysis → implementation → validation → testing)
  - **Surgical precision**: Enforces minimal, targeted changes over broad architectural modifications
  - **Manual validation first**: Requires manual testing and user confirmation before automated testing
  - **Anti-duplication**: Forces code reading to find existing solutions before implementing new ones
  - **Complete solutions only**: No placeholder files or scaffolding - implements working solutions
- Enhanced surgical fix capabilities for precise, maintainable bug fixes

### Technical
- Created comprehensive fix-master slash command template with surgical methodology
- Template distribution system supports surgical fix protocol workflow
- Full integration with existing slash command infrastructure
- Promotes systematic, precise bug fixing over broad changes

## [2.2.8] - 2025-08-09

### Added
- **GPT-5 INTEGRATION**: Added gpt5-cursor agent for advanced analysis capabilities
  - **gpt5-cursor agent**: GPT-5 integration via cursor-agent CLI for second opinions and complex problem solving
  - Deep research capabilities for comprehensive analysis and bug fixing
  - Enhanced analytical power for challenging technical problems
- Expanded specialist ecosystem from 18 to **19 total specialists**
- All agents maintain dual-layer availability (personas + dedicated subagents)

### Enhanced  
- Updated all documentation (README.md, USER_GUIDE.md, INSTALLATION.md) to reflect 19 total specialists
- Enhanced analytical capabilities through GPT-5 integration
- Improved problem-solving workflow with dedicated GPT-5 access
- Strengthened agent ecosystem with advanced reasoning capabilities

### Technical
- Created comprehensive gpt5-cursor agent template with cursor-agent CLI integration
- Template distribution system supports GPT-5 integration workflow
- Full dual-layer system maintains consistency across all 19 specialists
- Enhanced context-gathering capabilities for GPT-5 analysis

## [2.2.7] - 2025-08-07

### Added
- **NEW AGENTS**: Added debt-hunter and hallucination-hunter as full Claude Code agents
  - **debt-hunter agent**: Technical debt detection with CLI scanning capabilities and code quality analysis
  - **hallucination-hunter agent**: AI code validation and semantic correctness analysis for non-functional implementations
- Expanded specialist ecosystem from 14 to **16 total specialists**
- Both new agents follow established Hybrid AI+Computer Operations Pattern (CLI scanning + intelligent analysis)
- Full integration with context-gathering workflow via `flashback agent --context`

### Enhanced
- Updated documentation to reflect 16 total specialists across README.md and USER_GUIDE.md
- Both agents leverage existing CLI scanning capabilities while providing project-aware intelligent analysis
- Agents complement existing slash commands (`/fb:debt-hunter` and `/fb:hallucination-hunter`)

### Technical
- Created comprehensive agent templates with YAML frontmatter and context-gathering instructions
- Verified agent deployment through full build → link → init refresh cycle
- Template distribution system successfully expanded to support additional agents
- All agents now available in dual-layer system (personas + dedicated subagents)

## [2.2.6] - 2025-08-06

### Fixed
- **CRITICAL**: Fixed catastrophic init system bug that destroyed entire .claude directories
- **CRITICAL**: Fixed framework coexistence issues - Flashbacker now safely coexists with SoftMachine and other Claude Code frameworks
- Replaced hardcoded agent lists with dynamic template scanning for infinite scalability
- Made `--clean` install non-destructive (only removes Flashbacker parts)
- Enhanced gitignore protection for all Claude Code frameworks

### Added
- Framework detection system warns when other Claude frameworks are present
- Dynamic template scanning supports unlimited agents/personas without code changes
- Selective cleanup functions preserve non-Flashbacker installations
- Enhanced error handling and validation throughout init system

### Changed
- Clean install now preserves other Claude Code frameworks completely
- Agent cleanup uses template-based detection instead of hardcoded lists
- Repository references updated for AgentSea organization

### Technical
- Template-driven architecture maintains zero hardcoding principle
- Framework coexistence tested with SoftMachine integration
- Security audit completed with HIGH confidence rating
- All documentation updated for public release

---

## Release Notes

### v2.2.6 - First Public Release
This is the first public release of Flashbacker under the AgentSea organization. 

**Critical Fixes**: This release fixes catastrophic bugs that could destroy other Claude Code framework installations. All users should upgrade immediately.

**New Architecture**: Dynamic template scanning replaces all hardcoded file lists, enabling infinite scalability for agents and personas.

**Framework Safety**: Bulletproof coexistence with other Claude Code frameworks like SoftMachine.