import { ProjectConfigurationJson } from "../../models/ProjectConfiguration";
import { IProjectConfigRepository } from "./IProjectConfigurationRepository";

export class ProjectConfigRepository implements IProjectConfigRepository {
  get config(): ProjectConfigurationJson {
    throw new Error("Method not implemented.");
  }
}
