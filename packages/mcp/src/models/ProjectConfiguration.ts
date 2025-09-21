import { PackageManager } from "../enums/PackageManager";

export type ProjectConfiguration = {
  packageManagers: Array<PackageConfiguration>;
};

export type PackageConfiguration = {
  packageManager: PackageManager;
};
