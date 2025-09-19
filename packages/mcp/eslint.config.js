import baseConfig from '../../eslint.config.js';

export default [
  // Ignore generated and build files
  {
    ignores: ['dist/**', '.xmcp/**', 'node_modules/**', 'coverage/**']
  },
  // Use shared base configuration
  ...baseConfig,
  // Package-specific configuration for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // Explicitly reference our tsconfig
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      // Add any package-specific rule overrides here
      // Example: '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];