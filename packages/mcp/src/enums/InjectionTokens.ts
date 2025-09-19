/**
 * Dependency injection tokens for the dependency doctor MCP server
 */
export const InjectionTokens = {
  // Core services
  Logger: Symbol.for('Logger'),
  
  // Infrastructure services
  FileSystem: Symbol.for('FileSystem'),
  
  // Business services
  DependencyService: Symbol.for('DependencyService'),
  PluginRegistry: Symbol.for('PluginRegistry'),
  
  // Package manager plugins
  NpmPlugin: Symbol.for('NpmPlugin'),
} as const;

export type InjectionToken = typeof InjectionTokens[keyof typeof InjectionTokens];