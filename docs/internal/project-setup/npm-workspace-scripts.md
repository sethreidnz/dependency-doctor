# NPM Workspace Scripts

This document outlines all the npm scripts available in the project and what they do.

## Scripts

### Development Scripts

#### `npm run dev`

Starts the MCP server in development mode with hot reloading.

```bash
npm run dev
```

**What it does:** Runs `npm run mcp:dev` which executes `xmcp dev` in the `@dependency-doctor/mcp` package.

#### `npm run start`

Starts the built MCP server for production use.

```bash
npm run start
```

**What it does:** Runs `npm run mcp:start` which executes the compiled `dist/stdio.js` file.

### Build Scripts

#### `npm run build`

Builds the entire workspace for production.

```bash
npm run build
```

**What it does:** Runs `npm run mcp:build` which compiles the TypeScript code using `xmcp build`.

### Quality Assurance Scripts

#### `npm run typecheck`

Runs TypeScript type checking across all workspace packages.

```bash
npm run typecheck
```

**What it does:** Runs `npm run mcp:typecheck` which executes `tsc -p packages/dependency-doctor --noEmit` to validate types without emitting files.

#### `npm run lint`

Runs linting and formatting checks across the workspace.

```bash
npm run lint
```

**What it does:** Runs ESLint and Prettier to check code quality and formatting standards.

#### `npm run test`

Executes the test suite for the workspace.

```bash
npm run test
```

**What it does:** Runs `npm run mcp:test` which executes the test suite using the configured test runner.

### Package-Specific Scripts

These scripts target the `@dependency-doctor/mcp` package directly:

#### `npm run mcp:build`

Direct build command for the MCP package.

```bash
npm run mcp:build
```

#### `npm run mcp:dev`

Direct development command for the MCP package.

```bash
npm run mcp:dev
```

#### `npm run mcp:start`

Direct start command for the MCP package.

```bash
npm run mcp:start
```

#### `npm run mcp:test`

Direct test command for the MCP package.

```bash
npm run mcp:test
```

#### `npm run mcp:typecheck`

Direct TypeScript validation for the MCP package.

```bash
npm run mcp:typecheck
```
