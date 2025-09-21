import { singleton } from "tsyringe";
import { ProjectConfigurationJson } from "../../models/ProjectConfiguration";
import { IProjectConfigRepository } from "./IProjectConfigurationRepository";

@singleton()
export class ProjectConfigRepository implements IProjectConfigRepository {
  private _config: ProjectConfigurationJson;

  constructor(config: ProjectConfigurationJson) {
    this._config = config;
  }

  get config(): ProjectConfigurationJson {
    return this._config;
  }
}
