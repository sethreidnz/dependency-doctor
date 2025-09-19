import { NpmOutdatedJson } from "./OutdatedJson.js";
import { NpmAuditJson } from "./AuditJson.js";

/**
 * Combined npm data model that includes both outdated package information
 * and security audit results from npm commands
 */
export interface NpmRawData {
  /** Results from 'npm outdated --json' */
  outdated: NpmOutdatedJson;
  /** Results from 'npm audit --json' */
  audit: NpmAuditJson;
}
