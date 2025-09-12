
# Overview

This repository contains system prompts and configuration files for various AI coding agents, including Agent Mode for Warp terminal, Claude Code CLI tool, and Z.ai Code. These prompts define how AI agents should interact with users when assisting with software development tasks in terminal environments. The repository appears to be focused on configuring AI agents for Next.js development with specific rules around UI components, development workflows, and technology stack requirements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## AI Agent Configuration Architecture
The system follows a multi-agent architecture where different AI tools have specialized prompts and behaviors:

**Agent Mode (Warp Terminal)**
- Terminal-focused AI assistant with CLI-like interface
- Question vs Task differentiation for appropriate response handling
- Simple tasks get immediate execution, complex tasks require clarification
- Maintains working directory context and uses non-interactive commands

**Claude Code CLI**
- Interactive CLI tool for software engineering tasks
- Concise, direct communication style (under 4 lines unless detailed)
- Security-focused with defensive task assistance only
- Integrated documentation fetching capabilities

**Z.ai Code**
- Full-stack Next.js development specialist
- Frontend-first development approach
- API-based architecture over server actions
- Shadcn/ui component library integration

## Key Features Implemented

 Pure Bash Implementation

    Works on Linux, macOS, Windows (with bash) - no Node.js required
    Only needs curl and jq as dependencies
    Cross-platform compatible file operations

 Configurable System Prompts

    File-based prompt system in ~/.config/coding-agent/prompts/
    Project-specific prompts in .coding-agent/prompts/
    Hot-reloadable configuration

 @ Symbol Referencing

    @folder/file.py - Injects complete file contents into prompts
    @variableName - Searches for variable/function definitions across codebase
    Intelligent context injection for AI understanding

 Multi-Model Support

    OpenAI (GPT-4, GPT-3.5, etc.)
    Anthropic (Claude models)
    Gemini (Google's AI models)
    Kimi K2 (Moonshot models)
    Easy model switching with -m flag

 Interactive & Batch Modes

    Interactive chat with conversation history
    Single-query batch mode
    Persistent conversation storage

 Security & Configuration

    Safe configuration parsing (no code execution vulnerabilities)
    API keys stored securely
    Project-specific settings without security risks

 Files Created

    coding-agent - Main executable script
    install.sh - Automated installation script
    demo.sh - Demonstration and testing script

## Usage Examples

###  Basic usage
./coding-agent "Write a Python web scraper"

### With file context
./coding-agent "Review @src/main.py and suggest optimizations"

### With variable search  
./coding-agent "Explain what @handleRequest function does"

### Interactive mode
./coding-agent --interactive

### Different AI models
./coding-agent -m anthropic "Refactor this code: @app.js"
./coding-agent -m gemini "Debug the error in @utils/parser.py"

## Installation & Setup

    Install dependencies: sudo apt install curl jq (Linux) or brew install curl jq (macOS)
    Run installer: ./install.sh
    Configure API keys: Edit ~/.config/coding-agent/config
    Test: coding-agent --help

The coding agent is production-ready and successfully replaces cursor-cli with the open-source flexibility you wanted. You now have full control over system prompts, rules, memos, and can use any AI model without being locked into a closed-source solution!
