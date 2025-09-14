# Analyze plan

This is the plan for implementing the analyze phase

## High-level plan

1. [ ] Add dependency injection and logging in the same way this project does with pino and tsyringe: /Users/seth/dev/microsoft/ev2-bicep/packages/cli/src/index.ts
1. [ ] Implement ./packages/mcp/src/services/fileSystem/IFileSystem.ts in same folder different file
1. [ ] Define a similar interface `IChildProcess` for abstracting the use of child_process and doing execution with streaming etc
1. [ ] Create the generic interface to represent PackageInformation in ./packages/mcp/src/models/PackageInformation.ts
1. [ ] Create the generic interface to represent output format for the `analyzed.json` in ./packages/mcp/src/models/AnalyzedDependencies.ts that will need to include things like the grouping and other stuff from the spec
1. [ ] Define the clear steps that are involved in the analyze process from the spec so we can define integration points for the plugin system
1. [ ] Define the plugin system that will allow users to implement the required steps for each language and package manager
1. [ ] Create a file ./packages/mcp/src/plugins/npm.ts where we implement the npm one using the `IFileSystem` and `IChildProcess` and also define the DTO for the raw outputs of the outdated and audit responses so we can put them in the raw.json file
1. [ ] Create a IDependencyService with `analyze` method that does the analysis and returns
1. [ ] Create the template for the status.md
1. [ ] Create the template for the analyze session notes
1. [ ] Create an mcp resource for the array of package.json file paths for the current directory
1. [ ] Create an mcp resource for the dependency doctor settings file
1. [ ] Create an mcp resource for the status.md file
1. [ ] Create an mcp resource for the raw npm output json
1. [ ] Create an mcp resource for the analyzed dependency json
1. [ ] Create an mcp resource for the current session notes
1. [ ] Create mcp tool for `analyze` => does the whole analyze flow, updating hte templates and what not and updates the resources and such
1. [ ] Create prompt for going through the process

## Step-by-step plan

### Testing Strategy

Each step should include using test driven development TDD:

- Unit tests for interfaces and implementations
- Integration tests for plugin functionality
- End-to-end tests for full analyze workflow
- Mock implementations for testing isolation

### Phase 1: Infrastructure Setup

**Step 1: Set up dependency injection infrastructure**

- Add tsyringe and pino dependencies to package.json
- Create `src/ServiceConfiguration.ts` with ServiceContainer setup
- Create `src/enums/InjectionTokens.ts` for DI tokens
- Set up logger configuration with pino
- Add "reflect-metadata" import to main entry point

**Step 2: Create abstraction interfaces**

- Create `src/services/fileSystem/IFileSystem.ts` interface
- Create `src/services/fileSystem/FileSystem.ts` implementation
- Create `src/services/childProcess/IChildProcess.ts` interface
- Create `src/services/childProcess/ChildProcess.ts` implementation
- Register implementations in ServiceContainer

### Phase 2: Data Models and Architecture

**Step 3: Define data models**

- Create `src/models/PackageInformation.ts` - generic package info interface
- Create `src/models/AnalyzedDependencies.ts` - analyzed output format
- Create `src/plugins/npm/OutdatedJson.ts` `src/plugins/npm/AuditJson.ts` - raw npm command outputs from the --json commands and then a combined model of that with `{ outdated: OutdatedJson; audit: AuditJson; }`
- Include dependency grouping, classification, difficulty assessment

**Step 4: Define analyze process integration points**

- Map out the clear steps involved in the analyze process from the spec:
  - Session notes creation
  - Raw data collection (npm outdated, npm audit)
  - Dependency classification and grouping
  - Status document generation
  - Template updates
- Define integration points for the plugin system

**Step 5: Design plugin system architecture**

- Create `src/plugins/IPackageManagerPlugin.ts` interface
- Define analyze process steps as plugin methods:
  - `outdated()` - where user can define the way that you get the json and also how to tranform it into the generic format we have
  - `analyze()` - this takes in the output of outdated() and then they can define a custom way of analysing them that might include steps like fetching peer deps and things like that specific to their package manager
- Create `src/services/IPluginRegistry.ts` and implementation for the management of plugins. This can be a singleton and is an internal thing where we register known plugins which exist in the /plugins folder

### Phase 3: NPM Implementation

**Step 6: Implement npm plugin**

- Create `src/plugins/npm.ts` implementing IPackageManagerPlugin (following high-level plan path)
- Define DTOs within the file for raw outputs:
  - NpmOutdatedJson for `npm outdated --json` response
  - NpmAuditJson for `npm audit --json` response
- Implement npm command execution using `IFileSystem` and `IChildProcess`
- Implement dependency classification logic

**Step 7: Create dependency service**

- Create `src/services/IDependencyService.ts` interface
- Create `src/services/DependencyService.ts` implementation
- Implement `analyze()` method that:
  - Uses plugin to collect raw data
  - Uses plugin to classify dependencies
  - Manages workspace file creation/updates
  - Returns analysis results

### Phase 4: Templates and Resources

**Step 8: Create templates**

- Create the template for `templates/status.md` with proper structure for dependency groupings
- Create the template for `templates/session-notes/analyze.md` for analysis sessions
- Ensure templates align with the analyze workflow requirements

**Step 9: Create MCP resources**

- Resource: `package_json_files` - array of package.json file paths for the current directory
- Resource: `dependency_doctor_config` - dependency doctor settings file (config.yml)
- Resource: `status_document` - status.md file content
- Resource: `raw_dependency_data` - raw npm output json
- Resource: `analyzed_dependencies` - analyzed dependency json
- Resource: `current_session_notes` - current session notes

**Step 10: Create MCP analyze tool**

- Create `src/tools/analyze-dependencies.ts`
- Implement `analyze` tool that does the whole analyze flow:
  - Creates .dependency-doctor/ workspace structure
  - Runs dependency analysis via IDependencyService
  - Updates all workspace files (raw.json, analyzed.json, status.md)
  - Creates session notes from template
  - Updates the templates and resources
  - Returns analysis summary

### Phase 5: UX and Workflow

**Step 11: Create prompts and workflow**

- Create MCP prompt for going through the analyze process
- Add user interaction for configuration and approval
- Integrate with dependency injection and logging setup from reference project pattern
