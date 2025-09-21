import { ProjectConfiguration } from "../../models/ProjectConfiguration";
import { IProjectConfigRepository } from "./IProjectConfigurationRepository";

export class ProjectConfigRepository implements IProjectConfigRepository {
  get config(): ProjectConfiguration {
    throw new Error("Method not implemented.");
  }
}
