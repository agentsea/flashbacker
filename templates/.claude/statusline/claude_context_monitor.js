#!/usr/bin/env node
"use strict";

// Claude Context Window Status Line Monitor
// Prints a single-line status with model, project, branch, and real token usage
// Based on the concept from @delexw's ctx_monitor.js (credit)

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const os = require("os");

function readAllStdin() {
  return new Promise((resolve) => {
    let data = "";
    try {
      if (process.stdin.isTTY) {
        return resolve("");
      }
    } catch (_) {}
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

function safeJSONParse(text) {
  try { return JSON.parse(text); } catch (_) { return undefined; }
}

function findGitRoot(startDir) {
  try {
    const root = execSync("git rev-parse --show-toplevel", { cwd: startDir, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    return root || startDir;
  } catch (_) { return startDir; }
}

function getGitBranch(cwd) {
  try { return execSync("git rev-parse --abbrev-ref HEAD", { cwd, stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch (_) { return "unknown"; }
}

function humanizeNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return String(n);
}

function colorize(text, pct) {
  const RESET = "\u001b[0m"; const GREEN = "\u001b[32m"; const YELLOW = "\u001b[33m"; const RED = "\u001b[31m";
  if (pct < 0.4) return `${GREEN}${text}${RESET}`;
  if (pct <= 0.75) return `${YELLOW}${text}${RESET}`;
  return `${RED}${text}${RESET}`;
}

function getClaudeContextWindow(model) {
  const m = (model || "").toLowerCase();
  if (m.includes("sonnet-4") || m.includes("claude-4") || m.includes("opus-4") || m.includes("[1m") || m.includes("1m token")) return 1_000_000;
  return 200_000;
}

function getModelLabel(model) {
  if (!model) return "Claude";
  const m = model.toLowerCase();
  if (m.includes("sonnet-4")) return "Claude Sonnet 4";
  if (m.includes("opus-4")) return "Claude Opus 4";
  if (m.includes("claude-4")) return "Claude 4";
  const match = m.match(/claude[-\s]?([0-9.]+[a-z-]*)/);
  if (match) return `Claude ${match[1]}`;
  return model.trim().replace(/^([a-z])/, (s) => s.toUpperCase());
}

function sumUsage(usage) {
  if (!usage || typeof usage !== "object") return 0;
  const v = (x) => (typeof x === "number" ? x : 0);
  return v(usage.input_tokens) + v(usage.output_tokens) + v(usage.cache_read_input_tokens) + v(usage.cache_creation_input_tokens);
}

function deepFindLatestUsage(obj) {
  let latest = undefined;
  const visit = (node) => {
    if (!node) return;
    if (Array.isArray(node)) { for (let i = node.length - 1; i >= 0; i--) visit(node[i]); return; }
    if (typeof node === "object") {
      if (Object.prototype.hasOwnProperty.call(node, "input_tokens") || Object.prototype.hasOwnProperty.call(node, "output_tokens") || Object.prototype.hasOwnProperty.call(node, "cache_read_input_tokens") || Object.prototype.hasOwnProperty.call(node, "cache_creation_input_tokens")) { latest = node; }
      if (node.usage && typeof node.usage === "object") { latest = node.usage; }
      const keys = Object.keys(node);
      for (let i = keys.length - 1; i >= 0; i--) visit(node[keys[i]]);
    }
  };
  visit(obj); return latest;
}

function readTranscriptAndExtractTokens(transcriptPath) {
  try {
    if (!transcriptPath || !fs.existsSync(transcriptPath)) return 0;
    const content = fs.readFileSync(transcriptPath, "utf8");
    let data = safeJSONParse(content);
    if (!data) {
      const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
      for (let i = lines.length - 1; i >= 0; i--) { const maybe = safeJSONParse(lines[i]); if (maybe) { data = maybe; break; } }
    }
    if (!data) return 0;
    const usage = deepFindLatestUsage(data); return sumUsage(usage);
  } catch (_) { return 0; }
}

function pathToClaudeProjectDir(projectPath) { const normalized = path.resolve(projectPath); return normalized.replace(/\//g, "-"); }

function findLatestJsonlForProject(cwd) {
  try {
    const projectsDir = path.join(os.homedir(), ".claude", "projects");
    const projDir = path.join(projectsDir, pathToClaudeProjectDir(cwd));
    if (!fs.existsSync(projDir)) return undefined;
    const files = fs.readdirSync(projDir).filter((f) => f.endsWith(".jsonl")).map((f) => ({ f, m: fs.statSync(path.join(projDir, f)).mtime.getTime() })).sort((a, b) => b.m - a.m);
    return files.length > 0 ? path.join(projDir, files[0].f) : undefined;
  } catch { return undefined; }
}

function readJsonlAndExtractTokens(jsonlPath) {
  try {
    if (!jsonlPath || !fs.existsSync(jsonlPath)) return 0;
    const content = fs.readFileSync(jsonlPath, "utf8");
    const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (let i = lines.length - 1; i >= 0; i--) { const data = safeJSONParse(lines[i]); if (!data) continue; const usage = deepFindLatestUsage(data); const tokens = sumUsage(usage); if (tokens > 0) return tokens; }
    return 0;
  } catch { return 0; }
}

function getFileMtimeMs(filePath) { try { return fs.statSync(filePath).mtime.getTime(); } catch { return 0; } }
function getStatePath(cwd) { return path.join(cwd, ".claude", "statusline", "state.json"); }
function readPreviousState(cwd) { try { const p = getStatePath(cwd); if (!fs.existsSync(p)) return undefined; const raw = fs.readFileSync(p, "utf8"); return safeJSONParse(raw); } catch { return undefined; } }
function writeCurrentState(cwd, state) { try { const p = getStatePath(cwd); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify({ ...state, ts: Date.now() }, null, 2)); } catch {} }

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
  const get = (obj, keys) => { for (const k of keys) { if (obj && obj[k] != null) return obj[k]; } return undefined; };
  const rawModel = get(input, ["model", "claudeModel", "activeModel"]);
  let model = "";
  if (typeof rawModel === "string") { model = rawModel; }
  else if (rawModel && typeof rawModel === "object") { model = rawModel.id || rawModel.display_name || ""; }
  const transcriptPath = get(input, ["transcriptPath", "transcript_path", "transcript"]);
  const workspace = get(input, ["workspace"]) || {};
  const cwd = workspace.current_dir || get(input, ["cwd", "workspace", "workspacePath"]) || process.cwd();
  const sessionId = get(input, ["session_id", "sessionId"]) || undefined;
  return { model, transcriptPath, cwd, sessionId };
}

function getSessionIdFromJsonlPath(p) { try { const base = path.basename(p || ""); return base.endsWith(".jsonl") ? base.slice(0, -6) : ""; } catch { return ""; } }

(async function main() {
  const stdinText = await readAllStdin();
  const input = safeJSONParse(stdinText) || {};
  const { model, transcriptPath, cwd, sessionId: stdinSessionId } = resolveInputFields(input);

  const gitRoot = findGitRoot(cwd);
  const projectName = path.basename(gitRoot);
  const branchName = getGitBranch(cwd);
  const contextWindow = getClaudeContextWindow(model);
  const prev = readPreviousState(cwd);

  // Determine current session id
  let currentSessionId = stdinSessionId || "";
  if (!currentSessionId) {
    const pathForId = transcriptPath && fs.existsSync(transcriptPath) ? transcriptPath : findLatestJsonlForProject(cwd);
    currentSessionId = getSessionIdFromJsonlPath(pathForId);
  }

  let tokens = readTranscriptAndExtractTokens(transcriptPath);
  if (tokens === 0 && (!transcriptPath || !fs.existsSync(transcriptPath))) {
    const fallbackJsonl = findLatestJsonlForProject(cwd);
    const fresh = fallbackJsonl && (Date.now() - getFileMtimeMs(fallbackJsonl) < 30 * 60 * 1000);
    if (fresh) tokens = readJsonlAndExtractTokens(fallbackJsonl);
  }

  let line;
  if (tokens > 0) {
    line = formatOutput({ model, projectName, branchName, tokens, contextWindow });
    writeCurrentState(cwd, { sessionId: currentSessionId, tokens, contextWindow, line });
  } else if (prev && prev.tokens > 0 && prev.line && (!currentSessionId || prev.sessionId === currentSessionId)) {
    // Reuse only if session matches (or session unknown)
    line = prev.line;
  } else {
    line = formatOutput({ model, projectName, branchName, tokens: 0, contextWindow });
  }

  process.stdout.write(line + "\n");
})().catch(() => {
  try {
    const cwd = process.cwd();
    const gitRoot = findGitRoot(cwd);
    const projectName = path.basename(gitRoot);
    const branchName = getGitBranch(cwd);
    process.stdout.write(`[Claude] 📁 ${projectName} | 🌿 ${branchName} | 🧠 0/200K (0.0%)\n`);
  } catch (_) {}
});


