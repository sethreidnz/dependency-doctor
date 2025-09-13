# ESLint Configuration Contract

## Base Configuration Contract
**File**: `/eslint.config.js`
**Purpose**: Workspace-wide ESLint configuration

### Structure Contract
```javascript
// Required imports
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

// Required export: Array of configuration objects
export default [
  {
    // Required: File targeting
    files: string[], // Glob patterns for file matching
    
    // Required: Language configuration
    languageOptions: {
      parser: Parser, // Must be @typescript-eslint/parser for .ts files
      parserOptions: {
        project: string | string[], // Path to tsconfig.json
        ecmaVersion: number, // ES version support
        sourceType: 'module' | 'script'
      }
    },
    
    // Required: Plugin registration
    plugins: {
      '@typescript-eslint': Plugin // TypeScript ESLint plugin
    },
    
    // Required: Rule definitions
    rules: {
      [ruleName: string]: RuleDefinition // Rule configurations
    },
    
    // Optional: Additional settings
    settings?: {
      [key: string]: any // Plugin-specific settings
    }
  }
];
```

### Rule Definition Contract
```typescript
type RuleDefinition = 
  | 'off' | 'warn' | 'error'  // Simple severity
  | [RuleSeverity, RuleOptions]; // Severity with options

type RuleSeverity = 'off' | 'warn' | 'error' | 0 | 1 | 2;
type RuleOptions = Record<string, any>;
```

### Validation Requirements
- Must export default array
- Each configuration object must have `files` property
- TypeScript files must use `@typescript-eslint/parser`
- All required plugins must be properly imported and registered

## Package Configuration Contract
**File**: `/packages/{package}/eslint.config.js`
**Purpose**: Package-specific ESLint overrides

### Structure Contract
```javascript
// Required: Import base configuration
import baseConfig from '../../eslint.config.js';

// Required: Export extended configuration
export default [
  // Include base configuration
  ...baseConfig,
  
  // Package-specific overrides
  {
    files: string[], // Package-specific file patterns
    rules: {
      [ruleName: string]: RuleDefinition // Rule overrides
    }
  }
];
```

### Inheritance Rules
- Must import and spread base configuration
- Overrides are applied in array order (later configs override earlier)
- File patterns should be package-specific
- Rules must follow same definition contract as base

## npm Script Contract
**File**: `/package.json`
**Purpose**: Linting command definitions

### Script Structure Contract
```json
{
  "scripts": {
    "lint": "npm run mcp:lint",
    "mcp:lint": "eslint {target-files} --config {config-path} --cache --cache-location .eslintcache"
  }
}
```

### Command Parameters Contract
- `{target-files}`: Glob pattern or directory path
- `{config-path}`: Path to appropriate eslint.config.js file
- `--cache`: Enable caching for performance
- `--cache-location`: Specify cache file location

### Exit Code Contract
- `0`: No linting errors
- `1`: Linting errors found
- `2`: Fatal error (invalid configuration, file not found, etc.)

## Error Output Contract

### Error Format
```json
{
  "filePath": "/absolute/path/to/file.ts",
  "messages": [
    {
      "ruleId": "rule-name",
      "severity": 1 | 2, // 1=warn, 2=error
      "message": "Human-readable error description",
      "line": number,
      "column": number,
      "nodeType": "ASTNodeType",
      "messageId": "messageIdentifier",
      "endLine": number,
      "endColumn": number
    }
  ],
  "errorCount": number,
  "warningCount": number,
  "fixableErrorCount": number,
  "fixableWarningCount": number,
  "source": "file-content-string"
}
```

### Summary Format
```json
{
  "errorCount": number,
  "warningCount": number,
  "fixableErrorCount": number,
  "fixableWarningCount": number
}
```

## IDE Integration Contract

### VSCode Settings Contract
**File**: `.vscode/settings.json`
```json
{
  "eslint.experimental.useFlatConfig": true,
  "eslint.workingDirectories": ["packages/*"],
  "eslint.validate": ["javascript", "typescript"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Extension Requirements
- ESLint extension must support flat config format
- Must detect configuration files automatically
- Must provide real-time linting feedback
- Must support auto-fix functionality

## Performance Contract

### Caching Requirements
- Cache file must be created at `.eslintcache`
- Cache must be invalidated when configuration changes
- Cache must improve subsequent run performance by >50%

### Memory Usage
- Linting process must not exceed 512MB memory usage
- Must handle large files (>1MB) without crashing

### Execution Time
- Initial run: <30 seconds for typical workspace
- Cached run: <5 seconds for unchanged files
- Incremental run: <10 seconds for small changes

## Testing Contract

### Configuration Validation Tests
```javascript
describe('ESLint Configuration', () => {
  test('base config exports valid array', () => {
    // Validate base configuration structure
  });
  
  test('package config extends base properly', () => {
    // Validate inheritance chain
  });
  
  test('no rule conflicts between configs', () => {
    // Check for conflicting rule definitions
  });
});
```

### Linting Execution Tests
```javascript
describe('Linting Commands', () => {
  test('npm run lint executes without errors', () => {
    // Test command execution
  });
  
  test('linting detects actual errors', () => {
    // Test error detection capability
  });
  
  test('linting passes on clean code', () => {
    // Test successful linting
  });
});
```

These contracts define the exact structure, behavior, and requirements for the ESLint configuration system, ensuring consistent implementation and integration across the workspace.