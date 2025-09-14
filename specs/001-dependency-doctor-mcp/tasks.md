# Tasks: Dependency Doctor MCP MVP

**Input**: Design documents from `/specs/001-dependency-doctor-mcp/`
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
- **MCP project**: `packages/dependency-doctor/src/`, `packages/dependency-doctor/tests/`
- Based on plan.md: Single project structure within existing workspace

## Phase 3.1: Setup
- [ ] T001 Create MCP project structure in packages/dependency-doctor per xmcp requirements
- [ ] T002 Initialize TypeScript project with xmcp dependencies and pino logging
- [ ] T003 [P] Configure Vitest test framework for behavior-driven development
- [ ] T004 [P] Set up ESLint configuration extending workspace base config

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### MCP Contract Tests
- [ ] T005 [P] Contract test analyze_dependencies tool in packages/dependency-doctor/tests/contract/analyze-dependencies.test.ts
- [ ] T006 [P] Contract test create_upgrade_groups tool in packages/dependency-doctor/tests/contract/create-upgrade-groups.test.ts
- [ ] T007 [P] Contract test execute_upgrade tool in packages/dependency-doctor/tests/contract/execute-upgrade.test.ts
- [ ] T008 [P] Contract test rollback_upgrade tool in packages/dependency-doctor/tests/contract/rollback-upgrade.test.ts
- [ ] T009 [P] Contract test workspace_config resource in packages/dependency-doctor/tests/contract/workspace-config.test.ts
- [ ] T010 [P] Contract test upgrade_documentation resource in packages/dependency-doctor/tests/contract/upgrade-documentation.test.ts

### Integration Tests (User Scenarios)
- [ ] T011 [P] Integration test dependency analysis workflow in packages/dependency-doctor/tests/integration/dependency-analysis.test.ts
- [ ] T012 [P] Integration test package grouping workflow in packages/dependency-doctor/tests/integration/package-grouping.test.ts
- [ ] T013 [P] Integration test upgrade execution workflow in packages/dependency-doctor/tests/integration/upgrade-execution.test.ts
- [ ] T014 [P] Integration test rollback workflow in packages/dependency-doctor/tests/integration/rollback.test.ts
- [ ] T015 [P] Integration test security vulnerability prioritization in packages/dependency-doctor/tests/integration/security-analysis.test.ts

## Phase 3.3: Core Models (ONLY after tests are failing)
- [ ] T016 [P] Package model in packages/dependency-doctor/src/models/Package.ts
- [ ] T017 [P] UpgradeGroup model in packages/dependency-doctor/src/models/UpgradeGroup.ts
- [ ] T018 [P] VulnerabilityReport model in packages/dependency-doctor/src/models/VulnerabilityReport.ts
- [ ] T019 [P] UpgradeSession model in packages/dependency-doctor/src/models/UpgradeSession.ts
- [ ] T020 [P] WorkspaceConfiguration model in packages/dependency-doctor/src/models/WorkspaceConfiguration.ts
- [ ] T021 [P] UpgradeDocumentation model in packages/dependency-doctor/src/models/UpgradeDocumentation.ts

## Phase 3.4: Services (Models must be complete)
- [ ] T022 [P] PackageAnalyzer service in packages/dependency-doctor/src/services/PackageAnalyzer.ts
- [ ] T023 [P] UpgradeOrchestrator service in packages/dependency-doctor/src/services/UpgradeOrchestrator.ts
- [ ] T024 [P] WorkspaceManager service in packages/dependency-doctor/src/services/WorkspaceManager.ts
- [ ] T025 [P] VulnerabilityScanner service in packages/dependency-doctor/src/services/VulnerabilityScanner.ts

## Phase 3.5: MCP Tools Implementation
- [ ] T026 Implement analyze_dependencies MCP tool in packages/dependency-doctor/src/tools/analyze-dependencies.ts
- [ ] T027 Implement create_upgrade_groups MCP tool in packages/dependency-doctor/src/tools/create-upgrade-groups.ts
- [ ] T028 Implement execute_upgrade MCP tool in packages/dependency-doctor/src/tools/execute-upgrade.ts
- [ ] T029 Implement rollback_upgrade MCP tool in packages/dependency-doctor/src/tools/rollback-upgrade.ts

## Phase 3.6: MCP Resources Implementation
- [ ] T030 [P] Implement workspace_config resource in packages/dependency-doctor/src/resources/workspace-config.ts
- [ ] T031 [P] Implement upgrade_documentation resource in packages/dependency-doctor/src/resources/upgrade-documentation.ts
- [ ] T032 [P] Implement session_state resource in packages/dependency-doctor/src/resources/session-state.ts

## Phase 3.7: Core Infrastructure
- [ ] T033 npm CLI integration utilities in packages/dependency-doctor/src/lib/npm-utils.ts
- [ ] T034 File system utilities for workspace management in packages/dependency-doctor/src/lib/fs-utils.ts
- [ ] T035 Structured logging setup with pino in packages/dependency-doctor/src/lib/logger.ts
- [ ] T036 Error handling and MCP error responses in packages/dependency-doctor/src/lib/errors.ts

## Phase 3.8: MCP Server Setup
- [ ] T037 Configure xmcp server entry point in packages/dependency-doctor/src/index.ts
- [ ] T038 Register MCP tools and resources in packages/dependency-doctor/src/server.ts
- [ ] T039 Configure xmcp.config.ts for MCP server compilation

