import fs from 'fs-extra';
import path from 'path';
import { generateText, stepCountIs } from 'ai';
import { openai } from '@ai-sdk/openai';

export interface AgentResult {
  success: boolean;
  text?: string;
  error?: string;
  tokensUsed?: number;
  toolCalls?: unknown[];
}

export interface AgentTemplate {
  system: string;
  prompt: string;
}

export interface CostUsageLike {
  totalTokens?: number;
}

export interface AgentExecutionOptions {
  projectDir: string;
  agentName: string;
  stepLimit: number;
  tokenBudget?: number;
  tools?: Record<string, unknown>;
  templatePath: string; // relative within .claude/flashback/prompts/
}

export class FlashbackAgent {
  async readAgentTemplate(projectDir: string, relativePath: string): Promise<AgentTemplate> {
    const promptsRoot = path.join(projectDir, '.claude', 'flashback', 'prompts');
    const fullPath = path.join(promptsRoot, relativePath);
    const raw = await fs.readFile(fullPath, 'utf-8');
    // Simple parsing: first line as title (ignored), full file as system; prompt minimal
    return {
      system: raw,
      prompt: 'Execute the agent workflow as instructed by the system prompt.',
    };
  }

  async logAgentCost(projectDir: string, agentName: string, usage?: CostUsageLike, toolCallsCount?: number): Promise<void> {
    try {
      const logDir = path.join(projectDir, '.claude', 'flashback', 'log');
      await fs.ensureDir(logDir);
      const logPath = path.join(logDir, 'agents.log');
      const tokens = usage?.totalTokens ?? 0;
      const line = `${new Date().toISOString()} agent=${agentName} tokens=${tokens} toolCalls=${toolCallsCount ?? 0}`;
      await fs.appendFile(logPath, line + '\n');
    } catch {
      // best-effort logging
    }
  }

  async prepareStepCompression(messages: any[]): Promise<{ messages?: any[] }> {
    if (!Array.isArray(messages) || messages.length <= 20) return {};
    const early = messages.slice(0, 5);
    const recent = messages.slice(-10);
    // Basic naive summary token to inform the model; real summarization can be added later
    const summary = 'Previous context summarized for brevity.';
    return {
      messages: [
        ...early,
        { role: 'system', content: `Previous context: ${summary}` },
        ...recent,
      ],
    };
  }

  async executeWithTemplate(options: AgentExecutionOptions): Promise<AgentResult> {
    const { projectDir, agentName, stepLimit, tokenBudget = 200000, tools = {}, templatePath } = options;
    try {
      const template = await this.readAgentTemplate(projectDir, templatePath);

      const result: any = await generateText({
        model: openai('gpt-5-nano'),
        tools,
        stopWhen: stepCountIs(stepLimit),
        system: template.system,
        prompt: template.prompt,
        prepareStep: async ({ messages }: any) => {
          return this.prepareStepCompression(messages);
        },
        onStepFinish: async ({ usage, toolCalls }: any) => {
          await this.logAgentCost(projectDir, agentName, usage, toolCalls?.length ?? 0);
          if ((usage?.totalTokens ?? 0) > tokenBudget) {
            throw new Error(`Agent ${agentName} exceeded token budget: ${usage?.totalTokens}`);
          }
        },
      });

      return {
        success: true,
        text: result.text,
        toolCalls: result.steps?.flatMap((s: any) => s.toolCalls) ?? [],
        tokensUsed: result.usage?.totalTokens,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}


