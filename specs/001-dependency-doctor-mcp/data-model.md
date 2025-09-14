# Data Model: Dependency Doctor MCP MVP

## Core Entities

### Package
Represents a dependency in the repository with version and security information.

**Fields**:
- `name: string` - Package name (e.g., "express", "@types/node")
- `currentVersion: string` - Currently installed version
- `latestVersion: string` - Latest available version
- `wantedVersion: string` - Version that satisfies semver range
- `type: 'dependency' | 'devDependency' | 'peerDependency'` - Dependency type
- `securityStatus: SecurityStatus` - Vulnerability information
- `updateType: 'major' | 'minor' | 'patch' | 'none'` - Update classification
- `packageManager: string` - Source package manager (npm, yarn, etc.)

**Relationships**:
- Belongs to zero or more UpgradeGroups
- Has zero or more VulnerabilityReports
- Part of DependencyGraph

**Validation Rules**:
- name must be valid package name format
- versions must follow semver specification
- securityStatus must be valid SecurityStatus object

**State Transitions**:
- `current` → `outdated` (when new version available)
- `outdated` → `upgrading` (during upgrade process)
- `upgrading` → `current` | `failed` (upgrade completion)

### UpgradeGroup
A collection of related packages that should be upgraded together.

**Fields**:
- `id: string` - Unique identifier for the group
- `name: string` - Human-readable group name
- `packages: Package[]` - List of packages in the group
- `rationale: string` - Explanation for grouping
- `estimatedRisk: 'low' | 'medium' | 'high'` - Risk assessment
- `dependencies: string[]` - Other groups this depends on
- `totalPackages: number` - Count of packages in group

**Relationships**:
- Contains multiple Packages
- Referenced by UpgradeSessions
- Can depend on other UpgradeGroups

**Validation Rules**:
- Must contain at least one package
- All packages must exist in current analysis
- Dependency groups must exist

### VulnerabilityReport
Information about security vulnerabilities affecting package versions.

**Fields**:
- `cve: string` - CVE identifier (e.g., "CVE-2023-12345")
- `severity: 'critical' | 'high' | 'moderate' | 'low'` - Vulnerability severity
- `title: string` - Brief vulnerability description
- `description: string` - Detailed vulnerability information
- `affectedVersions: string` - Version range affected
- `patchedVersions: string` - Version range with fix
- `source: string` - Vulnerability data source (npm audit, GitHub Advisory)
- `publishedDate: Date` - When vulnerability was published
- `remediation: string` - Recommended remediation steps

**Relationships**:
- Affects one or more Packages
- Referenced in UpgradeSessions

**Validation Rules**:
- CVE must follow standard format
- Severity must be valid enum value
- Version ranges must be valid semver ranges

### UpgradeSession
A collaborative upgrade process with progress tracking and decision recording.

**Fields**:
- `id: string` - Unique session identifier
- `status: 'planning' | 'in_progress' | 'completed' | 'failed' | 'cancelled'` - Current status
- `startedAt: Date` - Session start timestamp
- `completedAt?: Date` - Session completion timestamp
- `targetGroups: UpgradeGroup[]` - Groups selected for upgrade
- `progress: UpgradeProgress[]` - Step-by-step progress tracking
- `decisions: UpgradeDecision[]` - User decisions made during session
- `rollbackInfo?: RollbackInfo` - Information for session rollback
- `validationResults?: ValidationResult[]` - Post-upgrade validation results

**Relationships**:
- Operates on UpgradeGroups
- Contains UpgradeProgress and UpgradeDecision records
- Referenced in UpgradeDocumentation

**Validation Rules**:
- Session must have at least one target group
- Status transitions must follow valid state machine
- Decisions must reference valid packages/groups

**State Transitions**:
- `planning` → `in_progress` (user confirms upgrade plan)
- `in_progress` → `completed` | `failed` (upgrade execution result)
- `in_progress` → `cancelled` (user cancellation)
- `failed` → `planning` (retry after fixing issues)

### WorkspaceConfiguration
User-defined settings and preferences for the dependency upgrade process.

**Fields**:
- `validationCommands: string[]` - Commands to run for validation (e.g., ["npm test", "npm run lint"])
- `packageManagerPreferences: PackageManagerConfig` - Package manager specific settings
- `upgradePreferences: UpgradePreferences` - User upgrade preferences
- `securityThreshold: 'low' | 'moderate' | 'high' | 'critical'` - Minimum severity for alerts
- `autoGroupingEnabled: boolean` - Enable automatic package grouping
- `backupEnabled: boolean` - Create backups before upgrades
- `notificationSettings: NotificationConfig` - How to notify about updates

**Relationships**:
- Applied to UpgradeSessions
- References PackageManagerConfig

**Validation Rules**:
- Validation commands must be executable
- Security threshold must be valid enum
- Configuration must be serializable to JSON

### UpgradeDocumentation
Markdown-based summaries and maintenance records for ongoing reference.

**Fields**:
- `sessionId: string` - Associated upgrade session
- `summaryPath: string` - Path to generated summary file
- `changelogPath: string` - Path to changelog entries
- `maintenanceNotes: string` - Additional maintenance information
- `generatedAt: Date` - Documentation generation timestamp
- `lastUpdated: Date` - Last modification timestamp
- `tags: string[]` - Categorization tags

**Relationships**:
- Documents UpgradeSessions
- References workspace file paths

**Validation Rules**:
- File paths must be within workspace
- Associated session must exist

## Supporting Types

### SecurityStatus
```typescript
interface SecurityStatus {
  hasVulnerabilities: boolean;
  vulnerabilityCount: number;
  highestSeverity?: 'critical' | 'high' | 'moderate' | 'low';
  reportIds: string[];
}
```

### UpgradeProgress
```typescript
interface UpgradeProgress {
  step: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  timestamp: Date;
  details?: string;
  errorMessage?: string;
}
```

### UpgradeDecision
```typescript
interface UpgradeDecision {
  packageName: string;
  action: 'upgrade' | 'skip' | 'defer';
  reasoning: string;
  timestamp: Date;
  targetVersion?: string;
}
```

### RollbackInfo
```typescript
interface RollbackInfo {
  backupPath: string;
  originalVersions: Record<string, string>;
  rollbackCommands: string[];
  createdAt: Date;
}
```

### ValidationResult
```typescript
interface ValidationResult {
  command: string;
  success: boolean;
  output: string;
  exitCode: number;
  duration: number;
  timestamp: Date;
}
```

## Entity Relationships Diagram

```
Package ──┐
          ├─ UpgradeGroup ─── UpgradeSession ─── UpgradeDocumentation
          │                       │
VulnerabilityReport ──────────────┘
                                  │
WorkspaceConfiguration ──────────┘
```

## Data Persistence Strategy

- **Packages & Analysis Results**: In-memory with file system caching
- **UpgradeGroups**: Persisted in session state files
- **UpgradeSessions**: JSON files in `.dependency-doctor/sessions/`
- **WorkspaceConfiguration**: `.dependency-doctor/config.json`
- **UpgradeDocumentation**: Markdown files in `.dependency-doctor/docs/`
- **VulnerabilityReports**: Cached with TTL-based invalidation

## Performance Considerations

- Package analysis results cached based on lockfile hash
- Vulnerability data cached for 24 hours
- Incremental updates for large dependency trees
- Lazy loading of detailed package information
- Stream-based processing for large repositories