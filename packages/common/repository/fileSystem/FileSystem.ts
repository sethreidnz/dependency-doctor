import { promises as fs } from 'fs';
import { readFileSync, existsSync, statSync } from 'fs';
import { injectable } from 'tsyringe';
import { IFileSystem } from './IFileSystem.js';

@injectable()
export class FileSystem implements IFileSystem {
  async readFile(filePath: string): Promise<string> {
    return await fs.readFile(filePath, 'utf-8');
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content, 'utf-8');
  }

  async deleteFile(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async readJsonFile<T>(filePath: string): Promise<T> {
    const content = await this.readFile(filePath);
    try {
      return JSON.parse(content) as T;
    } catch (error) {
      throw new Error(`Failed to parse JSON file '${filePath}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async mkdir(dirPath: string, options?: { recursive?: boolean }): Promise<void> {
    await fs.mkdir(dirPath, options);
  }

  async directoryExists(dirPath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(dirPath);
      return stats.isDirectory();
    } catch {
      return false;
    }
  }

  // Synchronous methods for startup configuration
  readFileSync(filePath: string): string {
    return readFileSync(filePath, 'utf-8');
  }

  fileExistsSync(filePath: string): boolean {
    return existsSync(filePath);
  }

  readJsonFileSync<T>(filePath: string): T {
    const content = this.readFileSync(filePath);
    try {
      return JSON.parse(content) as T;
    } catch (error) {
      throw new Error(`Failed to parse JSON file '${filePath}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}