import { describe, it, expect } from "vitest";
import { ProjectConfigRepository } from "./ProjectConfigurationRepository";
describe("getDependencyInfo Tool", () => {
    it("example test", () => {
        // arrange
        // act
        const sut = new ProjectConfigRepository();
        // assert
        expect(sut).toBeInstanceOf(ProjectConfigRepository);
    });
});
