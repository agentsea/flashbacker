# Flashbacker Installation Guide

> **Complete installation guide for Flashbacker - Claude Code session continuity with AI personas**

## 🚀 Quick Start (Recommended)

### Prerequisites

- **Node.js**: 18.x, 20.x, or 22.x LTS (recommended: 22.x)
- **npm**: 9.x or later
- **Git**: For cloning the repository
- **Claude Code**: Latest version for hook system compatibility

#### Quick Prerequisites Check
```bash
# Use our automated checker
npm run setup:prereqs

# Or check manually
node --version    # Should be v18.x.x, v20.x.x, or v22.x.x
npm --version     # Should be 9.x.x or higher
```

#### Node.js Installation (If Needed)
```bash
# Option 1: Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install 22
nvm use 22

# Option 2: Download from https://nodejs.org/ (LTS version)
# Option 3: Use system package manager (varies by OS)
```

⚠️ **Important**: Versions outside Node.js 18-22 range may cause native module compilation errors.

## 🚀 Installation Options

### Option 1: NPM Package (RECOMMENDED)

**Install directly from npm registry:**

```bash
# Install globally
npm install -g flashbacker

# Initialize in your project with MCP servers (RECOMMENDED)
cd /path/to/your/project
flashback init --mcp              # Includes context7, playwright, sequential-thinking
```

**What the npm installation provides:**
- ✅ **Official package** published to npm registry
- ✅ **Automatic dependency resolution** and installation
- ✅ **Global CLI availability** as `flashback` command
- ✅ **Version management** via npm (easy updates)
- ✅ **All templates bundled** - no separate cloning needed
- ✅ **Professional distribution** with verified package integrity

### Option 2: Automated Installer Script

**Single command installation and updates with automatic template refresh:**

```bash
# Fresh installation
curl -fsSL https://raw.githubusercontent.com/agentsea/flashbacker/main/scripts/install.sh | bash

# Or download and run locally for review
curl -fsSL https://raw.githubusercontent.com/agentsea/flashbacker/main/scripts/install.sh -o install.sh
chmod +x install.sh
./install.sh
```

**What the installer does:**
- ✅ **Validates prerequisites** (Node.js 18.x-22.x, npm 9.x+)
- ✅ **Clones/updates repository** to `~/.claude/flashbacker/`
- ✅ **Installs dependencies and builds** automatically
- ✅ **Creates npm link** for global `flashback` command
- ✅ **Sets up shell alias** (Zsh/Bash auto-detection)
- ✅ **Smart template refresh** - updates existing projects automatically
- ✅ **Version verification** and next steps guidance

**For updates (preserves your project memory):**
```bash
# The same command works for updates - it detects existing installations
curl -fsSL https://raw.githubusercontent.com/agentsea/flashbacker/main/scripts/install.sh | bash

# Updates include:
# - Latest code and bug fixes
# - New personas (like john-carmack) 
# - Enhanced agents and templates
# - Automatic project template refresh
```

### Option 3: Manual Source Installation

**For development, contributions, or latest unreleased features:**

```bash
# 1. Clone the repository
git clone https://github.com/agentsea/flashbacker.git
cd flashbacker

# 2. Check prerequisites (optional but recommended)
npm run setup:prereqs

# 3. Install dependencies and build
# Note: If using nvm, it will auto-switch to Node.js 22 via .nvmrc
npm install && npm run build

# 4. ⚡ CRITICAL: Link globally (makes 'flashback' command available everywhere)
npm link

# 5. ✅ Verify installation shows v2.3.5
flashback --version
flashback doctor

# 6. Initialize in your project (WITH MCP SERVERS - RECOMMENDED)
cd /path/to/your/project
flashback init --mcp             # RECOMMENDED: Full setup with MCP servers
# OR
flashback init                    # Basic setup without MCP servers
# OR
flashback init --refresh          # Update existing project, preserve memory
# OR  
flashback init --clean           # Start completely fresh
```

