#!/usr/bin/env node
/* Manual sanitizer runner (tests/manual). */
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
// Simple ANSI color helpers (avoid ESM import issues with chalk@5)
const color = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  yellowBold: (s) => `\x1b[33;1m${s}\x1b[0m`,
  magentaBold: (s) => `\x1b[35;1m${s}\x1b[0m`,
  greenBold: (s) => `\x1b[32;1m${s}\x1b[0m`,
  white: (s) => `\x1b[37m${s}\x1b[0m`,
  whiteBold: (s) => `\x1b[37;1m${s}\x1b[0m`,
};

const { sanitizeConversationLogsFull } = require('../../lib/agents/tools/logs/sanitize-full.js');
const { sanitizeConversationLogsTruncated } = require('../../lib/agents/tools/logs/sanitize-truncated.js');
const { sanitizeConversationBySections } = require('../../lib/agents/tools/logs/sections.js');
const { getConversationContextSlice } = require('../../lib/agents/tools/logs/slice.js');
const { grepConversationLogs } = require('../../lib/agents/tools/logs/grep.js');
const { getJSONLFiles } = require('../../lib/utils/conversation-logs.js');

function mb(n) { return (n / (1024 * 1024)).toFixed(2); }
function tokensEstimate(s) { return Math.ceil((s?.length || 0) / 4); }

function extractFullMessage(entry) {
  if (entry.type === 'user' && entry.message?.content) {
    if (typeof entry.message.content === 'string') return `USER: ${entry.message.content}`;
    if (Array.isArray(entry.message.content)) {
      const text = entry.message.content.map(c => c?.text ?? (typeof c === 'string' ? c : JSON.stringify(c))).join(' ');
      return `USER: ${text}`;
    }
    return `USER: ${JSON.stringify(entry.message.content)}`;
  }
  if (entry.type === 'assistant' && entry.message?.content) {
    const content = Array.isArray(entry.message.content) ? entry.message.content : [entry.message.content];
    const out = [];
    for (const item of content) {
      if (typeof item === 'string') out.push(`ASSISTANT: ${item}`);
      else if (item?.type === 'tool_use') out.push(`TOOL_USE: ${item.name} input=${JSON.stringify(item.input)}`);
      else if (item?.text) out.push(`ASSISTANT: ${item.text}`);
    }
    if (out.length > 0) return out.join('\n');
  }
  return null;
}

async function readJsonlLines(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n').filter(Boolean);
  return { content, lines };
}

async function buildOriginalExtractedText(currentPath, prevPath, currentName, prevName) {
  const segs = [];
  if (currentPath) {
    segs.push(`# Current Session (${currentName})`);
    const { lines } = await readJsonlLines(currentPath);
    for (const line of lines) {
      try { const e = JSON.parse(line); const m = extractFullMessage(e); if (m) segs.push(m); } catch {}
    }
  }
  if (prevPath) {
    segs.push('', `# Previous Session (${prevName})`);
    const { lines } = await readJsonlLines(prevPath);
    for (const line of lines) {
      try { const e = JSON.parse(line); const m = extractFullMessage(e); if (m) segs.push(m); } catch {}
    }
  }
  return segs.join('\n\n');
}

async function countTokensViaEmbeddingsChunked(text, maxChunkChars = 12000) {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!text || text.length < 1) return 0;
  const { openai } = require('@ai-sdk/openai');
  const { embed } = require('ai');
  let total = 0;
  for (let i = 0; i < text.length; i += maxChunkChars) {
    const chunk = text.slice(i, i + maxChunkChars);
    try {
      const { usage } = await embed({
        model: openai.textEmbeddingModel('text-embedding-3-small'),
        value: chunk,
      });
      total += usage?.tokens || 0;
    } catch {
      return null;
    }
  }
  return total;
}

