# Phase 2: AI SDK Agent Implementation (Week 2)

**Goal**: Implement 8 AI SDK agents using AGENT-ARCHITECTURE specifications with MCP integration and custom tools

## 2.1 MCP Tool Loading Infrastructure
**Deliverable**: MCP client creation with project-specific roots and configurations
**Acceptance Criteria**: MCP tools loaded per-project with proper sandboxing and security
**Estimated Time**: 4 hours

- [ ] 2.1.1 Add new MCP server dependencies to init system: `@modelcontextprotocol/server-filesystem`, `mcp-server-git`, `mcp-shell-server`
  - **Note**: Current init only installs context7, playwright, sequential-thinking - need to add filesystem/git/shell servers
- [ ] 2.1.2 Create `src/agents/mcp-loader.ts` with project-specific MCP client creation using AI SDK `experimental_createMCPClient()`
- [ ] 2.1.3 Implement filesystem MCP client with `projectDir` as root (sandboxed to project only)
- [ ] 2.1.4 Implement git MCP client with `--repository projectDir` (project repo only)  
- [ ] 2.1.5 Implement shell MCP client with whitelist configuration and `--working-directory projectDir`
- [ ] 2.1.6 Add agent-specific tool configurations (sessionAnalysisToolConfig, codeQualityToolConfig, etc.)
- [ ] 2.1.7 Test MCP client creation, tool loading, and proper cleanup with real project directory

## 2.2 Custom Tools Implementation
**Deliverable**: Required custom tools that MCP servers don't provide
**Acceptance Criteria**: Conversation log sanitization, significance checking, context management
**Dependencies**: 2.1 complete
**Estimated Time**: 5 hours

- [ ] 2.2.1 Create `src/agents/tools/conversation-log-sanitizer.ts` with 70% redundancy removal logic
- [ ] 2.2.2 Implement log preprocessing: remove duplicate metadata, deduplicate tool outputs, extract essential content
- [ ] 2.2.3 Add token estimation function and chunking logic with overlap preservation
- [ ] 2.2.4 Create `src/agents/tools/significance-checker.ts` for early exit cost optimization
- [ ] 2.2.5 Implement significance logic: message count, time thresholds, meaningful activity assessment
- [ ] 2.2.6 Test custom tools with real conversation logs from current project

## 2.3 Conversation-Logs.ts Extensions
**Deliverable**: Enhanced conversation log utilities for agent preprocessing
**Acceptance Criteria**: Extended existing utility with parsing, cleanup, token estimation functions
**Dependencies**: 2.2 complete
**Estimated Time**: 3 hours

- [ ] 2.3.1 Add `parseSessionContent()` function to extract structured conversation data from JSONL
- [ ] 2.3.2 Add `removeLogRedundancy()` function targeting 70% size reduction through metadata cleanup
- [ ] 2.3.3 Add `estimateTokenCount()` function using ~4 chars per token estimation
- [ ] 2.3.4 Add `chunkWithOverlap()` function for large conversation management with boundary preservation
- [ ] 2.3.5 Test enhanced conversation-logs utility with real session files and validate size reduction

## 2.4 Agent Base Framework
**Deliverable**: Base agent class following Flashbacker template-driven patterns and AI SDK integration
**Acceptance Criteria**: Template reading, MCP tool loading, AI SDK generateText integration, proper cleanup
**Dependencies**: 2.1, 2.2, 2.3 complete
**Estimated Time**: 4 hours

- [ ] 2.4.1 Create `src/agents/base/flashback-agent.ts` base class with template loading
- [ ] 2.4.2 Implement template reading from `.claude/flashback/prompts/agents/` using existing file patterns
- [ ] 2.4.3 Integrate AI SDK `generateText()` with `tool()` definitions, `stopWhen: stepCountIs()`, and `prepareStep` context management
- [ ] 2.4.4 Add MCP tool loading via `loadMCPTools()` helper with agent-specific configurations
- [ ] 2.4.5 Implement proper MCP client cleanup and error handling following AI SDK patterns
- [ ] 2.4.6 Test base framework with simple template and single MCP tool

## 2.5 Session Analysis Agent (Priority 1)
**Deliverable**: First working agent using AGENT-ARCHITECTURE specifications (evidence-based stepCountIs(5))
**Acceptance Criteria**: Reads real Claude logs, processes with custom sanitization, writes CURRENT_SESSION_ANALYSIS.md
**Dependencies**: 2.4 complete
**Estimated Time**: 4 hours

