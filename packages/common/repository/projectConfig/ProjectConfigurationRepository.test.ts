import { describe, it, expect, beforeEach } from "vitest";
import { ProjectConfigRepository } from "./ProjectConfigurationRepository";
import { PackageManager } from "../../enums/PackageManager";
import { ProjectConfigurationJson } from "../../models/ProjectConfiguration";

describe("ProjectConfigRepository", () => {
  let sut: ProjectConfigRepository;
  let testConfig: ProjectConfigurationJson;

  beforeEach(() => {
    testConfig = {
      version: "1.0.0",
      [PackageManager.Npm]: {
        enabled: true,
      },
    };
    sut = new ProjectConfigRepository(testConfig);
  });

  describe("config getter", () => {
    it("should return the configuration passed to constructor", () => {
      // act
      const result = sut.config;

      // assert
      expect(result).toEqual(testConfig);
    });

    it("should return the same instance on multiple calls", () => {
      // act
      const result1 = sut.config;
      const result2 = sut.config;

      // assert
      expect(result1).toBe(result2);
    });

    it("should handle different configuration values", () => {
      // arrange
      const customConfig: ProjectConfigurationJson = {
        version: "2.0.0",
        [PackageManager.Npm]: {
          enabled: false,
        },
      };
      const customSut = new ProjectConfigRepository(customConfig);

      // act
      const result = customSut.config;

      // assert
      expect(result).toEqual(customConfig);
    });
  });
});
