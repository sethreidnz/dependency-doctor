# NPM Workspace Scripts

This document outlines all the npm scripts available in the project and what they do.

## Main Scripts (Alphabetical)

### `npm run build`

Builds the entire workspace for production.

```bash
npm run build
```

**What it does:** Runs `npm run mcp:build` which builds the `@dependency-doctor/mcp` package using workspace delegation.

### `npm run dev`

Starts the MCP server in development mode with hot reloading.

```bash
npm run dev
```

**What it does:** Runs `npm run mcp:dev` which starts development mode for the `@dependency-doctor/mcp` package.

### `npm run lint`

Runs ESLint checks across the workspace.

```bash
npm run lint
```

**What it does:** Runs `npm run mcp:lint` which executes ESLint with caching for the dependency-doctor package using the package-specific configuration.

### `npm run spellcheck`

Runs spellchecking across all documentation and code comments.

```bash
npm run spellcheck
```

**What it does:** Executes `cspell .` to check spelling across the entire workspace using the configured dictionaries and ignore patterns.

### `npm run start`

Starts the built MCP server for production use.

```bash
npm run start
```

**What it does:** Runs `npm run mcp:start` which starts the compiled `@dependency-doctor/mcp` package.

### `npm run test`

Executes the test suite for the workspace.

```bash
npm run test
```

**What it does:** Runs `npm run mcp:test` which executes Vitest tests using the workspace configuration.

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

**What it does:** Runs `npm run mcp:test:ui` which starts the Vitest UI for interactive test debugging and execution.

### `npm run typecheck`

Runs TypeScript type checking across all workspace packages.

```bash
npm run typecheck
```

**What it does:** Runs `npm run mcp:typecheck` which executes `tsc -p packages/dependency-doctor --noEmit` to validate types without emitting files.

### `npm run validate`

**🎯 Meta-script:** Runs all validation checks in parallel before pushing.

```bash
npm run validate
```

**What it does:** Executes `run-p lint typecheck test spellcheck` to run all quality assurance checks simultaneously. This mirrors the same validation that runs in the GitHub Actions CI pipeline.

## Package-Specific Scripts (mcp:*)

These scripts target the `@dependency-doctor/mcp` package directly:

### `npm run mcp:build`

Direct build command for the MCP package.

```bash
npm run mcp:build
```

**What it does:** Runs `npm run -w @dependency-doctor/mcp build` using workspace delegation.

### `npm run mcp:dev`

Direct development command for the MCP package.

```bash
npm run mcp:dev
```

**What it does:** Runs `npm run -w @dependency-doctor/mcp dev` using workspace delegation.

### `npm run mcp:lint`

Direct linting command for the MCP package.

```bash
npm run mcp:lint
```

**What it does:** Executes `eslint packages/dependency-doctor --config packages/dependency-doctor/eslint.config.js --cache --cache-location .eslintcache`.

### `npm run mcp:start`

Direct start command for the MCP package.

```bash
npm run mcp:start
```

**What it does:** Runs `npm run -w @dependency-doctor/mcp start` using workspace delegation.

### `npm run mcp:test`

Direct test command for the MCP package.

```bash
npm run mcp:test
```

**What it does:** Executes `vitest run --config packages/dependency-doctor/vitest.config.ts`.

### `npm run mcp:test:coverage`

Direct test with coverage command for the MCP package.

```bash
npm run mcp:test:coverage
```

**What it does:** Executes `vitest run --coverage --config packages/dependency-doctor/vitest.config.ts`.

### `npm run mcp:test:ui`

Direct test UI command for the MCP package.

```bash
npm run mcp:test:ui
```

**What it does:** Executes `vitest --ui --config packages/dependency-doctor/vitest.config.ts`.

### `npm run mcp:typecheck`

Direct TypeScript validation for the MCP package.

```bash
npm run mcp:typecheck
```

**What it does:** Executes `tsc -p packages/dependency-doctor --noEmit`.

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
