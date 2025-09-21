import { ProjectConfiguration } from "../../models/ProjectConfiguration";

export interface IProjectConfigRepository {
  get config(): ProjectConfiguration;
}
