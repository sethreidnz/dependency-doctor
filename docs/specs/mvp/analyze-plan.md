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

### Phase 4: Define tool for analyzing dependencies

- `analyzeDependencies()`
  - name: analyzeDependencyInfo
  - description: Runs the commands to get the outdated and vulnerable dependencies and analyze and organism them into the status.md file for the given package manager
  - description:
    1. Loads the registered plugin for that package manager e.g. packages/mcp/src/plugins/{packageManager}/PackageManagerPlugin.ts
    2. Calls IPackageManagerPlugin.getDependencyInfo() which creates output file .dependency-doctor/{packageManager}/dependency-info.json
    3. Create a resource that points to the file path from the previous step e.g. /:packageManager/dependency-info.json
    4. Calls IPackageManagerPlugin.analyzeDependencyInfo() which creates output file .dependency-doctor/{packageManager}/status.md
    5. Create a resource that is the file path from the previous step e.g. /:packageManager/status.md
  - inputs:
    packageManager: PackageManager (enum)
  - output:
    - file created: .dependency-doctor/{packageManager}/dependency-info.json
    - file created: .dependency-doctor/{packageManager}/status.md
    - resource: /:packageManager/dependency-info.json
    - resource: /:packageManager/status.md

### Phase 3: Add basic project settings infra

In this phase we will establish the patterns and build out a project config system so that users can set project and package manager specific details as well as a folder where dependency doctor outputs can go. This will be something like

```bash
.dependency-doctor/
  npm/
    dependency-info.json # output from
    status.md # t
  settings.json # top level dependency doctor settings that are represented by packages/mcp/src/models/ProjectConfiguration.ts
```

For this phase we need to:

1. [x] Create a way to init a project which will create the file in the current project folder (relative to the npm package that dependency doctor is installed in) .dependency-doctor/settings.json by running `npx @dependency-doctor/mcp init`
1. [x] Complete the modeling in packages/mcp/src/models/ProjectConfiguration.ts so we can have the user have a settings file like this for ea

   ```json
   {
     "version": "1.0.0",
     "npm": {
       "enabled": "true"
     }
   }
   ```

1. [ ] Complete the repo packages/mcp/src/repository/projectConfig/ProjectConfigurationRepository.ts so it loads up the config file into memory this will be a singleton
1. [ ] Register it in. the service container DI

### Phase 3: Complete plugin repository

Next we will need to finish the plugin infrastructure which mainly means:

1. [ ] Finish the implementation of packages/mcp/src/repository/pluginRepository/PackageManagerPluginRepository.ts so that it can be a singleton that has the registered plugins for the values in PackageManager. For now we will just have npm.
1. [ ] Register it in. the service container DI

### Phase 4: Implement npm plugin

TBC

### Phase 5:
