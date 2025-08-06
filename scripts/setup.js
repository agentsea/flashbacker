#!/usr/bin/env node

/**
 * Comprehensive Flashbacker Setup Script
 * Creates clean installations without development artifacts
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class FlashbackerSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.installRoot = path.join(__dirname, '..');
  }

  async run() {
    console.log('🚀 Flashbacker Comprehensive Setup');
    console.log('=====================================\n');

    try {
      await this.validateEnvironment();
      await this.buildProject();
      await this.setupGlobalAccess();
      await this.cleanDevelopmentArtifacts();
      await this.validateInstallation();
      
      console.log('\n🎉 Setup completed successfully!');
      console.log('\nNext steps:');
      console.log('  1. cd /path/to/your/project');
      console.log('  2. flashback init');
      console.log('  3. flashback status');
      
    } catch (error) {
      console.error('\n❌ Setup failed:', error.message);
      process.exit(1);
    }
  }

  async validateEnvironment() {
    console.log('🔍 Validating environment...');
    
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 16) {
      throw new Error(`Node.js 16+ required, found ${nodeVersion}`);
    }
    
    console.log(`   ✅ Node.js ${nodeVersion}`);
    
    // Check npm
    try {
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      console.log(`   ✅ npm ${npmVersion}`);
    } catch {
      throw new Error('npm not found');
    }
    
    // Check git
    try {
      const gitVersion = execSync('git --version', { encoding: 'utf8' }).trim();
      console.log(`   ✅ ${gitVersion}`);
    } catch {
      console.log('   ⚠️  Git not found (optional for basic usage)');
    }
  }

  async buildProject() {
    console.log('\n📦 Building Flashbacker...');
    
    // Change to install directory
    process.chdir(this.installRoot);
    
    // Install dependencies
    console.log('   Installing dependencies...');
    execSync('npm install', { stdio: 'pipe' });
    console.log('   ✅ Dependencies installed');
    
    // Build TypeScript
    console.log('   Building TypeScript...');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('   ✅ TypeScript compiled');
    
    // Run tests to verify build
    console.log('   Running integration tests...');
    try {
      execSync('npm run test:integration', { stdio: 'pipe' });
      console.log('   ✅ Tests passed');
    } catch (error) {
      throw new Error('Build verification tests failed');
    }
  }

  async setupGlobalAccess() {
    console.log('\n🔗 Setting up global access...');
    
    try {
      execSync('npm link', { stdio: 'pipe' });
      console.log('   ✅ Global command linked');
      
      // Verify global access works
      const version = execSync('flashback --version', { encoding: 'utf8' }).trim();
      console.log(`   ✅ Global command verified (v${version})`);
      
    } catch (error) {
      throw new Error('Failed to set up global access. Try: sudo npm link');
    }
  }

  async cleanDevelopmentArtifacts() {
    console.log('\n🧹 Cleaning development artifacts...');
    
    // Import fs-extra after npm install has completed
    const fsExtra = require('fs-extra');
    
    // Clean test artifacts
    const artifactsToClean = [
      'test-results',
      'junit.xml', 
      'coverage',
      '.nyc_output'
    ];
    
    for (const artifact of artifactsToClean) {
      const artifactPath = path.join(this.installRoot, artifact);
      if (await fsExtra.pathExists(artifactPath)) {
        await fsExtra.remove(artifactPath);
        console.log(`   ✅ Removed: ${artifact}`);
      }
    }
    
    // Clean development .claude directory if it exists
    const claudeDir = path.join(this.installRoot, '.claude');
    if (await fsExtra.pathExists(claudeDir)) {
      console.log('   🧹 Cleaning development .claude directory...');
      
      // Check if it contains development artifacts
      const memoryFile = path.join(claudeDir, 'memory', 'REMEMBER.md');
      if (await fsExtra.pathExists(memoryFile)) {
        const content = await fsExtra.readFile(memoryFile, 'utf-8');
        // Clean if it contains development history
        if (content.includes('Phase 2') || content.includes('test') || content.includes('development')) {
          await fsExtra.remove(claudeDir);
          console.log('   ✅ Removed development .claude directory');
        }
      }
    }
    
    console.log('   ✅ Development artifacts cleaned');
  }

  async validateInstallation() {
    console.log('\n✔️  Validating installation...');
    
    // Import fs-extra after npm install has completed
    const fsExtra = require('fs-extra');
    
    // Test basic commands
    const commands = [
      'flashback --version',
      'flashback --help'
    ];
    
    for (const cmd of commands) {
      try {
        execSync(cmd, { stdio: 'pipe' });
        console.log(`   ✅ ${cmd.split(' ')[1]} command works`);
      } catch {
        throw new Error(`Command failed: ${cmd}`);
      }
    }
    
    // Test doctor command in a clean directory
    const tempDir = path.join(require('os').tmpdir(), 'flashback-setup-test-' + Date.now());
    await fsExtra.ensureDir(tempDir);
    
    try {
      process.chdir(tempDir);
      execSync('flashback init', { stdio: 'pipe' });
      execSync('flashback status', { stdio: 'pipe' });
      console.log('   ✅ Clean installation test passed');
    } finally {
      await fsExtra.remove(tempDir);
    }
    
    // Return to original directory
    process.chdir(this.projectRoot);
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new FlashbackerSetup();
  setup.run().catch(error => {
    console.error('Setup failed:', error.message);
    process.exit(1);
  });
}

module.exports = FlashbackerSetup;