## Phase 3.9: Polish & Validation
- [ ] T040 [P] Unit tests for Package model in packages/dependency-doctor/tests/unit/models/Package.test.ts
- [ ] T041 [P] Unit tests for PackageAnalyzer service in packages/dependency-doctor/tests/unit/services/PackageAnalyzer.test.ts
- [ ] T042 [P] Unit tests for npm utilities in packages/dependency-doctor/tests/unit/lib/npm-utils.test.ts
- [ ] T043 [P] Performance tests for large repositories (1000+ dependencies) in packages/dependency-doctor/tests/performance/large-repo.test.ts
- [ ] T044 End-to-end test using quickstart scenarios in packages/dependency-doctor/tests/e2e/quickstart.test.ts
- [ ] T045 Update workspace package.json scripts for MCP development
- [ ] T046 Create MCP server README and documentation
- [ ] T047 Manual validation using quickstart.md scenarios

## Dependencies
```
Setup (T001-T004) before all other phases
Tests (T005-T015) before implementation (T016-T039)
Models (T016-T021) before Services (T022-T025)
Services (T022-T025) before Tools (T026-T029) and Resources (T030-T032)
Infrastructure (T033-T036) before Server Setup (T037-T039)
All core implementation before Polish (T040-T047)
```

## Parallel Execution Examples

### Phase 3.2 - Contract Tests (Launch together)
```bash
# All contract tests can run in parallel (different files)
Task: "Contract test analyze_dependencies tool in packages/dependency-doctor/tests/contract/analyze-dependencies.test.ts"
Task: "Contract test create_upgrade_groups tool in packages/dependency-doctor/tests/contract/create-upgrade-groups.test.ts" 
Task: "Contract test execute_upgrade tool in packages/dependency-doctor/tests/contract/execute-upgrade.test.ts"
Task: "Contract test rollback_upgrade tool in packages/dependency-doctor/tests/contract/rollback-upgrade.test.ts"
```

### Phase 3.3 - Model Creation (Launch together)
```bash
# All models can be created in parallel (different files)
Task: "Package model in packages/dependency-doctor/src/models/Package.ts"
Task: "UpgradeGroup model in packages/dependency-doctor/src/models/UpgradeGroup.ts"
Task: "VulnerabilityReport model in packages/dependency-doctor/src/models/VulnerabilityReport.ts"
Task: "UpgradeSession model in packages/dependency-doctor/src/models/UpgradeSession.ts"
```

### Phase 3.4 - Service Implementation (Launch together after models)
```bash
# All services can be implemented in parallel (different files)
Task: "PackageAnalyzer service in packages/dependency-doctor/src/services/PackageAnalyzer.ts"
Task: "UpgradeOrchestrator service in packages/dependency-doctor/src/services/UpgradeOrchestrator.ts"
Task: "WorkspaceManager service in packages/dependency-doctor/src/services/WorkspaceManager.ts"
Task: "VulnerabilityScanner service in packages/dependency-doctor/src/services/VulnerabilityScanner.ts"
```

## Task Generation Rules Applied

1. **From MCP Schema Contracts**:
   - analyze_dependencies → T005 (contract test) + T026 (implementation)
   - create_upgrade_groups → T006 (contract test) + T027 (implementation)
   - execute_upgrade → T007 (contract test) + T028 (implementation)
   - rollback_upgrade → T008 (contract test) + T029 (implementation)
   - workspace_config → T009 (contract test) + T030 (implementation)
   - upgrade_documentation → T010 (contract test) + T031 (implementation)

2. **From Data Model Entities**:
   - Package → T016 (model) + T040 (unit test)
   - UpgradeGroup → T017 (model)
   - VulnerabilityReport → T018 (model)
   - UpgradeSession → T019 (model)
   - WorkspaceConfiguration → T020 (model)
   - UpgradeDocumentation → T021 (model)

3. **From User Stories (Quickstart)**:
   - Dependency analysis → T011 (integration test)
   - Package grouping → T012 (integration test)
   - Upgrade execution → T013 (integration test)
   - Rollback capability → T014 (integration test)
   - Security prioritization → T015 (integration test)

4. **TDD Ordering Applied**:
   - All tests (T005-T015) before implementation (T016+)
   - Contract tests validate MCP protocol compliance
   - Integration tests validate user workflows
   - Unit tests validate individual components

## Validation Checklist
✅ **GATE: All items checked**

- [x] All MCP tools have corresponding contract tests (T005-T008 → T026-T029)
- [x] All MCP resources have corresponding contract tests (T009-T010 → T030-T032)
- [x] All entities have model tasks (6 entities → T016-T021)
- [x] All tests come before implementation (T005-T015 before T016+)
- [x] Parallel tasks are truly independent (different files, no shared state)
- [x] Each task specifies exact file path in packages/dependency-doctor/
- [x] No task modifies same file as another [P] task
- [x] TDD cycle enforced (contract tests → integration tests → implementation)
- [x] Real dependencies used for integration tests (npm CLI, file system)
- [x] Mocks allowed for unit tests (T040-T042)

## Notes
- **[P] tasks**: Different files, no dependencies - can run in parallel
- **Sequential tasks**: Same file or dependencies - must run in order
- **TDD enforcement**: Tests must fail before implementing features
- **Commit strategy**: Commit after each task completion
- **MCP compliance**: Contract tests ensure protocol adherence
- **Performance target**: Handle 1000+ dependencies in <30s (T043)
- **Manual validation**: Use quickstart.md for final verification (T047)