import fs from 'fs-extra';
import path from 'path';
import { discoverProjects } from './project-scanner';
import { getJSONLFiles } from '../utils/conversation-logs';
import { getFlashbackConfig } from '../utils/config';
import { rotateMemoryFile } from '../utils/memory-rotation';
import { shouldRunSessionAnalysis } from '../agents/utils/significance';

interface ProjectState {
  lastActivityTimestampMs: number | null;
  isActive: boolean;
}

async function getActivityTimestampMs(projectDir: string): Promise<number | null> {
  try {
    const files = await getJSONLFiles(projectDir);
    let latest = 0;
    for (const file of files) {
      const stats = await fs.stat(file.path);
      latest = Math.max(latest, stats.mtimeMs);
    }
    return latest === 0 ? null : latest;
  } catch {
    return null;
  }
}

async function getConfig(projectDir: string): Promise<{ pollSeconds: number; activityThresholdMinutes: number; retention?: { remember?: number; workingPlan?: number } }> {
  try {
    const cfg: any = await getFlashbackConfig(projectDir);
    const background = cfg?.background || {};
    return {
      pollSeconds: Number(background.poll_interval_seconds ?? 30),
      activityThresholdMinutes: Number(background.activity_threshold_minutes ?? 5),
      retention: cfg?.retention,
    };
  } catch {
    return { pollSeconds: 30, activityThresholdMinutes: 5 };
  }
}

async function writeLog(projectDir: string, line: string): Promise<void> {
  const logDir = path.join(projectDir, '.claude', 'flashback', 'log');
  await fs.ensureDir(logDir);
  const logPath = path.join(logDir, 'daemon.log');
  // Cap log size (~512KB). If exceeded, rotate to .1 and truncate.
  try {
    const stats = await fs.stat(logPath).catch(() => null as any);
    if (stats && stats.size > 512 * 1024) {
      const rotated = path.join(logDir, 'daemon.log.1');
      await fs.move(logPath, rotated, { overwrite: true });
    }
  } catch {}
  await fs.appendFile(logPath, `${new Date().toISOString()} ${line}\n`);
}

export async function runDaemon(): Promise<void> {
  const cwd = process.env.FLASHBACK_DAEMON_CWD || process.cwd();
  const projects = await discoverProjects(cwd);
  if (projects.length === 0) {
    // nothing to monitor
    return;
  }

  // Simple multi-project loop (conservative): monitor first project for now
  const projectDir = projects[0].projectPath;
  const { pollSeconds, activityThresholdMinutes, retention } = await getConfig(projectDir);
  const thresholdMs = activityThresholdMinutes * 60 * 1000;
  const state: ProjectState = { lastActivityTimestampMs: null, isActive: false };
  let lastRotationMs = 0;

  const onSignal = async (sig: string) => {
    await writeLog(projectDir, `[daemon] received ${sig}, shutting down`);
    process.exit(0);
  };
  process.on('SIGINT', () => onSignal('SIGINT'));
  process.on('SIGTERM', () => onSignal('SIGTERM'));

  await writeLog(projectDir, `[daemon] started (poll=${pollSeconds}s, threshold=${activityThresholdMinutes}m)`);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const ts = await getActivityTimestampMs(projectDir);
      const now = Date.now();
      const recentlyActive = ts != null && now - ts <= thresholdMs;
      if (recentlyActive !== state.isActive) {
        state.isActive = recentlyActive;
        state.lastActivityTimestampMs = ts;
        await writeLog(projectDir, `[activity] state=${recentlyActive ? 'active' : 'idle'} ts=${ts ?? 'none'}`);

        // On transition to idle, evaluate programmatic significance gate
        if (!recentlyActive) {
          try {
            const { shouldRun, reason } = await shouldRunSessionAnalysis(projectDir, {
              minMessages: 5,
              minElapsedMs: 30 * 60 * 1000,
              minBytesDelta: 4096,
            });
            await writeLog(projectDir, `[gate] session-analysis ${reason}`);
            // NOTE: We only log the decision here. Actual agent invocation wiring will use this gate.
          } catch (e) {
            await writeLog(projectDir, `[gate-error] ${(e as Error).message}`);
          }
        }
      }

      // Periodic memory rotation (once per hour max)
      if (retention && now - lastRotationMs > 60 * 60 * 1000) {
        const rememberKeep = retention.remember ?? 10;
        const planKeep = retention.workingPlan ?? 10;
        await rotateMemoryFile(projectDir, 'REMEMBER.md', { retainCount: rememberKeep });
        await rotateMemoryFile(projectDir, 'WORKING_PLAN.md', { retainCount: planKeep });
        lastRotationMs = now;
        await writeLog(projectDir, `[rotation] rotated REMEMBER.md keep=${rememberKeep}, WORKING_PLAN.md keep=${planKeep}`);
      }
    } catch (err) {
      await writeLog(projectDir, `[error] ${(err as Error).message}`);
    }

    await new Promise(r => setTimeout(r, pollSeconds * 1000));
  }
}

if (require.main === module) {
  runDaemon().catch(() => process.exit(1));
}


