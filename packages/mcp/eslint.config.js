import baseConfig from '../../eslint.config.js';

export default [
  // Ignore generated and build files
  {
    ignores: ['dist/**', '.xmcp/**', 'node_modules/**']
  },
  // Use shared base configuration
  ...baseConfig,
  // Package-specific rule overrides (if needed)
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Add any package-specific rule overrides here
      // Example: '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];