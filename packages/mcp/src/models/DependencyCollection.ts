import { DependencyInfo } from "./DependencyInfo";
import { PackageManager } from "../enums/PackageManager";

/**
 * Collection of package information for dependencies
 * This is the simplified output that contains an array of PackageInformation
 * objects hydrated with version and security data
 */
export interface DependencyCollection {
  /** Timestamp when data was collected */
  timestamp: string;
  /** Array of package information */
  items: DependencyInfo[];
  /** Package manager used for collection */
  packageManager: PackageManager;
  /** Collection metadata */
  metadata: {
    /** Total packages processed */
    totalPackages: number;
    /** Number of packages with vulnerabilities */
    vulnerablePackages: number;
    /** Number of outdated packages */
    outdatedPackages: number;
  };
}
