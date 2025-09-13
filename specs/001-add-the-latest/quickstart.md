# Quickstart: ESLint Configuration System

## Overview
This guide walks through setting up and using the ESLint configuration system for the dependency-doctor TypeScript workspace.

## Prerequisites
- Node.js 22+ installed
- npm workspace project structure in place
- TypeScript configuration already established

## Installation

### 1. Install Dependencies
```bash
# From repository root
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2. Verify Installation
```bash
# Check ESLint version
npx eslint --version
# Should show v9.x.x

# Check TypeScript plugin
npm list @typescript-eslint/eslint-plugin
# Should show installed version
```

## Configuration Setup

### 3. Create Base Configuration
Create `/eslint.config.js` in repository root:

```javascript
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.base.json',
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
];
```

### 4. Create Package-Specific Configuration
Create `/packages/dependency-doctor/eslint.config.js`:

```javascript
import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      // Package-specific rule overrides if needed
    }
  }
];
```

### 5. Update Package Scripts
Add to root `/package.json`:

```json
{
  "scripts": {
    "lint": "npm run mcp:lint",
    "mcp:lint": "eslint packages/dependency-doctor --config packages/dependency-doctor/eslint.config.js --cache --cache-location .eslintcache"
  }
}
```

## Usage

### 6. Run Linting
```bash
# Lint the entire workspace
npm run lint

# Lint specific package
npm run mcp:lint

# Lint with auto-fix
npx eslint packages/dependency-doctor --config packages/dependency-doctor/eslint.config.js --fix
```

### 7. Verify Setup
Test with intentional error:

```typescript
// Create test file: packages/dependency-doctor/src/test-lint.ts
const unusedVariable = 'test';  // Should trigger @typescript-eslint/no-unused-vars
let shouldBeConst = 'value';    // Should trigger @typescript-eslint/prefer-const
```

Run linting:
```bash
npm run lint
```

Expected output:
```
/packages/dependency-doctor/src/test-lint.ts
  1:7  error  'unusedVariable' is assigned a value but never used  @typescript-eslint/no-unused-vars
  2:1  error  'shouldBeConst' is never reassigned. Use 'const' instead  @typescript-eslint/prefer-const

✖ 2 problems (2 errors, 0 warnings)
  1 error and 0 warnings potentially fixable with the --fix option.
```

### 8. Fix Issues
```bash
# Auto-fix supported issues
npx eslint packages/dependency-doctor --config packages/dependency-doctor/eslint.config.js --fix

# Manually fix remaining issues
# Remove unused variables, address remaining warnings
```

### 9. Clean Run Verification
```bash
npm run lint
```

Should show no errors for clean code.

## IDE Integration

### 10. Configure VSCode
Create/update `.vscode/settings.json`:

```json
{
  "eslint.experimental.useFlatConfig": true,
  "eslint.workingDirectories": ["packages/*"],
  "eslint.validate": ["javascript", "typescript"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true
}
```

### 11. Install VSCode Extension
- Install "ESLint" extension by Microsoft
- Reload VSCode
- Verify real-time linting works in TypeScript files

## CI Integration

### 12. Add to CI Pipeline
Example GitHub Actions workflow addition:

```yaml
- name: Lint Code
  run: npm run lint
  
- name: Check linting passes
  run: |
    if npm run lint; then
      echo "Linting passed"
    else
      echo "Linting failed"
      exit 1
    fi
```

## Troubleshooting

### Common Issues

**"Cannot find module" errors**:
```bash
# Ensure all dependencies are installed
npm install

# Check ESLint can find TypeScript parser
npx eslint --print-config packages/dependency-doctor/src/index.ts
```

**Configuration not found**:
```bash
# Verify config file exists and is valid JavaScript
node -e "console.log(require('./eslint.config.js'))"

# Check file paths in scripts
npm run mcp:lint -- --debug
```

**Performance issues**:
```bash
# Clear cache and try again
rm -f .eslintcache
npm run lint

# Run with timing information
npm run mcp:lint -- --debug
```

**Rule conflicts**:
```bash
# Check effective configuration
npx eslint --print-config packages/dependency-doctor/src/index.ts
```

## Validation Checklist

- [ ] ESLint 9.x installed and working
- [ ] Base configuration file created and valid
- [ ] Package configuration extends base properly
- [ ] npm scripts execute without errors
- [ ] Linting detects actual code issues
- [ ] Auto-fix works for supported rules
- [ ] VSCode integration provides real-time feedback
- [ ] Cache improves performance on subsequent runs
- [ ] Configuration follows TypeScript best practices

## Next Steps

1. **Customize Rules**: Adjust rule severity and add team-specific rules
2. **Performance Tuning**: Optimize file patterns and caching strategy
3. **Documentation**: Update team guidelines with linting standards
4. **Integration**: Add pre-commit hooks and enhanced CI checks

This quickstart provides a complete working ESLint configuration following the established workspace patterns and modern best practices.