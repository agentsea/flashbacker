import { experimental_createMCPClient } from 'ai';

type ToolSet = Record<string, unknown>;

export interface ShellToolConfig {
  enabled?: boolean;
  allowedCommands?: string[];
  blockedCommands?: string[];
}

export interface MCPToolConfig {
  filesystem?: boolean;
  git?: boolean;
  shell?: ShellToolConfig;
}

export const DEFAULT_MCP_CONFIG: MCPToolConfig = {
  filesystem: true,
  git: false,
  shell: {
    enabled: false,
    allowedCommands: ['ls', 'cat', 'grep', 'wc', 'find', 'head', 'tail', 'pwd'],
    blockedCommands: ['rm', 'sudo', 'chmod', 'chown', 'mv', 'cp', 'dd', 'mkfs'],
  },
};

function calculateAllowedCommands(cfg?: ShellToolConfig): string[] {
  const defaults = DEFAULT_MCP_CONFIG.shell!;
  const allowed = new Set([...(cfg?.allowedCommands ?? defaults.allowedCommands!)]);
  const blocked = new Set([...(cfg?.blockedCommands ?? defaults.blockedCommands!)]);
  for (const b of blocked) allowed.delete(b);
  return Array.from(allowed);
}

export interface LoadedMCPTools {
  tools: ToolSet;
  cleanup: () => Promise<void>;
}

export async function loadMCPTools(
  projectDir: string,
  config: MCPToolConfig = DEFAULT_MCP_CONFIG,
): Promise<LoadedMCPTools> {
  const mcpClients: Array<{ close: () => Promise<void>; tools: () => Promise<ToolSet> }> = [] as any;
  const tools: ToolSet = {};

  // Filesystem (project-root sandbox)
  if (config.filesystem) {
    const fsClient: any = await experimental_createMCPClient({
      transport: {
        type: 'stdio',
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-filesystem', projectDir],
      },
    } as any);
    mcpClients.push(fsClient);
    Object.assign(tools, await fsClient.tools());
  }

  // Git (repo-scoped)
  if (config.git) {
    const gitClient: any = await experimental_createMCPClient({
      transport: {
        type: 'stdio',
        command: 'uvx',
        args: ['mcp-server-git', '--repository', projectDir],
      },
    } as any);
    mcpClients.push(gitClient);
    Object.assign(tools, await gitClient.tools());
  }

  // Shell (whitelisted, project working directory)
  if (config.shell?.enabled) {
    const allowed = calculateAllowedCommands(config.shell);
    const shellClient: any = await experimental_createMCPClient({
      transport: {
        type: 'stdio',
        command: 'uvx',
        args: [
          'mcp-shell-server',
          '--allowed-commands',
          allowed.join(','),
          '--working-directory',
          projectDir,
        ],
      },
    } as any);
    mcpClients.push(shellClient);
    Object.assign(tools, await shellClient.tools());
  }

  return {
    tools,
    cleanup: async () => {
      await Promise.all(mcpClients.map(c => c.close()))
        .catch(() => Promise.resolve());
    },
  };
}