async function main() {
  // Simple arg parsing
  const args = process.argv.slice(2);
  const projectDir = args.find(a => !a.startsWith('--')) ? path.resolve(args.find(a => !a.startsWith('--'))) : process.cwd();
  const getFlag = (name, def) => {
    const idx = args.findIndex(a => a === `--${name}`);
    if (idx === -1) return def;
    const val = args[idx + 1];
    if (!val || val.startsWith('--')) return true;
    return val;
  };
  const mode = getFlag('mode', 'full'); // full|truncated|sections|slice|grep
  const showTail = getFlag('tail', false);
  const noRaw = Boolean(getFlag('noRaw', false));
  const tailLines = Number(getFlag('tailLines', '100'));
  const memStart = process.memoryUsage();
  const files = await getJSONLFiles(projectDir);
  const curr = files[0];
  const prev = files[1];
  if (!curr && !prev) {
    console.log('No JSONL logs found for project:', projectDir);
    process.exit(0);
  }

  const currBytes = curr ? (await fs.stat(curr.path)).size : 0;
  const prevBytes = prev ? (await fs.stat(prev.path)).size : 0;
  const { content: currContent = '', lines: currLines = [] } = curr ? await readJsonlLines(curr.path) : { content: '', lines: [] };
  const { content: prevContent = '', lines: prevLines = [] } = prev ? await readJsonlLines(prev.path) : { content: '', lines: [] };

  const originalStitched = await buildOriginalExtractedText(curr?.path, prev?.path, curr?.name?.replace('.jsonl',''), prev?.name?.replace('.jsonl',''));
  const originalBytes = Buffer.byteLength(originalStitched, 'utf-8');
  const originalTokenEst = tokensEstimate(originalStitched);
  const originalProviderTokens = await countTokensViaEmbeddingsChunked(originalStitched);

  let result;
  if (mode === 'truncated') {
    const targetTokens = Number(getFlag('targetTokens', '180000'));
    const strategy = String(getFlag('strategy', 'perMessageCap'));
    result = await sanitizeConversationLogsTruncated.execute({ projectDir, targetTokens, strategy });
  } else if (mode === 'sections') {
    const secs = String(getFlag('sections', 'Project Memory,Current Working Plan,Recent Conversation Log'))
      .split(',').map(s => s.trim()).filter(Boolean);
    const useRegex = Boolean(getFlag('useRegex', false));
    const windowLines = Number(getFlag('windowLines', '20'));
    result = await sanitizeConversationBySections.execute({ projectDir, sections: secs, useRegex, windowLines });
  } else if (mode === 'slice') {
    const index = Number(getFlag('index', '100'));
    const before = Number(getFlag('before', '5'));
    const after = Number(getFlag('after', '5'));
    result = await getConversationContextSlice.execute({ projectDir, messageIndex: index, windowBefore: before, windowAfter: after });
  } else if (mode === 'grep') {
    const pattern = String(getFlag('pattern', 'TODO'));
    const flags = String(getFlag('flags', 'i'));
    const before = Number(getFlag('before', '2'));
    const after = Number(getFlag('after', '2'));
    const max = Number(getFlag('max', '50'));
    result = await grepConversationLogs.execute({ projectDir, pattern, flags, messagesBefore: before, messagesAfter: after, maxMatches: max });
  } else {
    result = await sanitizeConversationLogsFull.execute({ projectDir });
  }

  let cleanedText = '';
  if (mode === 'sections') {
    const sectionsOut = result.sections || {};
    cleanedText = Object.entries(sectionsOut).map(([k, v]) => `## ${k}\n${v.text}`).join('\n\n');
  } else if (mode === 'slice') {
    cleanedText = result.sliceText || '';
  } else if (mode === 'grep') {
    cleanedText = (result.matches || []).map(m => m.text).join('\n\n---\n\n');
  } else {
    cleanedText = result.text || '';
  }

  const cleanedBytes = Buffer.byteLength(cleanedText, 'utf-8');
  const cleanedLines = cleanedText ? cleanedText.split('\n').length : 0;
  const cleanedTokenEst = tokensEstimate(cleanedText);
  const cleanedProviderTokens = await countTokensViaEmbeddingsChunked(cleanedText);

  const memEnd = process.memoryUsage();

  const topBlocksRaw = (result.meta && result.meta.topRepeatedBlocks) || [];
  const topBlocks = topBlocksRaw.slice(0, 5).map(b => ({ count: b.count, preview: String(b.preview || '').slice(0, 100) }));
  const sectionCounts = (result.meta && result.meta.sectionDedupCounts) || {};

  const report = {
    projectDir,
    files: {
      current: curr ? { path: curr.path, bytes: currBytes, jsonlLines: currLines.length } : null,
      previous: prev ? { path: prev.path, bytes: prevBytes, jsonlLines: prevLines.length } : null,
    },
    extracted: {
      original: {
        bytes: originalBytes,
        lines: originalStitched.split('\n').length,
        tokensEstimate: originalTokenEst,
        providerTokens: originalProviderTokens,
      },
      cleaned: {
        bytes: cleanedBytes,
        lines: cleanedLines,
        tokensEstimate: cleanedTokenEst,
        providerTokens: cleanedProviderTokens,
      },
      reduction: {
        bytesPercent: originalBytes ? Math.round(((originalBytes - cleanedBytes) / originalBytes) * 100) : 0,
        linesPercent: (originalStitched ? Math.round(((originalStitched.split('\n').length - cleanedLines) / originalStitched.split('\n').length) * 100) : 0),
        tokensEstimatePercent: originalTokenEst ? Math.round(((originalTokenEst - cleanedTokenEst) / originalTokenEst) * 100) : 0,
        providerTokensPercent: (originalProviderTokens && cleanedProviderTokens) ? Math.round(((originalProviderTokens - cleanedProviderTokens) / originalProviderTokens) * 100) : null,
      },
    },
    memoryMB: {
      rssStart: Number(mb(memStart.rss)),
      rssEnd: Number(mb(memEnd.rss)),
      delta: Number((mb(memEnd.rss - memStart.rss)))
    },
    dedupInsights: {
      topRepeatedBlocks: topBlocks,
      sectionDedupCounts: sectionCounts,
    },
    sectionsInfo: mode === 'sections' ? {
      detectedOrder: result.detectedOrder || [],
      detectedHeadings: result.detectedHeadings || [],
      notFound: result.notFound || [],
    } : undefined
  };

  console.log(JSON.stringify(report, null, 2));
  
  // Show tail comparison if requested
  if (showTail) {
    console.log(color.cyan('\n--- TAIL COMPARISON ---'));

    const originalLines = originalStitched.split('\n');
    const cleanedTailLines = cleanedText.split('\n');
    const showLines = tailLines || 100;

    // Raw JSONL tails for direct inspection
    const prettyPrintJsonl = (lines) => {
      const tail = lines.slice(-showLines);
      for (const line of tail) {
        try {
          const obj = JSON.parse(line);
          console.log(JSON.stringify(obj, null, 2));
        } catch {
          console.log(line);
        }
        console.log('');
      }
    };

    if (!noRaw) {
      if (curr) {
        console.log(color.yellowBold(`\n=== RAW JSONL CURRENT: ${curr.path} (last ${showLines} lines) ===`));
        prettyPrintJsonl(currLines);
      }
      if (prev) {
        console.log(color.yellowBold(`\n=== RAW JSONL PREVIOUS: ${prev.path} (last ${showLines} lines) ===`));
        prettyPrintJsonl(prevLines);
      }
    }

    // Extracted message tails (pre/post sanitation)
    console.log(color.magentaBold(`\n=== EXTRACTED ORIGINAL (stitched from current: ${curr ? curr.path : 'none'}, previous: ${prev ? prev.path : 'none'}) (last ${showLines} lines) ===`));
    console.log(originalLines.slice(-showLines).join('\n'));

    console.log(color.greenBold(`\n=== EXTRACTED NEW SANITIZED (sanitize-full.ts) (last ${showLines} lines) ===`));
    console.log(cleanedTailLines.slice(-showLines).join('\n'));

    console.log(color.cyan(`\n=== COMPARISON SUMMARY ===`));
    console.log(color.white(`Original extracted lines: `) + color.whiteBold(originalLines.length));
    console.log(color.white(`Sanitized extracted lines: `) + color.whiteBold(cleanedTailLines.length));
    console.log(color.white(`Lines removed: `) + color.whiteBold(originalLines.length - cleanedTailLines.length));
    console.log(color.white(`Reduction: `) + color.whiteBold(`${Math.round(((originalLines.length - cleanedTailLines.length) / originalLines.length) * 100)}%`));
  }
  // Always print final condensed summary (full mode)
  console.log(color.cyan(`\n=== FINAL SUMMARY (FULL) ===`));
  console.log(color.white(`Original tokens(est): `) + color.whiteBold(report.extracted.original.tokensEstimate));
  console.log(color.white(`Sanitized tokens(est): `) + color.whiteBold(report.extracted.cleaned.tokensEstimate) + color.white(`  (reduction `) + color.whiteBold(`${report.extracted.reduction.tokensEstimatePercent}%`) + color.white(`)`));
  console.log(color.white(`Files: current=`) + color.whiteBold(report.files.current?.path || 'none') + color.white(` previous=`) + color.whiteBold(report.files.previous?.path || 'none'));
}

main().catch(err => {
  console.error('sanitize-real failed:', err?.message || String(err));
  process.exit(1);
});


