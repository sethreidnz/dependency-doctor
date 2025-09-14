# Claude Code Context for Dependency Doctor

## Project Overview
TypeScript npm workspace project for dependency management tooling with MCP (Model Context Protocol) integration.

## Current Technology Stack
- **Language**: TypeScript (targeting ES2022, Node.js 22.15.0)
- **Build System**: xmcp (for MCP package compilation)
- **Package Manager**: npm with workspaces
- **Type Checking**: TypeScript compiler with workspace-level validation
- **Linting**: ESLint 9.x with flat configuration (in development)
- **Testing**: TDD approach with Vitest using behavior-driven development principles

## Project Structure
```
/
├── tsconfig.base.json           # Shared TypeScript configuration
├── eslint.config.js            # Base ESLint configuration (new)
├── package.json                 # Workspace scripts and dependencies
├── packages/
│   └── dependency-doctor/       # MCP package
│       ├── tsconfig.json        # Package-specific TypeScript config
│       ├── eslint.config.js     # Package-specific ESLint config (new)
│       ├── src/                 # TypeScript source code
│       └── xmcp.config.ts       # MCP configuration
├── docs/                        # Documentation
└── specs/                       # Feature specifications and plans
```

## Development Workflow Scripts
```bash
# Development
npm run dev          # Start MCP server in development mode
npm run build        # Build all workspace packages
npm run start        # Start production MCP server

# Quality Assurance
npm run typecheck    # TypeScript validation across workspace
npm run lint         # ESLint validation (new feature)
npm run test         # Test suite execution

# Package-Specific
npm run mcp:build    # Direct MCP package build
npm run mcp:dev      # Direct MCP package development
npm run mcp:typecheck # Direct MCP package type checking
npm run mcp:lint     # Direct MCP package linting (new)
```

## Configuration Patterns
The project follows a base configuration + package override pattern:

### TypeScript Configuration
- `tsconfig.base.json`: Shared compiler options (ES2022, strict mode)
- Package-specific configs extend base with project-specific settings

### ESLint Configuration (Current Implementation)
- `eslint.config.js`: Base linting rules for workspace
- Package configs extend base with package-specific overrides
- Uses flat configuration format (ESLint 9.x)
- Integrates with TypeScript via @typescript-eslint plugins

## Code Quality Standards
- **Test-Driven Development**: RED-GREEN-Refactor cycle enforced
- **Constitutional Requirements**: Simplicity, proper testing order, real dependencies
- **Modern Practices**: ES2022 features, strict TypeScript, workspace-aware tooling

## Recent Changes
- Implemented TypeScript configuration system with workspace support
- Added npm script delegation pattern (root → package-specific commands)
- Created Dependency Doctor MCP MVP specification and implementation plan
- Designed MCP server architecture with pluggable package manager support
- Established data model for dependency analysis and upgrade workflows

## MCP Development Context
- **MCP Framework**: xmcp (https://xmcp.dev/docs#create-a-new-xmcp-app) for TypeScript MCP servers
- **MCP Tools**: analyze_dependencies, create_upgrade_groups, execute_upgrade, rollback_upgrade
- **MCP Resources**: workspace_config, upgrade_documentation, session_state
- **Package Manager Integration**: npm CLI with programmatic execution and JSON output parsing
- **Plugin Architecture**: Interface-based system for supporting multiple package managers
- **Workspace Management**: Configuration persistence, documentation generation, session state tracking

## ESLint Implementation Details
- **Format**: Flat configuration (eslint.config.js)
- **Parser**: @typescript-eslint/parser for TypeScript files
- **Rules**: Recommended + type-checked + strict TypeScript rules
- **Performance**: Caching enabled, workspace-aware execution
- **Integration**: VSCode support, CI/CD ready, follows TDD principles

## Development Guidelines
1. Follow established configuration patterns (base + package overrides)
2. Use workspace-level scripts for convenience
3. Maintain TDD practices with failing tests first
4. Keep configurations simple and direct
5. Document changes in appropriate specs/ directory
6. Ensure CI/CD integration compatibility

This context enables effective code assistance for the dependency-doctor project's TypeScript workspace with modern tooling integration.