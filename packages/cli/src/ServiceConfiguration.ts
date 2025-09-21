import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";
import pino, { Logger } from "pino";
import { InjectionTokens } from "@dependency-doctor/common/enums/InjectionTokens.js";
import { FileSystem } from "@dependency-doctor/common/repository/fileSystem/FileSystem.js";
import type { IFileSystem } from "@dependency-doctor/common/repository/fileSystem/IFileSystem.js";

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

  // Configure and register logger
  container.registerInstance<Logger>(
    InjectionTokens.Logger,
    pino({
      name: "dependency-doctor-cli",
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

  return container;
}

export const ServiceContainer = configureServices();