- [ ] 2.5.1 Create `templates/.claude/flashback/prompts/agents/session-analysis-agent.md` template with system prompt and workflow instructions
- [ ] 2.5.2 Implement Session Analysis Agent using base framework with sessionAnalysisToolConfig
- [ ] 2.5.3 Integrate conversation log sanitization, significance checking, and early exit logic
- [ ] 2.5.4 Add AI SDK context window management using `prepareStep` for large conversations
- [ ] 2.5.5 Test with actual conversation logs, validate 70% size reduction, verify CURRENT_SESSION_ANALYSIS.md quality
- [ ] 2.5.6 Validate evidence-based stepCountIs(5) limit covers actual workflow needs

## 2.6 Code Quality Agent (Priority 2)  
**Deliverable**: Agent leveraging existing debt-hunter.ts infrastructure with MCP integration (stepCountIs(7))
**Acceptance Criteria**: Hunts hallucinated code, detects technical debt, integrates tree-sitter/ripgrep
**Dependencies**: 2.5 complete
**Estimated Time**: 4 hours

- [ ] 2.6.1 Create `templates/.claude/flashback/prompts/agents/code-quality-agent.md` template
- [ ] 2.6.2 Implement Code Quality Agent using codeQualityToolConfig (adds ripgrep to shell whitelist)
- [ ] 2.6.3 Integrate existing `debt-hunter.ts` tree-sitter infrastructure via custom tools
- [ ] 2.6.4 Add MCP filesystem and shell tools for codebase scanning and analysis
- [ ] 2.6.5 Test hallucination detection and technical debt scanning with current codebase
- [ ] 2.6.6 Validate CODE_QUALITY_ANALYSIS.md identifies real issues, verify stepCountIs(7) adequacy

## 2.7 Memory Management Agent (Priority 3)
**Deliverable**: Agent for updating REMEMBER.md based on session analysis (stepCountIs(4))
**Acceptance Criteria**: Reads session analysis, updates memory via MCP filesystem edit_file or jsdiff
**Dependencies**: 2.5 complete (needs session analysis output)
**Estimated Time**: 3 hours

- [ ] 2.7.1 Create `templates/.claude/flashback/prompts/agents/memory-management-agent.md` template
- [ ] 2.7.2 Implement Memory Management Agent using base framework
- [ ] 2.7.3 Test MCP filesystem `edit_file` vs jsdiff for memory updates (determine best approach)
- [ ] 2.7.4 Add session insight prioritization and memory update logic
- [ ] 2.7.5 Test with real session analysis data, validate REMEMBER.md updates preserve structure
- [ ] 2.7.6 Confirm stepCountIs(4) sufficient for read session + read memory + analyze + write

## 2.8 Focus Chain Agent (Priority 4)
**Deliverable**: TODO chain management following Cline patterns (stepCountIs(4))
**Acceptance Criteria**: Maintains persistent TODO chains, Cline-style markdown checklist format
**Dependencies**: 2.5 complete (needs session analysis input)
**Estimated Time**: 3 hours

- [ ] 2.8.1 Create `templates/.claude/flashback/prompts/agents/focus-chain-agent.md` template with Cline-inspired workflow
- [ ] 2.8.2 Implement Focus Chain Agent with TODO chain parsing and persistence logic
- [ ] 2.8.3 Add Cline-style markdown checklist management (`- [ ]`/`- [x]` format)
- [ ] 2.8.4 Integrate with session analysis to identify new tasks and completed items
- [ ] 2.8.5 Test TODO chain persistence, updates, and format consistency
- [ ] 2.8.6 Validate TODO_CHAIN.md follows Cline patterns and stepCountIs(4) covers workflow

## 2.9 Git Analysis Agent (Priority 5)
**Deliverable**: Agent analyzing code changes using MCP git server (stepCountIs(6))
**Acceptance Criteria**: Uses MCP git tools, correlates with session analysis, identifies architectural changes
**Dependencies**: 2.1, 2.5 complete (needs MCP git + session analysis)
**Estimated Time**: 3 hours

- [ ] 2.9.1 Create `templates/.claude/flashback/prompts/agents/git-analysis-agent.md` template
- [ ] 2.9.2 Implement Git Analysis Agent using MCP git server tools (git_status, git_log, git_diff)
- [ ] 2.9.3 Add correlation logic between git changes and session analysis insights
- [ ] 2.9.4 Integrate architectural significance assessment for code changes
- [ ] 2.9.5 Test with real git repository changes, validate GIT_INSIGHTS.md correlation
- [ ] 2.9.6 Confirm stepCountIs(6) handles git status + log + diff + analyze + correlate + write

## 2.10 Working Plan Agent (Priority 6)
**Deliverable**: Agent updating WORKING_PLAN.md based on progress insights (stepCountIs(5))
**Acceptance Criteria**: Updates working plan using session analysis, git insights, and memory context
**Dependencies**: 2.5, 2.7, 2.9 complete (needs session + memory + git analysis)
**Estimated Time**: 3 hours

