# Quickstart Guide: Dependency Doctor MCP MVP

## Overview
This quickstart guide walks through the complete user journey for the Dependency Doctor MCP server, from initial setup to successful package upgrades. Use this guide to validate the implementation and ensure all user scenarios work correctly.

## Prerequisites
- Node.js 22.15.0 or later
- npm, yarn, or pnpm installed
- A TypeScript project with dependencies to analyze
- MCP-compatible client (Claude Desktop, Zed, etc.)

## Setup Instructions

### 1. Install Dependency Doctor MCP Server
```bash
# Add to your MCP client configuration
{
  "mcpServers": {
    "dependency-doctor": {
      "command": "npx",
      "args": ["dependency-doctor-mcp"],
      "env": {}
    }
  }
}
```

### 2. Initialize Workspace Configuration
```bash
# Create workspace configuration directory
mkdir -p .dependency-doctor/{docs,sessions}

# Create initial configuration
cat > .dependency-doctor/config.json << EOF
{
  "validationCommands": ["npm test", "npm run lint"],
  "packageManagerPreferences": {
    "preferredManager": "npm",
    "installFlags": ["--save-exact"]
  },
  "upgradePreferences": {
    "autoGrouping": true,
    "requireConfirmation": true,
    "maxConcurrentUpgrades": 5
  },
  "securityThreshold": "moderate",
  "backupEnabled": true,
  "notificationSettings": {
    "enableNotifications": true,
    "notifyOnVulnerabilities": true
  }
}
EOF
```

## User Journey Scenarios

### Scenario 1: Initial Dependency Analysis

**Objective**: Analyze a repository for outdated and vulnerable packages

**Steps**:
1. **Analyze Dependencies**
   ```
   Use MCP tool: analyze_dependencies
   Input: {
     "repositoryPath": "/path/to/your/project",
     "packageManager": "npm",
     "includeDevDependencies": true
   }
   ```

2. **Expected Output**:
   - Summary showing total packages, outdated count, vulnerability count
   - List of packages with version information
   - Security vulnerability reports with CVE details
   - Analysis timestamp for tracking

3. **Validation**:
   ```bash
   # Verify analysis files are created
   ls -la .dependency-doctor/
   
   # Check for analysis cache
   test -f .dependency-doctor/cache/analysis-*.json && echo "Analysis cached"
   ```

### Scenario 2: Interactive Package Grouping

**Objective**: Group related packages for coordinated upgrades

**Steps**:
1. **Create Upgrade Groups**
   ```
   Use MCP tool: create_upgrade_groups
   Input: {
     "packages": ["express", "@types/express", "express-session"],
     "strategy": "by_ecosystem",
     "maxGroupSize": 5
   }
   ```

2. **Expected Output**:
   - Logical groupings of related packages
   - Rationale for each grouping
   - Risk assessment for each group
   - Dependencies between groups

3. **Validation**:
   - Groups should be logically related (e.g., framework + types + plugins)
   - Risk assessment should reflect upgrade complexity
   - No circular dependencies between groups

### Scenario 3: Safe Package Upgrade Execution

**Objective**: Execute package upgrades with validation and rollback capability

**Steps**:
1. **Execute Dry Run**
   ```
   Use MCP tool: execute_upgrade
   Input: {
     "sessionId": "upgrade-session-001",
     "groupIds": ["express-ecosystem"],
     "dryRun": true
   }
   ```

2. **Review Dry Run Results**:
   - Changes that would be made
   - Validation commands that would run
   - Estimated time and risk

3. **Execute Actual Upgrade**
   ```
   Use MCP tool: execute_upgrade
   Input: {
     "sessionId": "upgrade-session-001",
     "groupIds": ["express-ecosystem"],
     "dryRun": false,
     "runValidation": true
   }
   ```

4. **Expected Output**:
   - Step-by-step progress updates
   - Package.json and lockfile changes
   - Validation command results
   - Session documentation generation

5. **Validation**:
   ```bash
   # Verify packages were upgraded
   npm list --depth=0
   
   # Check validation passed
   npm test
   npm run lint
   
   # Verify documentation was generated
   test -f .dependency-doctor/docs/upgrade-session-001.md
   ```

### Scenario 4: Rollback Failed Upgrade

**Objective**: Demonstrate rollback capability for failed upgrades

**Steps**:
1. **Simulate Upgrade Failure**:
   - Trigger an upgrade that causes validation to fail
   - Or manually fail an upgrade session

2. **Execute Rollback**
   ```
   Use MCP tool: rollback_upgrade
   Input: {
     "sessionId": "upgrade-session-001",
     "validateAfterRollback": true
   }
   ```

