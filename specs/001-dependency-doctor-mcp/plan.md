# Implementation Plan: Dependency Doctor MCP MVP

**Branch**: `001-dependency-doctor-mcp` | **Date**: 2025-01-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-dependency-doctor-mcp/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

Primary requirement: Build an MCP server that helps developers interactively upgrade outdated and vulnerable packages in their repositories. Technical approach: Start with npm support using pluggable architecture for extensibility, collaborative upgrade workflows with safety features, and workspace configuration with documentation generation.

## Technical Context

**Language/Version**: TypeScript (ES2022, Node.js 22.15.0) - from project context  
**Primary Dependencies**: xmcp (https://xmcp.dev/docs#create-a-new-xmcp-app), npm CLI for package analysis, @types/node  
**Storage**: File system for workspace configuration, markdown files for documentation  
**Testing**: TDD approach with existing test framework from project using Vitest
**Target Platform**: Node.js server environment, MCP protocol  
**Project Type**: single - MCP server library with CLI interface  
**Performance Goals**: Handle repositories with 1000+ dependencies, analysis under 30s  
**Constraints**: Must integrate with existing TypeScript workspace, follow MCP protocol specs  
**Scale/Scope**: MVP supports npm, extensible to other package managers, single-user workflows

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

**Simplicity**:

- Projects: 1 (MCP server package within existing workspace)
- Using framework directly? YES (xmcp for MCP compilation)
- Single data model? YES (package analysis results, upgrade sessions)
- Avoiding patterns? YES (direct CLI integration, no unnecessary abstractions)

**Architecture**:

- EVERY feature as library? No simple structure for now everything in the existing mcp project
- CLI per library: No simple structure for now everything in the existing mcp project and happening in the mcp server no cli

**Testing (NON-NEGOTIABLE)**:

- RED-GREEN-Refactor cycle enforced? YES
- Git commits show tests before implementation? REQUIRED
- Order: Contract→Integration→E2E→Unit strictly followed? YES
- Real dependencies used? NO not for unit tests, we can mock those
- Integration tests for: intended MCP interface compliance, npm CLI integration, file system operations
- FORBIDDEN: Implementation before test, skipping RED phase

**Observability**:

- Structured logging included? YES (add package pino for now for console logging for debugging)
- Frontend logs → backend? N/A (server-only MCP)
- Error context sufficient? YES (package names, versions, failure reasons)

**Versioning**:

- Version number assigned? 0.1.0 (MVP release)
- BUILD increments on every change? YES
- Breaking changes handled? YES (MCP protocol compatibility)

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```bash
# Single Project
packages/mcp # the main source code using xmcp
├── models/
├── services/
├── cli/
└── lib/
```

## Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   ✅ **COMPLETED**: All technical unknowns resolved through research

   - MCP protocol specifications and implementation patterns
   - npm CLI integration approaches
   - Package vulnerability detection methods
   - TypeScript plugin architecture patterns
   - File system workspace management patterns

2. **Generate and dispatch research agents**:
   ✅ **COMPLETED**: Research conducted and consolidated

   - MCP server implementation with xmcp framework
   - npm CLI programmatic integration patterns
   - Plugin architecture for package manager extensibility
   - Security vulnerability detection with multi-source approach
   - Performance optimization strategies

3. **Consolidate findings** in `research.md`:
   ✅ **COMPLETED**: All findings documented with decisions, rationale, and alternatives

**Output**: ✅ research.md created with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts

_Prerequisites: research.md complete_

1. **Extract entities from feature spec** → `data-model.md`:

   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:

   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:

   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:

   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `/scripts/powershell/update-agent-context.ps1 -AgentType claude` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: ✅ data-model.md, /contracts/mcp-schema.json, quickstart.md, CLAUDE.md all created

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

✅ **APPROACH DEFINED**: Task generation strategy documented for /tasks command execution

**Task Generation Strategy**:

- Load `/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each MCP tool → contract test task [P]
- Each entity → model creation task [P]
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:

- TDD order: Tests before implementation
- Dependency order: Models before services before MCP handlers
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: ✅ This phase planning is COMPLETE - ready for /tasks command execution

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md following constitutional principles)
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking

_Fill ONLY if Constitution Check has violations that must be justified_

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---

_Based on Constitution v2.1.1 - See `/memory/constitution.md`_

```

```
