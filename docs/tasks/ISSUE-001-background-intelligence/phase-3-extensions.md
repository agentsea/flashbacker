# Phase 3: Agent Orchestration (Week 3)

**Goal**: Integrate agents with daemon and establish agent coordination patterns

## 3.1 Daemon-Agent Integration
**Deliverable**: PM2 daemon triggers agents when activity detected
**Acceptance Criteria**: Daemon calls agents using AI SDK patterns when session activity goes idle
**Dependencies**: Phase 2 complete (all 8 agents implemented)
**Estimated Time**: 3 hours

- [ ] 3.1.1 Integrate agent execution into existing `src/daemon/index.ts` when activity detected
- [ ] 3.1.2 Add agent triggering logic when session goes from active → idle status
- [ ] 3.1.3 Implement agent execution using AI SDK `generateText()` with MCP + custom tools
- [ ] 3.1.4 Add agent result logging to daemon logs for monitoring
- [ ] 3.1.5 Test daemon-agent integration with real session activity patterns

## 3.2 Agent Execution Sequencing  
**Deliverable**: Sequential agent execution to prevent file conflicts
**Acceptance Criteria**: Agents run in order, each using previous agent outputs as input
**Dependencies**: 3.1 complete
**Estimated Time**: 2 hours

- [ ] 3.2.1 Implement agent execution sequence: Session Analysis → Memory Management → Git Analysis → Working Plan → Focus Chain
- [ ] 3.2.2 Add agent output validation before triggering next agent in sequence
- [ ] 3.2.3 Implement error handling and graceful degradation when agents fail
- [ ] 3.2.4 Test sequential execution with real project data and agent coordination
- [ ] 3.2.5 Validate agent isolation (each writes to own file, no conflicts)

## 3.3 Cost Monitoring and Controls
**Deliverable**: Real-time cost tracking and budget enforcement for agent execution
**Acceptance Criteria**: Cost tracking prevents runaway spending, provides usage visibility
**Dependencies**: 3.2 complete
**Estimated Time**: 2 hours

- [ ] 3.3.1 Implement cost tracking for AI SDK agent executions (token usage, API calls)
- [ ] 3.3.2 Add budget controls and spending limits per agent and per project
- [ ] 3.3.3 Create cost monitoring dashboard integration with existing daemon status
- [ ] 3.3.4 Test cost controls prevent excessive spending during background operations
- [ ] 3.3.5 Validate cost reporting and budget enforcement work correctly

## 3.4 Agent Error Handling and Recovery
**Deliverable**: Robust error handling ensuring agent failures don't crash daemon
**Acceptance Criteria**: Agent failures are logged, other agents continue, graceful degradation
**Dependencies**: 3.3 complete  
**Estimated Time**: 2 hours

- [ ] 3.4.1 Implement comprehensive error boundaries around agent execution
- [ ] 3.4.2 Add agent failure logging and error recovery strategies
- [ ] 3.4.3 Ensure failed agents don't prevent other agents from running
- [ ] 3.4.4 Test error handling with simulated agent failures and edge cases
- [ ] 3.4.5 Validate daemon stability when agents encounter errors

## 3.5 Agent Coordination Testing
**Deliverable**: Complete agent orchestration system working with daemon
**Acceptance Criteria**: All agents coordinate properly, isolated outputs, daemon integration
**Dependencies**: 3.1-3.4 complete
**Estimated Time**: 2 hours

- [ ] 3.5.1 Test complete agent orchestration with real project activity cycles
- [ ] 3.5.2 Validate agent execution sequence and output coordination
- [ ] 3.5.3 Confirm cost controls and error handling work in integrated system
- [ ] 3.5.4 Test daemon-agent integration across different project scenarios
- [ ] 3.5.5 Validate all agents produce useful outputs without conflicts

---

**Phase 3 Success Criteria:**
- ✅ Daemon successfully triggers agents when activity detected
- ✅ Agents execute in sequence without file conflicts or race conditions
- ✅ Cost monitoring prevents excessive spending with real-time tracking
- ✅ Agent failures don't crash daemon, graceful degradation works
- ✅ Complete agent orchestration system ready for production use