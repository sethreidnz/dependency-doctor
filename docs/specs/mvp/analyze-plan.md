# Analyze plan

This is the plan for implementing the analyze phase of the [spec for creating the MVP dependency doctor MCP server](./spec.md)

## General instructions

- Always check off each step after you have done it from [ ] to [x]
- Always update the execution notes after each step with what was done in a terse format
- Refer back to the [spec for full details on the plan](./spec.md)

## Step-by-step plan

### Testing Strategy

Each step should include using test driven development TDD:

- Unit tests for interfaces and implementations
- Mock implementations for testing isolation

### Phase 1: Infrastructure Setup

**Step 1: Set up dependency injection infrastructure**

- [x] Add tsyringe and pino dependencies to package.json
- [x] Create `src/ServiceConfiguration.ts` with ServiceContainer setup
- [x] Create `src/enums/InjectionTokens.ts` for DI tokens
- [x] Set up logger configuration with pino
- [x] Add "reflect-metadata" import to main entry point
- [x] Create `src/ServiceConfiguration.test.ts` - test DI container setup and registration
- [x] Create `src/enums/InjectionTokens.test.ts` - test token uniqueness and availability

**Step 2: Create abstraction interfaces**

- [x] Create `src/services/fileSystem/IFileSystem.ts` interface
- [x] Create `src/services/fileSystem/FileSystem.ts` implementation
- [x] ~~Create `src/services/childProcess/IChildProcess.ts` interface~~ (Replaced with execa)
- [x] ~~Create `src/services/childProcess/ChildProcess.ts` implementation~~ (Replaced with execa)
- [x] Add `execa` dependency for shell command execution with better DX
- [x] Register implementations in ServiceContainer
- [x] No tests needed for these ones

### Phase 2: Data Models and Architecture

**Step 3: Define data models**

- [x] Create `src/models/AppError.ts` - custom error class with `fromError()` and `fromUnknown()` methods
- [x] Create `src/models/AppError.test.ts` - comprehensive tests using whole-object assertion pattern
- [x] Create `src/models/PackageInformation.ts` - generic package info interface (already exists)
- [ ] Create `src/models/AnalyzedDependencies.ts` - analyzed output format
- [ ] Create `src/plugins/npm/OutdatedJson.ts` `src/plugins/npm/AuditJson.ts` - raw npm command outputs from the --json commands and then a combined model of that with `{ outdated: OutdatedJson; audit: AuditJson; }`
- [ ] Include dependency grouping, classification, difficulty assessment
- [ ] Create `src/models/AnalyzedDependencies.test.ts` - test analysis result structure and grouping logic

**Step 4: Define analyze process integration points**

- [] Map out the clear steps involved in the analyze process from the spec:
  - Session notes creation
  - Raw data collection (npm outdated, npm audit)
  - Dependency classification and grouping
  - Status document generation
  - Template updates
- [] Define integration points for the plugin system
- [] Create `src/analyze/AnalyzeProcess.test.ts` - test the analyze workflow integration points and step sequencing

**Step 5: Design plugin system architecture**

- [] Create `src/plugins/IPackageManagerPlugin.ts` interface
- [] Define analyze process steps as plugin methods:
  - `outdated()` - where user can define the way that you get the json and also how to transform it into the generic format we have
  - `analyze()` - this takes in the output of outdated() and then they can define a custom way of analyzing them that might include steps like fetching peer deps and things like that specific to their package manager
- [] Create `src/services/IPluginRegistry.ts` and implementation for the management of plugins. This can be a singleton and is an internal thing where we register known plugins which exist in the /plugins folder
- [] Create `src/plugins/IPackageManagerPlugin.test.ts` - test plugin interface contract and method signatures
- [] Create `src/services/PluginRegistry.test.ts` - test plugin registration, discovery, and retrieval

### Phase 3: NPM Implementation

**Step 6: Implement npm plugin**

- [] Create `src/plugins/npm.ts` implementing IPackageManagerPlugin (following high-level plan path)
- [] Define DTOs within the file for raw outputs:
  - NpmOutdatedJson for `npm outdated --json` response
  - NpmAuditJson for `npm audit --json` response
- [] Implement npm command execution using `IFileSystem` and `IChildProcess`
- [] Implement dependency classification logic
- [] Create `src/plugins/npm.test.ts` - unit tests for npm plugin with mocked command execution
- [] Create `src/plugins/npm.integration.test.ts` - integration tests with real npm commands (CI-safe)

