import { PackageManager } from "../../enums/PackageManager";
import { IPackageManagerPlugin } from "../../plugins/IPackageManagerPlugin";
import { IPackageManagerPluginRepository } from "./IPackageManagerPluginRepository";

export class PluginRepository implements IPackageManagerPluginRepository {
  public readonly items: Record<PackageManager, IPackageManagerPlugin>;

  constructor(items: Record<PackageManager, IPackageManagerPlugin>) {
    this.items = items;
  }
}
