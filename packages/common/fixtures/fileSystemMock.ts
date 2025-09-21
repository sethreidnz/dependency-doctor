import { IFileSystem } from "repository/fileSystem/IFileSystem";
import { MockedObject, vi } from "vitest";

export const fileSystemMock: MockedObject<IFileSystem> = {
  readFile: vi.fn(),
  writeFile: vi.fn(),
  deleteFile: vi.fn(),
  fileExists: vi.fn(),
  readJsonFile: vi.fn() as MockedObject<IFileSystem>["readJsonFile"],
  mkdir: vi.fn(),
  directoryExists: vi.fn(),
  readFileSync: vi.fn(),
  fileExistsSync: vi.fn(),
  readJsonFileSync: vi.fn() as MockedObject<IFileSystem>["readJsonFileSync"],
};
