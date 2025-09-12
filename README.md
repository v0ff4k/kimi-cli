
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

## Development Workflow Architecture
The system enforces a specific development pattern:

1. **Frontend First**: Always develop UI components before backend functionality
2. **Single Route Focus**: All development centers around the root route (src/app/page.tsx)
3. **Automatic Dev Server**: Development server runs automatically on port 3000
4. **Log-Based Debugging**: Uses dev.log file for monitoring development server status

## Technology Stack Constraints
The architecture enforces strict technology requirements:

- **Framework**: Next.js 15 with App Router (non-negotiable)
- **Language**: TypeScript 5 (required)
- **UI Library**: Shadcn/ui components (pre-installed)
- **Backend SDK**: z-ai-web-dev-sdk (server-side only)

## Code Quality and Standards
Integrated linting and code quality checks:
- ESLint integration for Next.js rules compliance
- Automatic code formatting expectations
- No test code generation policy

# External Dependencies

## UI Component Library
- **Shadcn/ui**: Pre-installed component library located in `src/components/ui`
- All UI components should use existing shadcn components rather than custom implementations

## Backend SDK
- **z-ai-web-dev-sdk**: Required for backend development, restricted to server-side usage only

## Development Tools
- **ESLint**: Code quality and Next.js rules enforcement via `npm run lint`
- **Development Server**: Auto-running on port 3000 with logging to `/home/z/my-project/dev.log`

## AI Integration Services
- **Image Generation Tool**: Available for generating project images during development
- **TodoRead/TodoWrite**: Task management utilities for development workflow
- **WebFetch Tool**: Documentation and URL fetching capabilities (Claude Code specific)

## Framework Dependencies
- **Next.js 15**: Core framework with App Router architecture
- **TypeScript 5**: Type system and development language
- **React**: Underlying UI library (implied by Next.js)