3. **Expected Output**:
   - Restoration of original package versions
   - Restoration of original lockfiles
   - Validation results showing working state
   - Updated session documentation

4. **Validation**:
   ```bash
   # Verify packages were restored
   npm list --depth=0
   
   # Verify system works
   npm test
   
   # Check rollback documentation
   grep -i "rollback" .dependency-doctor/docs/upgrade-session-001.md
   ```

### Scenario 5: Security Vulnerability Prioritization

**Objective**: Handle security vulnerabilities with appropriate priority

**Steps**:
1. **Analyze for Security Issues**
   ```
   Use MCP tool: analyze_dependencies
   Input: {
     "repositoryPath": "/path/to/your/project",
     "securityOnly": true
   }
   ```

2. **Review Security Results**:
   - Critical and high severity vulnerabilities listed first
   - CVE information and remediation guidance
   - Affected version ranges

3. **Execute Security Updates**
   ```
   Use MCP tool: execute_upgrade
   Input: {
     "sessionId": "security-patch-001",
     "packageNames": ["vulnerable-package-1", "vulnerable-package-2"]
   }
   ```

4. **Validation**:
   ```bash
   # Verify vulnerabilities resolved
   npm audit
   
   # Should show 0 vulnerabilities or reduced count
   ```

## Integration Test Scenarios

### Test 1: MCP Protocol Compliance
```bash
# Verify MCP server responds correctly
mcp-client tools list | grep "analyze_dependencies"
mcp-client tools list | grep "create_upgrade_groups"
mcp-client tools list | grep "execute_upgrade"
mcp-client tools list | grep "rollback_upgrade"

# Verify resources are available
mcp-client resources list | grep "workspace_config"
mcp-client resources list | grep "upgrade_documentation"
```

### Test 2: Error Handling
```bash
# Test invalid repository path
# Should return appropriate error message

# Test missing package.json
# Should return descriptive error

# Test network failure during analysis
# Should handle gracefully with retry options
```

### Test 3: Large Repository Performance
```bash
# Test with repository having 500+ dependencies
# Analysis should complete within 30 seconds
# Memory usage should remain reasonable
```

## Success Criteria

### Functional Requirements Validation
- ✅ **FR-001**: Identify outdated packages ✓
- ✅ **FR-002**: Identify security vulnerabilities ✓
- ✅ **FR-003**: Analyze dependency relationships ✓
- ✅ **FR-004**: Present LLM-friendly format ✓
- ✅ **FR-005**: Support interactive upgrade process ✓
- ✅ **FR-006**: Maintain workspace configuration ✓
- ✅ **FR-007**: Generate documentation ✓
- ✅ **FR-008**: Support pluggable package managers ✓
- ✅ **FR-009**: Provide safety features ✓
- ✅ **FR-010**: Validate upgrades ✓
- ✅ **FR-011**: Handle workspace settings persistence ✓
- ✅ **FR-012**: Support individual and batch upgrades ✓

### Performance Criteria
- Analysis completes in under 30 seconds for repositories with 1000+ dependencies
- Memory usage remains under 512MB during analysis
- MCP response times under 2 seconds for tool invocations

### User Experience Criteria
- Clear progress indication during long-running operations
- Informative error messages with recovery suggestions
- Documentation automatically updated after each session
- Configuration persists across sessions

## Troubleshooting

### Common Issues

1. **MCP Server Not Responding**
   ```bash
   # Check MCP server logs
   tail -f ~/.mcp/logs/dependency-doctor.log
   
   # Verify Node.js version
   node --version  # Should be 22.15.0+
   ```

2. **Package Manager Command Failures**
   ```bash
   # Verify package manager installation
   npm --version
   yarn --version
   pnpm --version
   
   # Check PATH configuration
   echo $PATH | grep npm
   ```

3. **Validation Command Failures**
   ```bash
   # Test validation commands manually
   npm test
   npm run lint
   
   # Check workspace configuration
   cat .dependency-doctor/config.json
   ```

4. **Permission Issues**
   ```bash
   # Check directory permissions
   ls -la .dependency-doctor/
   
   # Verify write access
   touch .dependency-doctor/test-write && rm .dependency-doctor/test-write
   ```

## Next Steps

After completing this quickstart:
1. Explore advanced configuration options
2. Set up automated dependency monitoring
3. Integrate with CI/CD pipelines
4. Customize package grouping strategies
5. Configure team-specific validation rules

## Support

For issues or questions:
- Check the implementation documentation in `specs/001-dependency-doctor-mcp/`
- Review MCP protocol documentation
- Validate against the test scenarios in this guide