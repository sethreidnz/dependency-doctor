import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";
import pino, { Logger } from "pino";
import { InjectionTokens } from "@dependency-doctor/common/enums/InjectionTokens.js";
import { FileSystem } from "@dependency-doctor/common/repository/fileSystem/FileSystem.js";
import type { IFileSystem } from "@dependency-doctor/common/repository/fileSystem/IFileSystem.js";
import { ProjectConfigRepository } from "@dependency-doctor/common/repository/projectConfig/ProjectConfigurationRepository.js";
import type { IProjectConfigRepository } from "@dependency-doctor/common/repository/projectConfig/IProjectConfigurationRepository.js";
import type { ProjectConfigurationJson } from "@dependency-doctor/common/models/ProjectConfiguration.js";
import { PackageManager } from "@dependency-doctor/common/enums/PackageManager.js";

const CONFIG_FILE_PATH = ".dependency-doctor/settings.json";

/**
 * Load project configuration from file or return default (synchronous)
 */
function loadProjectConfiguration(): ProjectConfigurationJson {
  const fileSystem = new FileSystem();
  
  try {
    const configExists = fileSystem.fileExistsSync(CONFIG_FILE_PATH);
    
    if (!configExists) {
      return getDefaultConfiguration();
    }

    return fileSystem.readJsonFileSync<ProjectConfigurationJson>(CONFIG_FILE_PATH);
  } catch (error) {
    console.warn(`Failed to load configuration file: ${error instanceof Error ? error.message : 'Unknown error'}. Using default configuration.`);
    return getDefaultConfiguration();
  }
}

/**
 * Get default project configuration
 */
function getDefaultConfiguration(): ProjectConfigurationJson {
  return {
    version: "1.0.0",
    [PackageManager.Npm]: {
      enabled: true,
    },
  };
}

/**
 * Configures the dependency injection container with all required services.
 * This function sets up the singleton instances for caching and factory services
 * used throughout the application.
 *
 * @param logLevel - The logging level to configure (defaults to info)
 * @returns The configured dependency injection container
 */
export function configureServices(
  logLevel: string = process.env.LOG_LEVEL || "info",
): DependencyContainer {
  container.clearInstances();

  // Pre-load project configuration (synchronous)
  const config = loadProjectConfiguration();

  // Configure and register logger
  container.registerInstance<Logger>(
    InjectionTokens.Logger,
    pino({
      name: "dependency-doctor-mcp",
      level: logLevel,
      transport:
        process.env.NODE_ENV === "development"
          ? {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
              },
            }
          : undefined,
    }),
  );

  // Register infrastructure services
  container.register<IFileSystem>(InjectionTokens.FileSystem, FileSystem);

  // Register business services with pre-loaded config
  const projectConfigRepo = new ProjectConfigRepository(config);
  container.registerInstance<IProjectConfigRepository>(InjectionTokens.ProjectConfigRepository, projectConfigRepo);

  return container;
}

export const ServiceContainer = configureServices();
