/**
 * TypeScript definitions for npm audit --json command output
 * Based on npm's official JSON output format
 */

import { VulnerabilitySeverity } from "../../enums/VulnerabilitySeverity.js";

export interface NpmAuditVulnerability {
  /** Severity level of the vulnerability */
  severity: VulnerabilitySeverity;
  /** Whether vulnerability is via optional dependency */
  via: string | NpmAuditVulnerabilityDetails[];
  /** Effect on the vulnerability */
  effects: string[];
  /** Range of versions affected */
  range: string;
  /** Direct dependency nodes affected */
  nodes: string[];
  /** Fixed in version */
  fixAvailable?:
    | boolean
    | {
        name: string;
        version: string;
        isSemVerMajor: boolean;
      };
}

export interface NpmAuditVulnerabilityDetails {
  /** Source of vulnerability info */
  source: number;
  /** Package name */
  name: string;
  /** Dependency chain */
  dependency: string;
  /** Title of vulnerability */
  title: string;
  /** URL for more info */
  url: string;
  /** Severity level */
  severity: VulnerabilitySeverity;
  /** Common Vulnerabilities and Exposures ID */
  cwe?: string[];
  /** Common Vulnerability Scoring System score */
  cvss?: {
    score: number;
    vectorString: string;
  };
  /** Affected version range */
  range: string;
}

export interface NpmAuditAdvisory {
  /** Advisory ID */
  id: number;
  /** URL for advisory */
  url: string;
  /** Title of the advisory */
  title: string;
  /** Severity level */
  severity: VulnerabilitySeverity;
  /** Vulnerable versions */
  vulnerable_versions: string;
  /** Patched versions */
  patched_versions: string;
  /** Advisory overview */
  overview: string;
  /** Advisory recommendation */
  recommendation: string;
  /** References */
  references: string;
  /** Access type */
  access: string;
  /** When advisory was created */
  created: string;
  /** When advisory was last modified */
  modified: string;
  /** When advisory was published */
  published: string;
  /** Reported by */
  reported_by: {
    login: string;
  };
  /** Module name */
  module_name: string;
  /** Common Vulnerabilities and Exposures */
  cves: string[];
  /** Common Weakness Enumeration */
  cwe: string[];
  /** Found by */
  found_by: {
    login: string;
  }[];
  /** Deleted flag */
  deleted?: boolean;
}

export interface NpmAuditMetadata {
  /** Vulnerabilities count by severity */
  vulnerabilities: {
    info: number;
    low: number;
    moderate: number;
    high: number;
    critical: number;
    total: number;
  };
  /** Dependencies analyzed */
  dependencies: {
    prod: number;
    dev: number;
    optional: number;
    peer: number;
    peerOptional: number;
    total: number;
  };
}

/**
 * Output from 'npm audit --json'
 */
export interface NpmAuditJson {
  /** Audit metadata */
  auditReportVersion: number;
  /** Vulnerabilities found, keyed by package name */
  vulnerabilities: {
    [packageName: string]: NpmAuditVulnerability;
  };
  /** Advisory details */
  advisories: {
    [advisoryId: string]: NpmAuditAdvisory;
  };
  /** Audit metadata */
  metadata: NpmAuditMetadata;
}