**When to use source installation:**
- Contributing to Flashbacker development
- Testing unreleased features or bug fixes
- Customizing Flashbacker for specific needs
- Corporate environments requiring source code review

## 📋 Installation Verification

After installation, verify everything works:

```bash
# Check version and basic functionality
flashback --version          # Should show 2.3.5
flashback doctor            # System diagnostics

# Test core commands
flashback status            # Installation status
flashback config --show     # Configuration display

# Test persona system
flashback persona --list    # Show all 13 personas

# Test memory system
flashback memory --show     # Display project memory

# Verify slash commands are installed
ls .claude/commands/fb/     # Should show persona.md, working-plan.md, etc.
```

Expected output from `flashback doctor`:
```
🏥 Flashbacker System Diagnostics

✅ Node.js version: v22.x.x (compatible - LTS supported)
✅ npm version: v10.x.x (compatible)  
✅ Flashbacker CLI: Working (v2.3.5)
✅ Project structure: Initialized  
✅ Configuration: Valid
✅ Slash commands: Installed (/fb: namespace)
✅ Agent definitions: 19 agents available (@agent-{name}) including GPT-5 integration
✅ Persona templates: 19 templates available
✅ Memory system: Ready
✅ Hook system: SessionStart registered
✅ ESLint configuration: Ready

🎉 All systems operational!
💡 Use `npm run setup:prereqs` to verify Node.js compatibility
```

## 🗂️ Installation Architecture

**System-wide Installation + Per-project Initialization**

Flashbacker follows a clean installation model:

1. **Global Installation**: Install Flashbacker once on your system (via `npm link`)
2. **Per-project Usage**: Initialize projects with `flashback init` (creates `.claude/` directory only)
3. **No Pollution**: Your project directories remain clean - no conflicting files

**What gets installed where:**
- **System**: Flashbacker CLI globally available as `flashback` command
- **Project**: Only `.claude/` directory with templates and configuration
- **Result**: Clean separation, no conflicts with existing project structure

## 🎯 Post-Installation Setup

### Initialize Your First Project

```bash
cd /path/to/your/project
flashback init --mcp                    # RECOMMENDED: Include MCP servers

# This creates:
# .claude/
# ├── agents/                           # 19 Claude Code agents (@agent-{name}) including GPT-5
# ├── commands/fb/                      # Slash commands (/fb:persona, etc.)
# ├── claude_desktop_config.json        # MCP servers configuration
# └── flashback/
#     ├── config/flashback.json         # Configuration
#     ├── memory/REMEMBER.md            # Project memory
#     ├── memory/WORKING_PLAN.md        # Development plan
#     ├── personas/                     # 19 AI personas for /fb:persona  
#     ├── prompts/                      # AI analysis prompts
#     └── scripts/session-start.sh      # SessionStart hook
```

### MCP Servers Installation Options

**Option 1: Full Installation with MCP Servers (RECOMMENDED)**
```bash
flashback init --mcp
# Installs everything + 3 powerful MCP servers:
# • context7: Documentation and library context
# • playwright: Browser automation and testing  
# • sequential-thinking: Advanced reasoning chains
```

**Option 2: MCP Servers Only (For Existing Installations)**
```bash
flashback init --mcp-only
# Only installs MCP servers, skips template setup
# Perfect for adding MCP to existing Flashbacker projects
```

**Option 3: Basic Installation (No MCP Servers)**
```bash
flashback init
# Standard installation without MCP servers
# You can add MCP servers later with --mcp-only
```

**⚠️ Important**: After MCP installation, restart Claude Code to load the new servers.

### Test Slash Commands in Claude Code

After initialization, these commands become available in Claude Code:

**Persona Layer (Current Conversation):**
```bash
/fb:persona architect "review our authentication system"
/fb:persona security "analyze potential vulnerabilities"  
/fb:persona performance "optimize database queries"
```

**Agent Layer (Dedicated Subagents):**
```bash
@agent-architect "comprehensive architecture review"
@agent-security "full security audit with project context"
@agent-performance "deep performance analysis"
```

