import { UpgradeType } from "../enums/UpgradeType";

export interface PackageInformation {
  name: string;
  version: string;
  wantedVersion: string;
  latestVersion: string;
  upgradeType: UpgradeType;
}
