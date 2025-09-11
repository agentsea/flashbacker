#!/usr/bin/env node
"use strict";

// Claude Context Window Status Line Monitor
// Prints a single-line status with model, project, branch, and real token usage
// Based on the concept from @delexw's ctx_monitor.js (credit)

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function readAllStdin() {
  return new Promise((resolve) => {
    let data = "";
    try {
      if (process.stdin.isTTY) {
        return resolve("");
      }
    } catch (_) {
      // ignore
    }
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

function safeJSONParse(text) {
  try {
    return JSON.parse(text);
  } catch (_) {
    return undefined;
  }
}

function findGitRoot(startDir) {
  try {
    const root = execSync("git rev-parse --show-toplevel", { cwd: startDir, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return root || startDir;
  } catch (_) {
    return startDir;
  }
}

function getGitBranch(cwd) {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return branch;
  } catch (_) {
    return "unknown";
  }
}

function humanizeNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return String(n);
}

function colorize(text, pct) {
  // Green < 40%, Yellow 40–75%, Red > 75%
  const RESET = "\u001b[0m";
  const GREEN = "\u001b[32m";
  const YELLOW = "\u001b[33m";
  const RED = "\u001b[31m";
  if (pct < 0.4) return `${GREEN}${text}${RESET}`;
  if (pct <= 0.75) return `${YELLOW}${text}${RESET}`;
  return `${RED}${text}${RESET}`;
}

function getClaudeContextWindow(model) {
  const m = (model || "").toLowerCase();
  if (m.includes("sonnet-4") || m.includes("claude-4")) return 1_000_000;
  return 200_000;
}

function getModelLabel(model) {
  if (!model) return "Claude";
  const m = model.toLowerCase();
  if (m.includes("sonnet-4")) return "Claude Sonnet 4";
  if (m.includes("claude-4")) return "Claude 4";
  const match = m.match(/claude[-\s]?([0-9.]+[a-z-]*)/);
  if (match) return `Claude ${match[1]}`;
  return "Claude";
}

function sumUsage(usage) {
  if (!usage || typeof usage !== "object") return 0;
  const v = (x) => (typeof x === "number" ? x : 0);
  return (
    v(usage.input_tokens) +
    v(usage.output_tokens) +
    v(usage.cache_read_input_tokens) +
    v(usage.cache_creation_input_tokens)
  );
}

function deepFindLatestUsage(obj) {
  // Traverse object/array depth-first; keep the last seen usage-like object
  let latest = undefined;
  const visit = (node) => {
    if (!node) return;
    if (Array.isArray(node)) {
      for (let i = node.length - 1; i >= 0; i--) visit(node[i]);
      return;
    }
    if (typeof node === "object") {
      // direct usage object
      if (
        Object.prototype.hasOwnProperty.call(node, "input_tokens") ||
        Object.prototype.hasOwnProperty.call(node, "output_tokens") ||
        Object.prototype.hasOwnProperty.call(node, "cache_read_input_tokens") ||
        Object.prototype.hasOwnProperty.call(node, "cache_creation_input_tokens")
      ) {
        latest = node;
      }
      // common transcript shape: messages with role/use
      if (node.usage && typeof node.usage === "object") {
        latest = node.usage;
      }
      const keys = Object.keys(node);
      for (let i = keys.length - 1; i >= 0; i--) {
        visit(node[keys[i]]);
      }
    }
  };
  visit(obj);
  return latest;
}

function readTranscriptAndExtractTokens(transcriptPath) {
  try {
    if (!transcriptPath || !fs.existsSync(transcriptPath)) return 0;
    const content = fs.readFileSync(transcriptPath, "utf8");
    // Try parse as JSON
    let data = safeJSONParse(content);
    if (!data) {
      // Try JSONL: take last non-empty line
      const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
      for (let i = lines.length - 1; i >= 0; i--) {
        const maybe = safeJSONParse(lines[i]);
        if (maybe) {
          data = maybe;
          break;
        }
      }
    }
    if (!data) return 0;
    const usage = deepFindLatestUsage(data);
    return sumUsage(usage);
  } catch (_) {
    return 0;
  }
}

function formatOutput({ model, projectName, branchName, tokens, contextWindow }) {
  const modelLabel = getModelLabel(model);
  const pct = contextWindow > 0 ? tokens / contextWindow : 0;
  const pctText = `${(pct * 100).toFixed(1)}%`;
  const tokensText = `${humanizeNumber(tokens)}/${humanizeNumber(contextWindow)}`;
  const brain = `🧠 ${tokensText} (${pctText})`;
  const coloredBrain = colorize(brain, pct);
  return `[${modelLabel}] 📁 ${projectName} | 🌿 ${branchName} | ${coloredBrain}`;
}

function resolveInputFields(input) {
  const get = (obj, keys) => {
    for (const k of keys) {
      if (obj && obj[k] != null) return obj[k];
    }
    return undefined;
  };
  const model = get(input, ["model", "claudeModel", "activeModel"]);
  const transcriptPath = get(input, ["transcriptPath", "transcript_path", "transcript"]);
  const cwd = get(input, ["cwd", "workspace", "workspacePath"]) || process.cwd();
  return { model, transcriptPath, cwd };
}

(async function main() {
  const stdinText = await readAllStdin();
  const input = safeJSONParse(stdinText) || {};
  const { model, transcriptPath, cwd } = resolveInputFields(input);

  const gitRoot = findGitRoot(cwd);
  const projectName = path.basename(gitRoot);
  const branchName = getGitBranch(cwd);
  const contextWindow = getClaudeContextWindow(model);
  const tokens = readTranscriptAndExtractTokens(transcriptPath);

  const line = formatOutput({ model, projectName, branchName, tokens, contextWindow });
  process.stdout.write(line + "\n");
})().catch((err) => {
  // Fail gracefully with minimal info
  try {
    const cwd = process.cwd();
    const gitRoot = findGitRoot(cwd);
    const projectName = path.basename(gitRoot);
    const branchName = getGitBranch(cwd);
    process.stdout.write(`[Claude] 📁 ${projectName} | 🌿 ${branchName} | 🧠 0/200K (0.0%)\n`);
  } catch (_) {
    // As a last resort, print nothing
  }
});


