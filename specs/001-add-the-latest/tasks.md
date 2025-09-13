# Tasks: ESLint Configuration and Code Quality System

**Input**: Design documents from `/specs/001-add-the-latest/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- Paths assume single project structure as per plan.md

## Phase 3.1: Setup
- [ ] T001 Install ESLint dependencies (eslint@^9.0.0, @typescript-eslint/parser@^7.0.0, @typescript-eslint/eslint-plugin@^7.0.0) in package.json
- [ ] T002 [P] Create project directories for configuration files and tests
- [ ] T003 [P] Initialize .eslintcache file in repository root

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] Base configuration validation test in tests/eslint/test-base-config.js
- [ ] T005 [P] Package configuration validation test in tests/eslint/test-package-config.js
- [ ] T006 [P] npm script execution test in tests/eslint/test-lint-commands.js
- [ ] T007 [P] Integration test for workspace linting in tests/integration/test-workspace-linting.js
- [ ] T008 [P] Configuration inheritance test in tests/eslint/test-config-inheritance.js
- [ ] T009 [P] Error detection validation test in tests/eslint/test-error-detection.js

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T010 [P] Base ESLint configuration in /eslint.config.js
- [ ] T011 [P] Package-specific ESLint configuration in /packages/dependency-doctor/eslint.config.js
- [ ] T012 Update root package.json with lint and mcp:lint scripts
- [ ] T013 [P] Cache configuration setup (.eslintcache handling)
- [ ] T014 [P] TypeScript parser integration in base configuration
- [ ] T015 [P] Rule set configuration (recommended + type-checked + strict rules)

## Phase 3.4: Integration
- [ ] T016 VSCode settings configuration in .vscode/settings.json
- [ ] T017 Integration with existing npm script patterns (following mcp:* convention)
- [ ] T018 Performance optimization (caching, file targeting)
- [ ] T019 Error reporting and output formatting validation

## Phase 3.5: Polish
- [ ] T020 [P] Unit tests for configuration loading in tests/unit/test-config-loading.js
- [ ] T021 [P] Performance tests (verify <30s initial run, <5s cached run)
- [ ] T022 [P] Update docs/internal/project-setup/npm-workspace-scripts.md with linting commands
- [ ] T023 [P] Create sample TypeScript files for validation testing
- [ ] T024 Validate complete quickstart.md workflow end-to-end
- [ ] T025 [P] Remove any temporary test files and clean up

## Dependencies
- Dependencies installation (T001) before all other tasks
- Test tasks (T004-T009) before implementation (T010-T015)
- T010 (base config) blocks T011 (package config), T017 (npm integration)
- T011 blocks T008 (inheritance test execution)
- T012 blocks T006 (script execution test)
- Implementation (T010-T015) before integration (T016-T019)
- Integration before polish (T020-T025)

## Parallel Example
```
# Launch T004-T009 together (Tests First Phase):
Task: "Base configuration validation test in tests/eslint/test-base-config.js"
Task: "Package configuration validation test in tests/eslint/test-package-config.js"
Task: "npm script execution test in tests/eslint/test-lint-commands.js"
Task: "Integration test for workspace linting in tests/integration/test-workspace-linting.js"
Task: "Configuration inheritance test in tests/eslint/test-config-inheritance.js"
Task: "Error detection validation test in tests/eslint/test-error-detection.js"

# Launch T010-T011, T013-T015 together (Core Implementation Phase):
Task: "Base ESLint configuration in /eslint.config.js"
Task: "Package-specific ESLint configuration in /packages/dependency-doctor/eslint.config.js"
Task: "Cache configuration setup (.eslintcache handling)"
Task: "TypeScript parser integration in base configuration"
Task: "Rule set configuration (recommended + type-checked + strict rules)"
```

## Task Details

### T001: Install ESLint Dependencies
Install required npm packages following research.md recommendations:
- eslint@^9.0.0 (latest flat config support)
- @typescript-eslint/parser@^7.0.0 (TypeScript parsing)
- @typescript-eslint/eslint-plugin@^7.0.0 (TypeScript rules)
Add to package.json devDependencies and run npm install.

### T004: Base Configuration Validation Test
Create test that validates:
- Base configuration exports default array
- Configuration objects have required properties (files, languageOptions, plugins, rules)
- TypeScript parser is properly configured
- Rule definitions follow contract specifications
Must fail initially (no base config exists yet).

### T005: Package Configuration Validation Test
Create test that validates:
- Package config properly imports base configuration
- Package config extends base with spread operator
- Package-specific rules are properly merged
- TypeScript project path points to local tsconfig.json
Must fail initially (no package config exists yet).

### T006: npm Script Execution Test
Create test that validates:
- `npm run lint` command executes without errors
- `npm run mcp:lint` command targets correct files
- Commands use proper ESLint CLI flags (--cache, --config)
- Exit codes are correct (0 for success, 1 for lint errors)
Must fail initially (no scripts exist yet).

### T010: Base ESLint Configuration
Create /eslint.config.js following contracts/eslint-config.md:
- Import @typescript-eslint/parser and @typescript-eslint/eslint-plugin
- Export default array with configuration object
- Configure files pattern for TypeScript/JavaScript files
- Set up parser options with project reference to tsconfig.base.json
- Include recommended + type-checked rule sets from research.md
- Add custom rules (@typescript-eslint/no-unused-vars, prefer-const, no-explicit-any)

### T011: Package-Specific ESLint Configuration
Create /packages/dependency-doctor/eslint.config.js:
- Import base configuration from ../../eslint.config.js
- Spread base configuration in export array
- Add package-specific configuration object
- Configure parser options to reference local tsconfig.json
- Include any package-specific rule overrides if needed

### T012: Update Package Scripts
Modify root package.json to add:
- "lint": "npm run mcp:lint" (following established pattern)
- "mcp:lint": "eslint packages/dependency-doctor --config packages/dependency-doctor/eslint.config.js --cache --cache-location .eslintcache"
Ensure scripts follow existing mcp:* convention and include performance optimizations.

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Follow existing workspace patterns (base + package override)
- Ensure TypeScript integration aligns with existing tsconfig setup

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Base Configuration Contract → T004, T010
   - Package Configuration Contract → T005, T011
   - npm Script Contract → T006, T012
   - Error Output Contract → T009, T019
   
2. **From Data Model**:
   - Base ESLint Configuration entity → T010, T014, T015
   - Package-Specific Configuration entity → T011
   - Linting Command Configuration entity → T012, T017
   
3. **From User Stories**:
   - Workspace linting scenario → T007
   - Configuration validation scenario → T008
   - Developer workflow integration → T016, T024

4. **Ordering**:
   - Setup → Tests → Configurations → Scripts → Integration → Polish
   - Dependencies prevent inappropriate parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests (T004-T009)
- [x] All entities have implementation tasks (T010-T015)
- [x] All tests come before implementation (TDD enforced)
- [x] Parallel tasks truly independent (different files)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Follows established workspace patterns
- [x] Integrates with existing npm script conventions