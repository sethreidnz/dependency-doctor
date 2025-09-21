export interface IFileSystem {
  readFile(filePath: string): Promise<string>;
  writeFile(filePath: string, content: string): Promise<void>;
  deleteFile(filePath: string): Promise<void>;
  fileExists(filePath: string): Promise<boolean>;
  readJsonFile<T>(filePath: string): Promise<T>;
  mkdir(dirPath: string, options?: { recursive?: boolean }): Promise<void>;
  directoryExists(dirPath: string): Promise<boolean>;
  
  // Synchronous methods for startup configuration
  readFileSync(filePath: string): string;
  fileExistsSync(filePath: string): boolean;
  readJsonFileSync<T>(filePath: string): T;
}
