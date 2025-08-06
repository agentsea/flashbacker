#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors for output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkCommand(command) {
  try {
    execSync(`command -v ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function checkNodeVersion() {
  try {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    log(`📋 Current Node.js version: ${nodeVersion}`, 'blue');
    
    if (majorVersion >= 18 && majorVersion <= 24) {
      log('✅ Node.js version is compatible!', 'green');
      return true;
    } else {
      log(`❌ Node.js ${nodeVersion} is not in the supported range (18.x-22.x LTS)`, 'red');
      return false;
    }
  } catch (error) {
    log('❌ Failed to check Node.js version', 'red');
    return false;
  }
}

function checkNpmVersion() {
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    const majorVersion = parseInt(npmVersion.split('.')[0]);
    
    log(`📋 Current npm version: ${npmVersion}`, 'blue');
    
    if (majorVersion >= 9) {
      log('✅ npm version is compatible!', 'green');
      return true;
    } else {
      log(`❌ npm ${npmVersion} is below the minimum required version (9.x+)`, 'red');
      return false;
    }
  } catch (error) {
    log('❌ Failed to check npm version', 'red');
    return false;
  }
}

function installNvm() {
  log('\n🔧 Installing Node Version Manager (nvm)...', 'yellow');
  
  try {
    const installScript = 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash';
    execSync(installScript, { stdio: 'inherit' });
    
    log('✅ nvm installed successfully!', 'green');
    log('🔄 Please restart your terminal or run: source ~/.bashrc', 'yellow');
    return true;
  } catch (error) {
    log('❌ Failed to install nvm', 'red');
    return false;
  }
}

function setupNode() {
  log('\n🔧 Setting up Node.js 22 LTS...', 'yellow');
  
  try {
    // Check if nvm is available
    if (!checkCommand('nvm')) {
      log('❌ nvm not found. Installing nvm first...', 'yellow');
      if (!installNvm()) {
        return false;
      }
      log('⚠️  Please restart your terminal and run this script again', 'yellow');
      return false;
    }
    
    log('📥 Installing Node.js 22 LTS via nvm...', 'blue');
    execSync('source ~/.nvm/nvm.sh && nvm install 22 && nvm use 22', { 
      shell: '/bin/bash',
      stdio: 'inherit' 
    });
    
    log('✅ Node.js 22 LTS installed and activated!', 'green');
    return true;
  } catch (error) {
    log('❌ Failed to install Node.js via nvm', 'red');
    log('💡 Try manual installation from https://nodejs.org/', 'yellow');
    return false;
  }
}

function main() {
  log('🚀 Flashbacker Prerequisites Setup', 'bold');
  log('=====================================', 'blue');
  
  // Check current environment
  log('\n📋 Checking current environment...', 'blue');
  
  const nodeOk = checkNodeVersion();
  const npmOk = checkNpmVersion();
  
  if (nodeOk && npmOk) {
    log('\n🎉 All prerequisites are already satisfied!', 'green');
    log('✅ You can proceed with: npm install && npm run build', 'green');
    return;
  }
  
  // Offer to install missing prerequisites
  log('\n🔧 Some prerequisites need attention...', 'yellow');
  
  if (!nodeOk) {
    log('\n📥 Node.js installation options:', 'blue');
    log('1. Automatic setup via nvm (recommended)', 'blue');
    log('2. Manual download from https://nodejs.org/', 'blue');
    
    // For now, we'll provide instructions rather than automatic installation
    // to avoid potential system modification issues
    log('\n💡 Recommended next steps:', 'yellow');
    log('1. Install nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash', 'blue');
    log('2. Restart terminal or run: source ~/.bashrc', 'blue');
    log('3. Install Node.js: nvm install 22 && nvm use 22', 'blue');
    log('4. Verify: node --version && npm --version', 'blue');
  }
  
  if (!npmOk && nodeOk) {
    log('\n📥 Updating npm...', 'yellow');
    try {
      execSync('npm install -g npm@latest', { stdio: 'inherit' });
      log('✅ npm updated!', 'green');
    } catch (error) {
      log('❌ Failed to update npm', 'red');
      log('💡 Try: npm install -g npm@latest', 'yellow');
    }
  }
  
  log('\n🔄 After installing prerequisites, run:', 'blue');
  log('   npm install && npm run build', 'bold');
}

if (require.main === module) {
  main();
}

module.exports = { checkNodeVersion, checkNpmVersion };