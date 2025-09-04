#!/usr/bin/env node
/* Manual sanitizer runner (tests/manual). */
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

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
  } else if (mode === 'legacy') {
    const legacy = require('../../lib/agents/tools/conversation-log-sanitizer.js');
    result = await legacy.sanitizeConversationLogs.execute({ projectDir, cleanupLevel: 'aggressive', regexPrune: true });
  } else if (mode === 'compare') {
    const legacy = require('../../lib/agents/tools/conversation-log-sanitizer.js');
    const fullRes = await sanitizeConversationLogsFull.execute({ projectDir });
    const legacyRes = await legacy.sanitizeConversationLogs.execute({ projectDir, cleanupLevel: 'aggressive', regexPrune: true });

    const cleanedFull = fullRes.text || '';
    const cleanedLegacy = legacyRes.text || '';

    const cleanedFullBytes = Buffer.byteLength(cleanedFull, 'utf-8');
    const cleanedLegacyBytes = Buffer.byteLength(cleanedLegacy, 'utf-8');
    const cleanedFullLines = cleanedFull ? cleanedFull.split('\n').length : 0;
    const cleanedLegacyLines = cleanedLegacy ? cleanedLegacy.split('\n').length : 0;
    const cleanedFullTokenEst = tokensEstimate(cleanedFull);
    const cleanedLegacyTokenEst = tokensEstimate(cleanedLegacy);
    const cleanedFullProviderTokens = await countTokensViaEmbeddingsChunked(cleanedFull);
    const cleanedLegacyProviderTokens = await countTokensViaEmbeddingsChunked(cleanedLegacy);

    const memEnd = process.memoryUsage();

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
        full: {
          bytes: cleanedFullBytes,
          lines: cleanedFullLines,
          tokensEstimate: cleanedFullTokenEst,
          providerTokens: cleanedFullProviderTokens,
          reduction: {
            bytesPercent: originalBytes ? Math.round(((originalBytes - cleanedFullBytes) / originalBytes) * 100) : 0,
            linesPercent: (originalStitched ? Math.round(((originalStitched.split('\n').length - cleanedFullLines) / originalStitched.split('\n').length) * 100) : 0),
            tokensEstimatePercent: originalTokenEst ? Math.round(((originalTokenEst - cleanedFullTokenEst) / originalTokenEst) * 100) : 0,
            providerTokensPercent: (originalProviderTokens && cleanedFullProviderTokens) ? Math.round(((originalProviderTokens - cleanedFullProviderTokens) / originalProviderTokens) * 100) : null,
          },
          meta: fullRes.meta || null,
        },
        legacy: {
          bytes: cleanedLegacyBytes,
          lines: cleanedLegacyLines,
          tokensEstimate: cleanedLegacyTokenEst,
          providerTokens: cleanedLegacyProviderTokens,
          reduction: {
            bytesPercent: originalBytes ? Math.round(((originalBytes - cleanedLegacyBytes) / originalBytes) * 100) : 0,
            linesPercent: (originalStitched ? Math.round(((originalStitched.split('\n').length - cleanedLegacyLines) / originalStitched.split('\n').length) * 100) : 0),
            tokensEstimatePercent: originalTokenEst ? Math.round(((originalTokenEst - cleanedLegacyTokenEst) / originalTokenEst) * 100) : 0,
            providerTokensPercent: (originalProviderTokens && cleanedLegacyProviderTokens) ? Math.round(((originalProviderTokens - cleanedLegacyProviderTokens) / originalProviderTokens) * 100) : null,
          },
          meta: legacyRes.meta || null,
        }
      },
      memoryMB: {
        rssStart: Number(mb(memStart.rss)),
        rssEnd: Number(mb(memEnd.rss)),
        delta: Number((mb(memEnd.rss - memStart.rss)))
      }
    };
    console.log(JSON.stringify(report, null, 2));
    process.exit(0);
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
    console.log('\n--- TAIL COMPARISON ---');
    
    const originalLines = originalStitched.split('\n');
    const cleanedLines = cleanedText.split('\n');
    const showLines = tailLines || 100;
    
    console.log(`\n=== ORIGINAL (last ${showLines} lines) ===`);
    console.log(originalLines.slice(-showLines).join('\n'));
    
    console.log(`\n=== SANITIZED (last ${showLines} lines) ===`);
    console.log(cleanedLines.slice(-showLines).join('\n'));
    
    console.log(`\n=== COMPARISON SUMMARY ===`);
    console.log(`Original lines: ${originalLines.length}`);
    console.log(`Sanitized lines: ${cleanedLines.length}`);
    console.log(`Lines removed: ${originalLines.length - cleanedLines.length}`);
    console.log(`Reduction: ${Math.round(((originalLines.length - cleanedLines.length) / originalLines.length) * 100)}%`);
  }
}

main().catch(err => {
  console.error('sanitize-real failed:', err?.message || String(err));
  process.exit(1);
});


