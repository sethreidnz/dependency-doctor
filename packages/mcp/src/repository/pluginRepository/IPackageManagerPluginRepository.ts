import { PackageManager } from "../../enums/PackageManager";
import { IPackageManagerPlugin } from "../../plugins/IPackageManagerPlugin";

export interface IPackageManagerPluginRepository {
  items: Record<PackageManager, IPackageManagerPlugin>;
}
