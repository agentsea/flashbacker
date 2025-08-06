#!/usr/bin/env node

/**
 * Clean up Claude Code hook registration and create proper hooks for current project
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const CLAUDE_SETTINGS_PATH = path.join(os.homedir(), '.claude', 'settings.json');
const CURRENT_PROJECT = process.cwd();

async function cleanAndRegisterHooks() {
  console.log('🧹 Cleaning Claude Code hook registration...');
  
  // Read current settings
  if (!fs.existsSync(CLAUDE_SETTINGS_PATH)) {
    console.error('❌ Claude settings.json not found');
    process.exit(1);
  }
  
  const settings = JSON.parse(fs.readFileSync(CLAUDE_SETTINGS_PATH, 'utf8'));
  
  // Count existing hooks
  const preCompactCount = settings.hooks?.PreCompact?.length || 0;
  const sessionStartCount = settings.hooks?.SessionStart?.length || 0;
  console.log(`📊 Found ${preCompactCount} PreCompact hooks, ${sessionStartCount} SessionStart hooks`);
  
  // Create clean hook configuration for this project only
  const cleanHooks = {
    PreCompact: [
      {
        matcher: "manual",
        hooks: [
          {
            type: "command",
            command: `flashback hook pre-compact --project "${CURRENT_PROJECT}"`
          }
        ]
      },
      {
        matcher: "auto", 
        hooks: [
          {
            type: "command",
            command: `flashback hook pre-compact --project "${CURRENT_PROJECT}"`
          }
        ]
      }
    ],
    SessionStart: [
      {
        matcher: "startup",
        hooks: [
          {
            type: "command", 
            command: `flashback hook session-start --project "${CURRENT_PROJECT}"`
          }
        ]
      },
      {
        matcher: "resume",
        hooks: [
          {
            type: "command",
            command: `flashback hook session-start --project "${CURRENT_PROJECT}"`
          }
        ]
      },
      {
        matcher: "clear",
        hooks: [
          {
            type: "command",
            command: `flashback hook session-start --project "${CURRENT_PROJECT}"`
          }
        ]
      }
    ]
  };
  
  // Preserve other settings, replace hooks
  settings.hooks = {
    ...settings.hooks,
    ...cleanHooks
  };
  
  // Write cleaned settings
  fs.writeFileSync(CLAUDE_SETTINGS_PATH, JSON.stringify(settings, null, 2));
  
  console.log('✅ Cleaned hook registration:');
  console.log(`   - PreCompact: 2 hooks (manual, auto) for ${CURRENT_PROJECT}`);
  console.log(`   - SessionStart: 3 hooks (startup, resume, clear) for ${CURRENT_PROJECT}`);
  console.log('🎯 Hooks now target only current project with proper matchers');
}

cleanAndRegisterHooks().catch(error => {
  console.error('❌ Failed to clean hooks:', error.message);
  process.exit(1);
});