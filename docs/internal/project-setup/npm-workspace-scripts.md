# NPM Workspace Scripts

This document outlines all the npm scripts available in the project and what they do.

## Main Scripts (Alphabetical)

### `npm run build`

Builds the entire workspace for production.

```bash
npm run build
```

### `npm run dev`

Starts the MCP server in development mode with hot reloading.

```bash
npm run dev
```

### `npm run lint`

Runs ESLint checks across the workspace.

```bash
npm run lint
```

### `npm run spellcheck`

Runs spellchecking across all code, documentation and code comments.

```bash
npm run spellcheck
```

### `npm run start`

Starts the built MCP server for production use.

```bash
npm run start
```

### `npm run test`

Executes the test suite for the workspace.

```bash
npm run test
```

### `npm run test:coverage`

Runs tests with coverage reporting.

```bash
npm run test:coverage
```

**What it does:** Runs `npm run mcp:test:coverage` which executes Vitest with coverage reporting enabled.

### `npm run test:ui`

Runs tests with the Vitest UI for interactive test running.

```bash
npm run test:ui
```

### `npm run typecheck`

Runs TypeScript type checking across all workspace packages.

```bash
npm run typecheck
```

### `npm run validate`

Runs all validation checks in parallel which is useful for final validation before pushing.

```bash
npm run validate
```

## Package-Specific Scripts (mcp:\*)

These scripts target the `@dependency-doctor/mcp` package directly:

### `npm run mcp:build`

Direct build command for the MCP package.

```bash
npm run mcp:build
```

### `npm run mcp:dev`

Direct development command for the MCP package.

```bash
npm run mcp:dev
```

### `npm run mcp:lint`

Direct linting command for the MCP package.

```bash
npm run mcp:lint
```

### `npm run mcp:start`

Direct start command for the MCP package.

```bash
npm run mcp:start
```

### `npm run mcp:test`

Direct test command for the MCP package.

```bash
npm run mcp:test
```

### `npm run mcp:test:coverage`

Direct test with coverage command for the MCP package.

```bash
npm run mcp:test:coverage
```

### `npm run mcp:test:ui`

Direct test UI command for the MCP package.

```bash
npm run mcp:test:ui
```

### `npm run mcp:typecheck`

Direct TypeScript validation for the MCP package.

```bash
npm run mcp:typecheck
```

## Script Organization

The scripts are organized into two categories:

1. **Main scripts**: Convenient commands that delegate to package-specific implementations
2. **Package-specific scripts** (`mcp:*`): Direct commands that target specific packages

This pattern allows for:

- Easy workspace-level commands for common tasks
- Specific package targeting when needed
- Consistent command structure across the workspace
- Future scalability as more packages are added

## Recommended Workflow

For local development, the recommended workflow is:

1. `npm run dev` - Start development server
2. Make your changes
3. `npm run validate` - Run all checks before committing
4. `npm run build` - Ensure the build works
5. Commit and push
