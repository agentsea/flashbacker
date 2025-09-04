import { FlashbackAgent } from './base/flashback-agent';
import { sanitizeConversationLogs } from './tools/conversation-log-sanitizer';
import { checkSignificance } from './tools/significance-checker';
import { loadMCPTools, MCPToolConfig } from './mcp-loader';

const sessionAnalysisToolConfig: MCPToolConfig = {
  filesystem: true,
  git: true,
  shell: {
    enabled: true,
    allowedCommands: ['ls', 'cat', 'grep', 'wc', 'find', 'head', 'tail', 'pwd'],
    blockedCommands: ['rm', 'sudo', 'chmod', 'chown', 'mv', 'cp', 'dd', 'mkfs'],
  },
};

export async function runSessionAnalysisAgent(projectDir: string) {
  const agent = new FlashbackAgent();
  const { tools, cleanup } = await loadMCPTools(projectDir, sessionAnalysisToolConfig);
  try {
    const result = await agent.executeWithTemplate({
      projectDir,
      agentName: 'session-analysis',
      stepLimit: 5,
      tokenBudget: 200000,
      tools: {
        ...tools,
        sanitizeConversationLogs,
        checkSignificance,
      },
      templatePath: pathWithinAgents('session-analysis-agent.md'),
    });
    return result;
  } finally {
    await cleanup();
  }
}

function pathWithinAgents(name: string): string {
  return `agents/${name}`;
}


