import { DependencyCollection } from "../models/DependencyCollection";

export interface IPackageManagerPlugin {
  getDependencyInfo(): Promise<DependencyCollection>;
}
