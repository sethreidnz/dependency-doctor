import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Package-specific test configuration
    include: ["src/**/*.{test,spec}.{js,ts,tsx}"],
    setupFiles: ["./setupTests.ts"],
    alias: {
      // Add any package-specific aliases
      "@": "./src",
    },
  },
});
