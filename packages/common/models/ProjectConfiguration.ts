import { PackageManager } from "../enums/PackageManager";

/**
 * Configuration for a specific package manager
 */
export interface PackageConfigurationJson {
  /** Whether this package manager is enabled for analysis */
  enabled: boolean;
}

/**
 * Project-wide configuration for Dependency Doctor
 * Contains top-level settings and package manager specific configurations
 */
export interface ProjectConfigurationJson {
  version: string;
  [PackageManager.Npm]: PackageConfigurationJson;
}
