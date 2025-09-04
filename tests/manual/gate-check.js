#!/usr/bin/env node
/* Manual significance gate runner */
const path = require('path');
const os = require('os');

// Simple ANSI colors (no deps)
const color = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  yellowBold: (s) => `\x1b[33;1m${s}\x1b[0m`,
  greenBold: (s) => `\x1b[32;1m${s}\x1b[0m`,
  redBold: (s) => `\x1b[31;1m${s}\x1b[0m`,
  whiteBold: (s) => `\x1b[37;1m${s}\x1b[0m`,
};

function parseArgs(argv) {
  const args = argv.slice(2);
  const first = args.find(a => !a.startsWith('--'));
  if (!first) {
    console.error('Usage: node tests/manual/gate-check.js <projectDir> [--minMessages 5] [--minElapsedMs 1800000] [--minBytesDelta 4096] [--keywords "error,commit"] [--update] [--json]');
    process.exit(2);
  }
  const projectDir = path.resolve(first);
  const getFlag = (name, def) => {
    const idx = args.findIndex(a => a === `--${name}`);
    if (idx === -1) return def;
    const val = args[idx + 1];
    if (!val || val.startsWith('--')) return true;
    return val;
  };
  const minMessages = Number(getFlag('minMessages', '5'));
  const minElapsedMs = Number(getFlag('minElapsedMs', String(30 * 60 * 1000)));
  const minBytesDelta = Number(getFlag('minBytesDelta', '4096'));
  const keywordsRaw = String(getFlag('keywords', ''));
  const keywords = keywordsRaw ? keywordsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
  const update = Boolean(getFlag('update', false));
  const asJson = Boolean(getFlag('json', false));
  return { projectDir, minMessages, minElapsedMs, minBytesDelta, keywords, update, asJson };
}

async function main() {
  const { projectDir, minMessages, minElapsedMs, minBytesDelta, keywords, update, asJson } = parseArgs(process.argv);
  // Use compiled output
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { shouldRunSessionAnalysis } = require('../../lib/agents/utils/significance.js');

  const { shouldRun, reason, stats, updateState } = await shouldRunSessionAnalysis(projectDir, {
    minMessages,
    minElapsedMs,
    minBytesDelta,
    keywords,
  });

  const latestName = stats.latest ? path.basename(stats.latest) : 'none';
  const out = {
    projectDir,
    latestLog: stats.latest,
    latestName,
    previousLog: stats.prev,
    shouldRun,
    reason,
    metrics: {
      newMessages: stats.newMessages,
      bytesDelta: stats.bytesDelta,
      elapsedMs: stats.elapsedMs,
      keywordHit: stats.keywordHit,
    },
  };

  if (update) {
    await updateState().catch(() => {});
  }

  if (asJson) {
    console.log(JSON.stringify(out, null, 2));
    return;
  }

  console.log(color.cyan('\n=== SIGNIFICANCE GATE REPORT ==='));
  console.log('Project:      ', color.whiteBold(projectDir));
  console.log('Latest log:   ', stats.latest || 'none');
  console.log('Previous log: ', stats.prev || 'none');
  console.log('Should run:   ', shouldRun ? color.greenBold('YES') : color.redBold('NO'));
  console.log('Reason:       ', reason);
  console.log('Metrics:      ', `newMessages=${stats.newMessages} bytesDelta=${stats.bytesDelta} elapsedMs=${stats.elapsedMs} keywordHit=${stats.keywordHit}`);
  console.log(color.yellowBold('\nTip:') + ' pass --update to persist state after this check; use --json for machine-readable output.');
}

main().catch(err => { console.error('gate-check failed:', err?.message || String(err)); process.exit(1); });


