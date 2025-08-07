# AI Agent Discussion

Multi-agent discussion coordination using main conversation orchestration.

## Usage
`/fb:discuss <agent1>,<agent2>,<agent3> <topic>`

Launch coordinated discussions between specialized Claude Code agents with automatic orchestration and synthesis.

## Available Agents
Use `flashback agent --list` to see current available agents and descriptions

**Important**: If any agent requested by the user does not exist, return "❌ Agent '{agent_name}' does not exist" and then run `flashback agent --list` to show available agents. Do NOT proceed with the discussion if any requested agent is missing.

ELSE (if all requested agents exist), proceed with the rest of this command.

## Examples
- `/fb:discuss architect,security "API authentication strategy"`
- `/fb:discuss frontend,performance "React rendering optimization"`
- `/fb:discuss architect,backend,devops "Microservices deployment strategy"`
- `/fb:discuss security,qa "Penetration testing approach"`

## How It Works
1. **Parse Arguments**: Extract agent list and discussion topic from command
2. **Gather Context**: Run `flashback agent --context` to get project context bundle
3. **PARALLEL Agent Calls**: Call ALL requested agents simultaneously in one message using multiple tool calls
4. **Collect Responses**: Gather all agent responses in main conversation
5. **Synthesize Results**: Analyze responses for consensus, disagreements, and recommendations
6. **User Confirmation**: Present findings and ask for approval before taking actions

---

I'll coordinate this multi-agent discussion by calling each agent individually and synthesizing their responses.

**Arguments**: "$ARGUMENTS"

**AGENT VALIDATION (CRITICAL - DO THIS FIRST):**

First, let me check which agents are available and validate the requested agents.

1. **Get Available Agents**: Run `flashback agent --list` to see all current available agents
2. **Parse Requested Agents**: Extract comma-separated agent names from the first part of arguments (before first space)
3. **Validate Each Agent**: Check if each requested agent exists in the available agents list
4. **If ANY agent is missing**: 
   - Display: "❌ Agent '{agent_name}' does not exist"
   - Show the complete list of available agents from `flashback agent --list`
   - **STOP HERE - DO NOT PROCEED** with the discussion
5. **If ALL agents exist**: Continue with the rest of the discussion process below

**DISCUSSION ORCHESTRATION (ONLY if all agents validated successfully):**

1. **Context Gathering**: 
   Run `flashback agent --context` to get project context bundle for consistent analysis

2. **PARALLEL Agent Calls (CRITICAL - MUST USE PARALLEL EXECUTION)**:
   **YOU MUST** call ALL validated agents simultaneously in ONE message using multiple Task tool calls:
   - Send a SINGLE message containing multiple `<invoke name="Task">` calls
   - Each agent gets the full project context bundle
   - Each agent gets the discussion topic from their specialty perspective  
   - **DO NOT** call agents one-by-one sequentially - this is slow and wastes time
   - **EXAMPLE**: If discussing with architect,security,performance - make 3 Task tool calls in ONE message

3. **Response Collection & Synthesis**:
   After gathering all agent perspectives, provide:
   - Summary of each agent's key points with attribution
   - Areas where agents agree (consensus)
   - Points where agents disagree (trade-offs) 
   - Balanced final recommendation considering all viewpoints

4. **User Confirmation**:
   Present findings and ask "Do you want me to proceed with these recommendations?" before taking any actions.

**IMPORTANT**: Never hardcode agent names. Always use `flashback agent --list` to get the current available agents dynamically.