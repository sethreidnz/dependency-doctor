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

### Phase 2: Data Models 🚧 IN PROGRESS

**Step 3: Define core data models**

- [x] Create `src/models/AppError.ts` - custom error class with `fromError()` and `fromUnknown()` methods
- [x] Create `src/models/AppError.test.ts` - comprehensive tests using whole-object assertion pattern
- [x] Create `src/enums/VulnerabilitySeverity.ts` - generic vulnerability severity levels
- [x] Create `src/enums/PackageManager.ts` - supported package managers (npm for now)
- [x] Create `src/models/DependencyInfo.ts` - core package info interface with security data
- [x] Create `src/models/DependencyCollection.ts` - collection of DependencyInfo items
- [x] Create `src/plugins/npm/OutdatedJson.ts` - npm outdated --json output types
- [x] Create `src/plugins/npm/AuditJson.ts` - npm audit --json output types  
- [x] Create `src/plugins/npm/NpmRawData.ts` - combined npm data model
- [ ] Create tests for DependencyInfo and DependencyCollection models

**Data Model Structure:**
- `DependencyInfo`: Core interface with name, versions, upgradeType, and SecurityInfo
- `SecurityInfo`: Contains vulnerability data with severity, count, and details
- `VulnerabilityInfo`: Individual vulnerability with severity, title, url, id
- `DependencyCollection`: Array of DependencyInfo with metadata and PackageManager enum
- `PackageManager`: Enum with Npm (extensible for future package managers)

### Phase 3: Analysis and Plugin System

**Step 4: Design plugin system architecture**

- [ ] Create `src/plugins/IPackageManagerPlugin.ts` interface
- [ ] Define plugin contract with methods:
  - `collectRawData()` - fetch npm outdated and audit JSON
  - `transformToGeneric()` - convert raw npm data to DependencyInfo[]
- [ ] Create `src/services/IPluginRegistry.ts` and implementation for plugin management
- [ ] Create `src/plugins/IPackageManagerPlugin.test.ts` - test plugin interface contract

**Step 5: Implement npm plugin**

- [ ] Create `src/plugins/npm/NpmPlugin.ts` implementing IPackageManagerPlugin
- [ ] Implement npm command execution using `execa`
- [ ] Implement transformation from npm JSON to DependencyInfo[]
- [ ] Map npm vulnerability data to generic SecurityInfo structure
- [ ] Create `src/plugins/npm/NpmPlugin.test.ts` - unit tests with mocked command execution

**Step 6: Create dependency service**

- [ ] Create `src/services/IDependencyService.ts` interface
- [ ] Create `src/services/DependencyService.ts` implementation
- [ ] Implement `collect()` method that:
  - Uses plugin to collect raw data
  - Uses plugin to transform to generic format
  - Returns DependencyCollection
- [ ] Create `src/services/DependencyService.test.ts` - unit tests with mocked plugins

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
