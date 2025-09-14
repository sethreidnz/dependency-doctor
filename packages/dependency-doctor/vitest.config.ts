import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from '../../vitest.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      // Package-specific test configuration
      include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
      alias: {
        // Add any package-specific aliases
        '@': './src'
      }
    }
  })
)