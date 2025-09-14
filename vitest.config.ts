import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Base configuration for all workspace packages
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.{js,ts,tsx}'],
    exclude: [
      'node_modules/**',
      'dist/**',
      '.xmcp/**'
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '.xmcp/**',
        '**/*.d.ts',
        '**/*.config.*'
      ]
    }
  }
})