- [ ] 2.10.1 Create `templates/.claude/flashback/prompts/agents/working-plan-agent.md` template
- [ ] 2.10.2 Implement Working Plan Agent reading multiple input sources (session, memory, git insights)
- [ ] 2.10.3 Add working plan update logic via MCP filesystem edit_file or jsdiff
- [ ] 2.10.4 Test with real working plan updates reflecting actual progress
- [ ] 2.10.5 Validate WORKING_PLAN.md updates maintain structure and reflect insights
- [ ] 2.10.6 Confirm stepCountIs(5) covers read inputs + analyze + plan + update + write

## 2.11 Security Analysis Agent (Priority 7)
**Deliverable**: Agent scanning codebase for security issues (stepCountIs(5))
**Acceptance Criteria**: Detects hardcoded secrets, .env files, API keys, vulnerable patterns
**Dependencies**: 2.1 complete (needs MCP filesystem and git)
**Estimated Time**: 3 hours

- [ ] 2.11.1 Create `templates/.claude/flashback/prompts/agents/security-analysis-agent.md` template
- [ ] 2.11.2 Implement Security Analysis Agent using MCP filesystem search capabilities
- [ ] 2.11.3 Add security pattern detection for secrets, keys, configuration exposure
- [ ] 2.11.4 Integrate MCP git tools for analyzing security-relevant changes
- [ ] 2.11.5 Test with codebase scanning, validate SECURITY_ANALYSIS.md identifies real concerns
- [ ] 2.11.6 Confirm stepCountIs(5) covers scan + git changes + analyze + correlate + write

## 2.12 Ground Truth Agent (Priority 8 - Weekly)
**Deliverable**: Agent detecting drift between documentation and codebase reality (stepCountIs(8))
**Acceptance Criteria**: Compares memory files with actual code, corrects inconsistencies
**Dependencies**: 2.5-2.11 complete (needs all agent outputs)
**Estimated Time**: 4 hours

- [ ] 2.12.1 Create `templates/.claude/flashback/prompts/agents/ground-truth-agent.md` template  
- [ ] 2.12.2 Implement Ground Truth Agent with comprehensive codebase analysis capabilities
- [ ] 2.12.3 Add drift detection logic comparing documented state vs actual code
- [ ] 2.12.4 Implement correction capability using MCP filesystem edit_file for multiple memory files
- [ ] 2.12.5 Test drift detection with real project state vs documentation mismatches
- [ ] 2.12.6 Validate ground truth corrections maintain consistency, confirm stepCountIs(8) for complex workflow

## 2.13 Template Distribution Integration
**Deliverable**: All agent templates distributed via existing Flashbacker template system
**Acceptance Criteria**: Templates appear in user projects, follow existing template patterns
**Dependencies**: 2.5-2.12 templates created
**Estimated Time**: 2 hours

- [ ] 2.13.1 Integrate 7 new agent templates into existing template distribution system under `prompts/agents/` subdirectory
- [ ] 2.13.2 Update template scanning in `file-utils.ts` to include `prompts/agents/` subdirectory for recursive copying
  - **Migration**: Update `installAIPrompts()` to copy subdirectories recursively
  - **Directory Structure**: Separate agents from personas for better organization
- [ ] 2.13.3 Test distribution via existing `flashback init --refresh` command
- [ ] 2.13.4 Verify templates appear in `.claude/flashback/prompts/agents/` in user projects
- [ ] 2.13.5 Validate all agent templates follow existing Flashbacker prompt template patterns and are properly separated from personas

## 2.14 Agent Integration Testing  
**Deliverable**: Complete agent system with MCP integration, custom tools, and proper cleanup
**Acceptance Criteria**: All 7 agents working independently, proper MCP client management, cost optimization
**Dependencies**: 2.1-2.13 complete
**Estimated Time**: 3 hours

- [ ] 2.14.1 Test all agents with real project data using AGENT-ARCHITECTURE specifications
- [ ] 2.14.2 Validate MCP client creation, tool loading, and cleanup for each agent
- [ ] 2.14.3 Confirm agent isolation (each writes to own output file, no conflicts)
- [ ] 2.14.4 Test custom tools (conversation sanitization, significance checking) work correctly
- [ ] 2.14.5 Validate evidence-based step limits prevent infinite loops and control costs
- [ ] 2.14.6 Confirm all agents follow template-driven prompts without hardcoded content

---

**Phase 2 Success Criteria:**
- ✅ 7 agents implemented using AI SDK with evidence-based step limits (not arbitrary)
- ✅ MCP tools loaded per-project with proper roots and sandboxing
- ✅ Custom tools handle conversation preprocessing and significance checking  
- ✅ Agent isolation with single output file prevents conflicts
- ✅ Template-driven prompts distributed via existing Flashbacker template system
- ✅ Proper MCP client cleanup prevents resource leaks
- ✅ Security model enforced: project-only access, whitelisted commands, no destructive operations