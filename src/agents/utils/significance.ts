import fs from 'fs-extra';
import path from 'path';
import { getJSONLFiles } from '../../utils/conversation-logs';

export interface SignificanceGateOptions {
  minMessages?: number; // default 5
  minElapsedMs?: number; // default 30m
  minBytesDelta?: number; // default 4096
  keywords?: string[]; // optional signal words (e.g., 'commit', 'error')
}

interface LastRunState {
  lastRunAtMs: number;
  files: Record<string, { lines: number; bytes: number; mtimeMs: number }>;
}

function getStatePath(projectDir: string): string {
  return path.join(projectDir, '.claude', 'flashback', 'state', 'session-analysis.json');
}

async function readLastRunState(projectDir: string): Promise<LastRunState | null> {
  try {
    const p = getStatePath(projectDir);
    const raw = await fs.readFile(p, 'utf-8');
    return JSON.parse(raw) as LastRunState;
  } catch {
    return null;
  }
}

async function writeLastRunState(projectDir: string, state: LastRunState): Promise<void> {
  const p = getStatePath(projectDir);
  await fs.ensureDir(path.dirname(p));
  await fs.writeFile(p, JSON.stringify(state, null, 2));
}

async function countFileLines(filePath: string): Promise<number> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content.split('\n').filter(Boolean).length;
  } catch {
    return 0;
  }
}

export async function shouldRunSessionAnalysis(
  projectDir: string,
  opts: SignificanceGateOptions = {}
): Promise<{ shouldRun: boolean; reason: string; stats: any; updateState: () => Promise<void> }> {
  const { minMessages = 5, minElapsedMs = 30 * 60 * 1000, minBytesDelta = 4096, keywords = [] } = opts;

  const files = await getJSONLFiles(projectDir);
  const latest = files[0];
  const prev = files[1];
  const now = Date.now();
  const last = (await readLastRunState(projectDir)) || { lastRunAtMs: 0, files: {} };

  let latestStats = { lines: 0, bytes: 0, mtimeMs: 0 };
  let prevStats = { lines: 0, bytes: 0, mtimeMs: 0 };

  if (latest) {
    const stat = await fs.stat(latest.path);
    latestStats.bytes = stat.size;
    latestStats.mtimeMs = stat.mtimeMs;
    latestStats.lines = await countFileLines(latest.path);
  }
  if (prev) {
    const stat = await fs.stat(prev.path);
    prevStats.bytes = stat.size;
    prevStats.mtimeMs = stat.mtimeMs;
    prevStats.lines = await countFileLines(prev.path);
  }

  const lastLatest = latest ? last.files[latest.path] : undefined;
  const bytesDelta = latest && lastLatest ? latestStats.bytes - lastLatest.bytes : latestStats.bytes;
  const newMessages = latest && lastLatest ? Math.max(0, latestStats.lines - lastLatest.lines) : latestStats.lines;
  const elapsed = now - (last.lastRunAtMs || 0);

  let keywordHit = false;
  if (keywords.length && latest) {
    try {
      const content = await fs.readFile(latest.path, 'utf-8');
      const tail = content.split('\n').slice(-Math.max(50, minMessages * 2)).join('\n');
      keywordHit = keywords.some(k => new RegExp(k, 'i').test(tail));
    } catch {}
  }

  const enoughMessages = newMessages >= minMessages;
  const enoughElapsed = elapsed >= minElapsedMs;
  const enoughBytes = bytesDelta >= minBytesDelta;
  const shouldRun = (enoughMessages && enoughElapsed) || keywordHit || (enoughBytes && enoughElapsed);

  const reason = shouldRun
    ? `run: newMsgs=${newMessages} bytesΔ=${bytesDelta} elapsedMs=${elapsed} keywordHit=${keywordHit}`
    : `skip: newMsgs=${newMessages} (<${minMessages}) bytesΔ=${bytesDelta} (<${minBytesDelta}) elapsedMs=${elapsed} (<${minElapsedMs}) keywordHit=${keywordHit}`;

  const updateState = async () => {
    const next: LastRunState = {
      lastRunAtMs: now,
      files: {
        ...(last.files || {}),
        ...(latest ? { [latest.path]: latestStats } : {}),
        ...(prev ? { [prev.path]: prevStats } : {}),
      },
    };
    await writeLastRunState(projectDir, next);
  };

  const stats = {
    latest: latest?.path || null,
    prev: prev?.path || null,
    newMessages,
    bytesDelta,
    elapsedMs: elapsed,
    keywordHit,
  };

  return { shouldRun, reason, stats, updateState };
}


