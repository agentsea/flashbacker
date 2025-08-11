#!/bin/bash

# Flashbacker Installation Script
# Installs or updates Flashbacker globally and sets up the alias

set -e # Exit on error

# Save current directory to return to it later
ORIGINAL_DIR="${PWD}"

echo "🚀 Installing Flashbacker..."

# Check for required dependencies
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    echo "   Please install Node.js 18.x-22.x from https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed."
    exit 1
fi

# Check Node.js version compatibility
NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ] || [ "$NODE_VERSION" -ge 25 ]; then
    echo "⚠️  Node.js version $NODE_VERSION detected."
    echo "   Flashbacker requires Node.js 18.x-22.x for native module compatibility."
    echo "   Please install a compatible version from https://nodejs.org/"
    exit 1
fi

# Clone or update Flashbacker
IS_UPDATE=false
if [ -d ~/.claude/flashbacker ]; then
    echo "📦 Updating existing Flashbacker installation..."
    cd ~/.claude/flashbacker
    git pull --quiet
    IS_UPDATE=true
else
    echo "📦 Cloning Flashbacker repository..."
    mkdir -p ~/.claude
    git clone https://github.com/agentsea/flashbacker.git ~/.claude/flashbacker
    cd ~/.claude/flashbacker
fi

# Install dependencies and build
echo "📦 Installing dependencies..."
npm install --silent

echo "🔨 Building Flashbacker..."
npm run build --silent

echo "🔗 Creating npm link..."
npm link --silent

# Add alias to shell config if not already present
SHELL_CONFIG=""
if [ -f ~/.zshrc ]; then
    SHELL_CONFIG=~/.zshrc
elif [ -f ~/.bashrc ]; then
    SHELL_CONFIG=~/.bashrc
else
    echo "⚠️ Could not find .zshrc or .bashrc - please add alias manually:"
    echo "   alias flashback=\"node ~/.claude/flashbacker/lib/cli.js\""
fi

if [ -n "$SHELL_CONFIG" ]; then
    if ! grep -q 'alias flashback=' "$SHELL_CONFIG"; then
        echo "✏️ Adding flashback alias to $SHELL_CONFIG..."
        echo 'alias flashback="node ~/.claude/flashbacker/lib/cli.js"' >> "$SHELL_CONFIG"
        echo "📝 Alias added. Run 'source $SHELL_CONFIG' or restart your terminal to activate it."
    else
        echo "✅ Alias already exists in $SHELL_CONFIG"
    fi
fi

# CRITICAL FIX: Refresh templates for updates
if [ "$IS_UPDATE" = true ]; then
    echo "🔄 Refreshing templates for updated personas and agents..."
    
    # Find all .claude directories that might contain flashbacker installations
    FLASHBACKER_PROJECTS=$(find ~ -type d -name ".claude" -path "*/.claude" 2>/dev/null | head -10)
    
    if [ -n "$FLASHBACKER_PROJECTS" ]; then
        echo "🎯 Found project(s) with .claude directories, refreshing templates..."
        
        # For each project directory, run init --refresh
        while IFS= read -r claude_dir; do
            project_dir=$(dirname "$claude_dir")
            if [ -f "$claude_dir/flashback/config/flashback.json" ]; then
                echo "   📁 Refreshing $project_dir"
                cd "$project_dir"
                ~/.claude/flashbacker/lib/cli.js init --refresh --quiet 2>/dev/null || true
            fi
        done <<< "$FLASHBACKER_PROJECTS"
        
        echo "✅ Template refresh completed"
    else
        echo "ℹ️  No existing Flashbacker projects found - templates will be installed on first 'flashback init'"
    fi
fi

# Return to original directory
cd "${ORIGINAL_DIR}"

# Verify installation
if [ -f ~/.claude/flashbacker/lib/cli.js ]; then
    echo "✅ Flashbacker installed successfully!"
    
    # Show version
    VERSION=$(~/.claude/flashbacker/lib/cli.js --version 2>/dev/null || echo "unknown")
    echo "📋 Version: $VERSION"
    
    echo ""
    echo "🎯 Next steps:"
    if [ "$IS_UPDATE" = true ]; then
        echo "   • Your existing projects have been updated with new templates"
        echo "   • New personas and agents are now available"
    else
        echo "   • Run 'source $SHELL_CONFIG' or restart your terminal to activate the alias"
        echo "   • Navigate to your project directory and run 'flashback init --mcp'"
    fi
    echo "   • Use 'flashback status' to verify your installation"
    echo "   • Use '/fb:persona-list' to see all available AI personas"
    echo ""
    echo "📚 Documentation: https://github.com/agentsea/flashbacker"
else
    echo "❌ Installation failed - CLI script not found"
    exit 1
fi

echo "🎉 Happy coding with Flashbacker!"