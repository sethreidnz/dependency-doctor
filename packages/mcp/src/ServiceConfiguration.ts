import 'reflect-metadata';
import { container } from 'tsyringe';
import pino from 'pino';
import { InjectionTokens } from './enums/InjectionTokens.js';
import { FileSystem } from './services/fileSystem/FileSystem.js';
import type { IFileSystem } from './services/fileSystem/IFileSystem.js';

/**
 * Service configuration and dependency injection setup
 */
export class ServiceConfiguration {
  private static _isConfigured = false;

  /**
   * Configure the dependency injection container and services
   */
  static configure(): void {
    if (this._isConfigured) {
      return;
    }

    // Configure logger
    const logger = pino({
      name: 'dependency-doctor-mcp',
      level: process.env.LOG_LEVEL || 'info',
      transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      } : undefined
    });

    // Register logger
    container.registerInstance(InjectionTokens.Logger, logger);

    // Register infrastructure services
    container.register<IFileSystem>(InjectionTokens.FileSystem, FileSystem);

    this._isConfigured = true;
  }

  /**
   * Get the configured container instance
   */
  static getContainer() {
    if (!this._isConfigured) {
      this.configure();
    }
    return container;
  }

  /**
   * Reset configuration (useful for testing)
   */
  static reset(): void {
    container.clearInstances();
    this._isConfigured = false;
  }
}