**Session Management:**
```bash
/fb:working-plan                # Update development plan with AI
/fb:save-session               # Capture session insights  
/fb:session-start              # Load project context
/fb:remember "key project insight"  # Add to project memory
```

### Verify Hook Registration

```bash
# Check that hooks are registered in Claude Code
cat ~/.claude/settings.json | grep -A 10 hooks

# Should show SessionStart hook for your project
```

## 🔧 Advanced Installation Options

### Development Setup

If you want to contribute or modify Flashbacker:

```bash
git clone https://github.com/agentsea/flashbacker.git
cd flashbacker

# Install all dependencies including dev dependencies
npm install

# Run in development mode (watch for changes)
npm run dev

# Run comprehensive tests
npm test
npm run test:integration
npm run test:performance

# Clean up test artifacts
npm run test:clean
```

### Production Build from Source

For production deployment:

```bash
# Clone and build optimized version
git clone https://github.com/agentsea/flashbacker.git
cd flashbacker

# Install only production dependencies
npm ci --only=production

# Build TypeScript to JavaScript
npm run build

# Install globally
npm link
```

## 🔍 Troubleshooting

### Common Issues

**Issue 1: `flashback: command not found`**
```bash
# Solution: npm link wasn't run or PATH issue
cd /path/to/flashbacker
npm link

# Verify with:
which flashback
```

**Issue 2: `flashback --version` shows wrong version**
```bash
# This happens when you update but don't re-link
cd /path/to/flashbacker

# Solution: Re-link after any updates
npm unlink && npm link

# Verify correct version:
flashback --version  # Should show 2.3.5

# If still wrong, check which flashback you're running:
which flashback
ls -la $(which flashback)
```

**Issue 3: Permission errors on npm link**
```bash
# Solution: Fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH

# Or use sudo (not recommended)
sudo npm link
```

**Issue 4: Node.js compatibility errors**
```bash
# Check if your Node.js version is supported
npm run setup:prereqs

# Or check manually
node --version  # Must be 18.x, 20.x, or 22.x

# If unsupported version, install Node.js LTS via nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install 22   # Current LTS
nvm use 22

# Verify and rebuild
npm install && npm run build
```

**Issue 5: Native module compilation errors**
```bash
# Common with tree-sitter modules on unsupported Node.js versions
# Solution 1: Use supported Node.js version (18.x-22.x)
npm run setup:prereqs

# Solution 2: Clean install after Node.js version change
rm -rf node_modules package-lock.json
npm install && npm run build
```

**Issue 6: ESLint or code quality issues**
```bash
# Check code quality
npm run lint

# Auto-fix formatting issues
npm run lint:fix

# If ESLint config missing
ls -la .eslintrc.js  # Should exist after v2.2.2
```

**Issue 7: Slash commands not working in Claude Code**
```bash
# Verify commands exist
ls .claude/commands/fb/

# Re-initialize if missing
flashback init --refresh

# Check command content
cat .claude/commands/fb/persona.md
```

**Issue 6: SessionStart hook not working**
```bash
# Check hook registration
cat ~/.claude/settings.json | grep -A 5 SessionStart

# Re-register hooks if needed
flashback init --refresh

# Test hook script manually
bash .claude/flashback/scripts/session-start.sh
```

### Advanced Troubleshooting

**Full System Diagnostic:**
```bash
# Run comprehensive diagnostics
flashback doctor --verbose

# Check configuration
flashback config --show

# Test all major commands
flashback status
flashback persona --list
flashback memory --show
```

**Reset Installation:**
```bash
# Clean slate reset (removes all state)
cd /path/to/your/project
flashback init --clean

# Or refresh templates while preserving memory
flashback init --refresh
```

## 🌐 Multiple Project Setup

To use Flashbacker across multiple projects:

```bash
# Install globally once
cd /path/to/flashbacker
npm link

# Initialize in each project
cd /project1 && flashback init
cd /project2 && flashback init  
cd /project3 && flashback init

# Each project gets its own .claude/ directory
# But shares the global Flashbacker installation
```

## 🎯 IDE Integration

