#!/bin/bash

# Installation script for Coding Agent
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$HOME/.config/coding-agent"
INSTALL_DIR="$HOME/.local/bin"

echo "Installing Coding Agent..."

# Check dependencies
echo "Checking dependencies..."
missing_deps=()
command -v curl >/dev/null 2>&1 || missing_deps+=("curl")
command -v jq >/dev/null 2>&1 || missing_deps+=("jq")

if [ ${#missing_deps[@]} -ne 0 ]; then
    echo "Missing dependencies: ${missing_deps[*]}"
    echo ""
    echo "Please install them:"
    echo "  Ubuntu/Debian: sudo apt install curl jq"
    echo "  macOS: brew install curl jq"
    echo "  Windows (WSL): sudo apt install curl jq"
    exit 1
fi

# Create directories
mkdir -p "$INSTALL_DIR"
mkdir -p "$CONFIG_DIR"/{prompts,rules,memos}

# Copy script
cp "$SCRIPT_DIR/coding-agent" "$INSTALL_DIR/"
chmod +x "$INSTALL_DIR/coding-agent"

# Create default configuration
if [[ ! -f "$CONFIG_DIR/config" ]]; then
    cat > "$CONFIG_DIR/config" << 'EOF'
# Coding Agent Configuration
# Set your API keys here

DEFAULT_MODEL="openai"
DEFAULT_SYSTEM_PROMPT="default"

# API Keys - Uncomment and set the ones you want to use
# OPENAI_API_KEY="your_openai_api_key_here"
# ANTHROPIC_API_KEY="your_anthropic_api_key_here" 
# GEMINI_API_KEY="your_gemini_api_key_here"
# KIMI_API_KEY="your_kimi_api_key_here"
EOF
fi

# Create default system prompt
if [[ ! -f "$CONFIG_DIR/prompts/default.txt" ]]; then
    cat > "$CONFIG_DIR/prompts/default.txt" << 'EOF'
You are a helpful coding assistant. You provide clear, concise, and accurate help with programming tasks.

Key behaviors:
- Analyze code carefully before suggesting changes
- Explain your reasoning when helpful  
- Follow best practices for the language being used
- Be direct and actionable in your responses
- When viewing code files, focus on understanding the structure and logic
- Provide specific, implementable solutions
EOF
fi

echo ""
echo "✓ Coding Agent installed successfully!"
echo ""
echo "Next steps:"
echo "1. Add $INSTALL_DIR to your PATH if not already there:"
echo "   export PATH=\"$INSTALL_DIR:\$PATH\""
echo ""
echo "2. Configure your API keys in:"
echo "   $CONFIG_DIR/config"
echo ""
echo "3. Test the installation:"
echo "   coding-agent --help"
echo "   coding-agent \"Write a hello world in Python\""
echo ""
echo "4. Start interactive mode:"
echo "   coding-agent --interactive"
