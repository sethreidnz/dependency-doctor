import { ProjectConfigurationJson } from "../../models/ProjectConfiguration";

export interface IProjectConfigRepository {
  get config(): ProjectConfigurationJson;
}
