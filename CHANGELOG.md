# Changelog

All notable changes to Flashbacker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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