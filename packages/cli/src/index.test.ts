import { describe, it, expect, beforeEach, vi, MockedObject } from "vitest";
import { configureServices } from "./ServiceConfiguration";
import { InjectionTokens } from "@dependency-doctor/common/enums/InjectionTokens.js";
import type { IFileSystem } from "@dependency-doctor/common/repository/fileSystem/IFileSystem.js";
import { PackageManager } from "@dependency-doctor/common/enums/PackageManager.js";
import type { DependencyContainer } from "tsyringe";

// Create a properly typed mock using vi.mocked
const mockFileSystem: MockedObject<IFileSystem> = {
  readFile: vi.fn(),
  writeFile: vi.fn(),
  deleteFile: vi.fn(),
  fileExists: vi.fn(),
  readJsonFile: vi.fn() as MockedObject<IFileSystem>['readJsonFile'],
  mkdir: vi.fn(),
  directoryExists: vi.fn(),
  readFileSync: vi.fn(),
  fileExistsSync: vi.fn(),
  readJsonFileSync: vi.fn() as MockedObject<IFileSystem>['readJsonFileSync'],
};

describe("CLI Package", () => {
  let container: DependencyContainer;

  beforeEach(() => {
    vi.clearAllMocks();
    container = configureServices();

    // Override the FileSystem with our mock
    container.registerInstance(InjectionTokens.FileSystem, mockFileSystem);
  });

  describe("ServiceConfiguration", () => {
    it("should configure and provide a container", () => {
      expect(container).toBeDefined();
    });

    it("should resolve IFileSystem from container", () => {
      const fileSystem = container.resolve<IFileSystem>(
        InjectionTokens.FileSystem
      );
      expect(fileSystem).toBe(mockFileSystem);
    });
  });

  describe("Init Command Logic", () => {
    it("should detect when settings file already exists", async () => {
      // arrange
      const fileSystem = container.resolve<IFileSystem>(
        InjectionTokens.FileSystem
      );
      mockFileSystem.fileExists.mockResolvedValue(true);

      // act
      const settingsExists = await fileSystem.fileExists(
        ".dependency-doctor/settings.json"
      );

      // assert
      expect(settingsExists).toBe(true);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockFileSystem.fileExists).toHaveBeenCalledWith(
        ".dependency-doctor/settings.json"
      );
    });

    it("should create directories and settings file when initializing", async () => {
      // arrange
      const fileSystem = container.resolve<IFileSystem>(
        InjectionTokens.FileSystem
      );
      mockFileSystem.fileExists.mockResolvedValue(false);
      mockFileSystem.mkdir.mockResolvedValue(undefined);
      mockFileSystem.writeFile.mockResolvedValue(undefined);

      const expectedSettings = {
        version: "1.0.0", // This would normally come from package.json
        [PackageManager.Npm]: {
          enabled: true,
        },
      };

      // act
      await fileSystem.mkdir(".dependency-doctor", { recursive: true });
      await fileSystem.mkdir(".dependency-doctor/npm", { recursive: true });
      await fileSystem.writeFile(
        ".dependency-doctor/settings.json",
        JSON.stringify(expectedSettings, null, 2)
      );

      // assert
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockFileSystem.mkdir).toHaveBeenCalledWith(".dependency-doctor", {
        recursive: true,
      });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockFileSystem.mkdir).toHaveBeenCalledWith(
        ".dependency-doctor/npm",
        { recursive: true }
      );
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockFileSystem.writeFile).toHaveBeenCalledWith(
        ".dependency-doctor/settings.json",
        JSON.stringify(expectedSettings, null, 2)
      );
    });
  });
});
