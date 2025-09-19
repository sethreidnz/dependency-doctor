/**
 * TypeScript definitions for npm outdated --json command output
 * Based on npm's official JSON output format
 */

export interface NpmOutdatedPackage {
  /** Current version installed */
  current: string;
  /** Wanted version based on semver range in package.json */
  wanted: string;
  /** Latest published version */
  latest: string;
  /** Dependent package (for dependencies of dependencies) */
  dependent?: string;
  /** Package location - can be 'dependencies', 'devDependencies', 'peerDependencies', etc. */
  location: string;
}

/**
 * Output from 'npm outdated --json'
 * Key is the package name, value is the package information
 */
export interface NpmOutdatedJson {
  [packageName: string]: NpmOutdatedPackage;
}
