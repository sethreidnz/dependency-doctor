import baseConfig from "../../eslint.config.js";

export default [
  // Ignore generated and build files
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  // Use shared base configuration
  ...baseConfig,
  // Package-specific configuration for TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Add any package-specific rule overrides here
    },
  },
];