### VS Code Tasks

Create `.vscode/tasks.json` in your project:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Flashbacker: Show Status",
      "type": "shell",
      "command": "flashback status",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always"
      }
    },
    {
      "label": "Flashbacker: Persona Analysis", 
      "type": "shell",
      "command": "flashback persona architect --context \"${input:analysisRequest}\"",
      "group": "build"
    },
    {
      "label": "Flashbacker: Show Memory",
      "type": "shell", 
      "command": "flashback memory --show",
      "group": "build"
    }
  ],
  "inputs": [
    {
      "id": "analysisRequest", 
      "description": "What would you like analyzed?",
      "default": "review current architecture",
      "type": "promptString"
    }
  ]
}
```

### Shell Aliases

Add to your `.bashrc`, `.zshrc`, or `.fish`:

```bash
# Flashbacker shortcuts
alias fb="flashback"
alias fbs="flashback status"
alias fbm="flashback memory --show"
alias fbp="flashback persona --list"

# Usage:
# fb status
# fbm
# fbp
# fb persona architect --context "analyze auth system"
```

## 🔄 Updating Flashbacker

### From Source

```bash
cd /path/to/flashbacker
git pull origin main
npm install && npm run build

# ⚡ CRITICAL: Re-link after updates to refresh global command
npm unlink && npm link

# ✅ Verify version updated correctly
flashback --version  # Should show latest version

# Refresh templates in existing projects
cd /your/project && flashback init --refresh
```

### From NPM Package

```bash
# Update global installation
npm update -g flashbacker

# Verify new version
flashback --version

# Refresh templates in existing projects
cd /your/project && flashback init --refresh
```

## 📦 Template Management

### Template Architecture

Flashbacker uses a pure template-driven system:

- **Source Templates**: `templates/.claude/flashback/` (in Flashbacker repo)
- **Live Templates**: `.claude/flashback/` (in your projects)
- **No Hardcoded Fallbacks**: Clean failures if templates unavailable
- **Delta Sync**: Automatically removes obsolete files during refresh

### Template Updates

```bash
# Update templates while preserving memory
flashback init --refresh

# This will:
# 1. Copy latest templates from source
# 2. Preserve existing REMEMBER.md and WORKING_PLAN.md  
# 3. Remove obsolete files not in current templates
# 4. Update slash commands and persona templates
```

## 🔒 Security Considerations

### Git Integration

Flashbacker automatically manages `.gitignore`:

**Excluded from git:**
- `.claude/state/session-states/` - Session states (sensitive)
- `.claude/commands/` - Slash command templates (generated)

**Included in git:**
- `.claude/memory/REMEMBER.md` - Project memory (for team sharing)
- `.claude/config/flashback.json` - Configuration

### Permissions

```bash
# Hook scripts are made executable automatically
ls -la .claude/flashback/scripts/session-start.sh
# Should show: -rwxr-xr-x

# If permission issues occur:
chmod +x .claude/flashback/scripts/*.sh
```

## 🆘 Getting Help

- **Documentation**: Check `docs/` directory for detailed guides
- **Issues**: Report at GitHub repository
- **Diagnostics**: Run `flashback doctor --verbose`  
- **Configuration**: Run `flashback config --show`
- **Version**: Run `flashback --version`
- **Status**: Run `flashback status`

## 🚀 Next Steps

After successful installation:

1. **Test Persona System**: `flashback persona architect --context "analyze project"`
2. **Set Up Memory**: `flashback memory --add "key project insights"`
3. **Try Slash Commands**: `/fb:persona security "review authentication"`
4. **Check Working Plan**: `/fb:working-plan` for AI development planning
5. **Explore Documentation**: Read full user guide for advanced features

---

**Installation Status**: v2.3.5 - **NPM package published and fully functional!** 🎉  
**Available**: Official npm package at https://www.npmjs.com/package/flashbacker  
**Recommended**: Use `npm install -g flashbacker` for easiest installation  
**Last Updated**: August 14, 2025 - Comprehensive task management system with surgical discipline and npm package publication