**Step 7: Create dependency service**

- [] Create `src/services/IDependencyService.ts` interface
- [] Create `src/services/DependencyService.ts` implementation
- [] Implement `analyze()` method that:
  - Uses plugin to collect raw data
  - Uses plugin to classify dependencies
  - Manages workspace file creation/updates
  - Returns analysis results
- [] Create `src/services/DependencyService.test.ts` - unit tests with mocked plugins and file operations

### Phase 4: Templates and Resources

**Step 8: Create templates**

- [] Create the template for `templates/status.md` with proper structure for dependency groupings
- [] Create the template for `templates/session-notes/analyze.md` for analysis sessions
- [] Ensure templates align with the analyze workflow requirements - this will be used by the LLM really to update and just to copy over at the start when someone inits or whatever. Not really templating engine or anything yet

**Step 9: Create MCP resources**

- [] Resource: `package_json_files` - array of package.json file paths for the current directory
- [] Resource: `dependency_doctor_config` - dependency doctor settings file (config.yml)
- [] Resource: `status_document` - status.md file content
- [] Resource: `raw_dependency_data` - raw npm output json
- [] Resource: `analyzed_dependencies` - analyzed dependency json
- [] Resource: `current_session_notes` - current session notes
- [] Create `src/resources/McpResources.test.ts` - test resource discovery, access control, and data serialization (if testing makes sense here?)

**Step 10: Create MCP analyze tool**

- [] Create `src/tools/analyze-dependencies.ts`
- [] Implement `analyze` tool that does the whole analyze flow:
  - Creates .dependency-doctor/ workspace structure
  - Runs dependency analysis via IDependencyService
  - Updates all workspace files (raw.json, analyzed.json, status.md)
  - Creates session notes from template
  - Updates the templates and resources
  - Returns analysis summary
- [] Create `src/tools/analyze-dependencies.test.ts` - unit tests with mocked dependencies and file operations

### Phase 5: UX and Workflow

**Step 11: Create prompts and workflow**

- [] Create MCP prompt for going through the analyze process
- [] Add user interaction for configuration and approval
- [] Integrate with dependency injection and logging setup from reference project pattern
- [] Create `src/prompts/AnalyzeWorkflow.test.ts` - test prompt generation and user interaction flows

## Execution notes

### Phase 1: Infrastructure Setup ✅ COMPLETED

**Step 1: Set up dependency injection infrastructure**

- ✅ Added tsyringe, pino, reflect-metadata dependencies to package.json
- ✅ Created ServiceConfiguration.ts with DI container setup and pino logger configuration
- ✅ Created InjectionTokens.ts enum for type-safe dependency injection tokens
- ✅ Set up reflect-metadata import in ServiceConfiguration.ts
- ✅ Skipped individual test files for tokens and service config as agreed

**Step 2: Create abstraction interfaces**

- ✅ Created IFileSystem.ts interface for file operations (already existed)
- ✅ Created FileSystem.ts implementation using Node.js fs promises with @injectable decorator
- ✅ ~~Created IChildProcess.ts interface extending Node.js ExecOptions for type safety~~ (Replaced with execa)
- ✅ ~~Created ChildProcess.ts simplified implementation using promisified exec~~ (Replaced with execa)
- ✅ Added `execa` package for better shell command execution DX
- ✅ Removed custom ChildProcess implementation and all related files and DI registrations
- ✅ Registered remaining implementations in ServiceConfiguration DI container
- ✅ ~~Created basic tests for ChildProcess class with vitest setup~~ (Removed with ChildProcess)
- ✅ Set up test infrastructure with setupTests.ts and vitest configuration
- ✅ Fixed root-level test script to work conveniently from workspace root

**Infrastructure Status**: All Phase 1 tasks complete. Build ✅, Tests ✅ (8/8 passing), TypeScript ✅

### Phase 2: Data Models and Architecture 🚧 IN PROGRESS

**Step 3: Define data models**

- ✅ Created AppError.ts custom error class with `fromError()` and `fromUnknown()` static methods
- ✅ Created AppError.test.ts with comprehensive test coverage using whole-object assertion pattern
- ✅ Updated ChildProcess usage to use new AppError class before removal
- ✅ PackageInformation.ts already exists with UpgradeType enum integration
