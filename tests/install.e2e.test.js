/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf8', ...opts });
}

describe('Install E2E', () => {
  jest.setTimeout(180000);

  it('packs, installs to temp prefix, inits project, and generates PM2 ecosystem', () => {
    const repoRoot = path.resolve(__dirname, '..');
    run('npm run build', { cwd: repoRoot });
    const tgz = run('npm pack --silent | tail -n 1', { cwd: repoRoot }).trim();

    const prefix = fs.mkdtempSync(path.join(os.tmpdir(), 'fb-prefix-'));
    run(`npm i --prefix ${JSON.stringify(prefix)} ${JSON.stringify(path.join(repoRoot, tgz))}`);
    const cli = path.join(prefix, 'node_modules', '.bin', 'flashback');

    const workdir = fs.mkdtempSync(path.join(os.tmpdir(), 'fb-work-'));
    run(`${JSON.stringify(cli)} init`, { cwd: workdir });

    const ecoPath = path.join(workdir, '.claude', 'flashback', 'scripts', 'pm2', 'ecosystem.config.js');
    expect(fs.existsSync(ecoPath)).toBe(true);
  });
});


