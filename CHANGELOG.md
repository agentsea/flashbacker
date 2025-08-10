# Changelog

All notable changes to Flashbacker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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