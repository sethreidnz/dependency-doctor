import { DependencyCollection } from "../../models/DependencyCollection";
import { IPackageManagerPlugin } from "../IPackageManagerPlugin";

export class NpmPlugin implements IPackageManagerPlugin {
  getDependencyInfo(): Promise<DependencyCollection> {
    throw new Error("Method not implemented.");
  }
}
