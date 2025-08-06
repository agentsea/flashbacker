#!/usr/bin/env node

/**
 * Comprehensive test artifact cleanup script
 * Removes all test-generated files and directories
 */

const fs = require('fs-extra');
const path = require('path');

async function cleanTestArtifacts() {
  console.log('🧹 Cleaning up test artifacts...');
  
  const projectRoot = path.join(__dirname, '..');
  const artifactsToClean = [
    'test-results',
    'junit.xml',
    'coverage',
    '.nyc_output'
  ];
  
  let cleaned = 0;
  
  for (const artifact of artifactsToClean) {
    const artifactPath = path.join(projectRoot, artifact);
    if (await fs.pathExists(artifactPath)) {
      await fs.remove(artifactPath);
      console.log(`   ✅ Removed: ${artifact}`);
      cleaned++;
    }
  }
  
  // Check for any performance test leftovers in .claude directory
  const claudeDir = path.join(projectRoot, '.claude');
  if (await fs.pathExists(claudeDir)) {
    const memoryFile = path.join(claudeDir, 'memory', 'REMEMBER.md');
    if (await fs.pathExists(memoryFile)) {
      const content = await fs.readFile(memoryFile, 'utf-8');
      if (content.includes('Performance test learning')) {
        console.log('   🧹 Removing large performance test memory files...');
        await fs.remove(claudeDir);
        console.log('   ✅ Removed: .claude (performance test artifacts)');
        cleaned++;
      }
    }
  }
  
  // Clean any temporary test directories that might be left behind
  const tmpDir = require('os').tmpdir();
  const tmpContents = await fs.readdir(tmpDir);
  const testDirs = tmpContents.filter(dir => 
    dir.startsWith('flashbacker-test-') || dir.startsWith('flashbacker-perf-test-')
  );
  
  for (const testDir of testDirs) {
    const testDirPath = path.join(tmpDir, testDir);
    try {
      await fs.remove(testDirPath);
      console.log(`   ✅ Removed: ${testDir} (temporary test directory)`);
      cleaned++;
    } catch (error) {
      console.log(`   ⚠️ Could not remove ${testDir}: ${error.message}`);
    }
  }
  
  if (cleaned === 0) {
    console.log('   ✨ No test artifacts found - already clean!');
  } else {
    console.log(`\n🎉 Cleaned up ${cleaned} test artifacts`);
  }
}

// Run if called directly
if (require.main === module) {
  cleanTestArtifacts().catch(error => {
    console.error('❌ Failed to clean test artifacts:', error.message);
    process.exit(1);
  });
}

module.exports = cleanTestArtifacts;