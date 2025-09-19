import { UpgradeType } from "../enums/UpgradeType.js";
import { VulnerabilitySeverity } from "../enums/VulnerabilitySeverity.js";

/**
 * Information about a package including version details and security status
 */
export interface DependencyInfo {
  /** Package name */
  name: string;
  /** Currently installed version */
  version: string;
  /** Wanted version based on semver range in package.json */
  wantedVersion: string;
  /** Latest available version */
  latestVersion: string;
  /** Type of upgrade required */
  upgradeType: UpgradeType;
  /** Security vulnerability information */
  security: SecurityInfo;
}

/**
 * Security information for a package
 */
export interface SecurityInfo {
  /** Whether the package has known vulnerabilities */
  hasVulnerabilities: boolean;
  /** Highest severity level found */
  highestSeverity?: VulnerabilitySeverity;
  /** Total number of vulnerabilities */
  vulnerabilityCount: number;
  /** List of vulnerabilities */
  vulnerabilities: VulnerabilityInfo[];
}

/**
 * Generic vulnerability information for a package
 */
export interface VulnerabilityInfo {
  /** Severity level of the vulnerability */
  severity: VulnerabilitySeverity;
  /** Title or brief description */
  title: string;
  /** URL for more information */
  url?: string;
  /** Advisory ID or reference */
  id?: string;
}
