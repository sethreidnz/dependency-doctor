import { Command } from "commander";
import path from "path";
import { PackageManager } from "@dependency-doctor/common/enums/PackageManager.js";
import { ProjectConfigurationJson } from "@dependency-doctor/common/models/ProjectConfiguration.js";
import { InjectionTokens } from "@dependency-doctor/common/enums/InjectionTokens.js";
import type { IFileSystem } from "@dependency-doctor/common/repository/fileSystem/IFileSystem.js";
import { ServiceContainer } from "./ServiceConfiguration.js";
import packageJson from "../package.json";

const program = new Command();

program
  .name("dependency-doctor")
  .description("Dependency Doctor - Interactive dependency upgrade workflows")
  .version(packageJson.version);

program
  .command("init")
  .description("Initialize Dependency Doctor in the current project")
  .action(async () => {
    try {
      const fileSystem = ServiceContainer.resolve<IFileSystem>(InjectionTokens.FileSystem);
      const cwd = process.cwd();
      const dependencyDoctorDir = path.join(cwd, ".dependency-doctor");
      const settingsFile = path.join(dependencyDoctorDir, "settings.json");

      console.log("🔧 Initializing Dependency Doctor...");

      // Check if already initialized
      const settingsExists = await fileSystem.fileExists(settingsFile);
      if (settingsExists) {
        console.log(
          "⚠️  Dependency Doctor is already initialized in this project"
        );
        console.log(`Settings file exists: ${settingsFile}`);
        return;
      }

      console.log(`Settings file does not exist: ${settingsFile}`);

      // Create directory structure
      await fileSystem.mkdir(dependencyDoctorDir, { recursive: true });

      // Create npm subdirectory for future output files
      const npmDir = path.join(dependencyDoctorDir, "npm");
      await fileSystem.mkdir(npmDir, { recursive: true });

      // Create default project configuration
      const defaultSettings: ProjectConfigurationJson = {
        version: packageJson.version,
        [PackageManager.Npm]: {
          enabled: true,
        },
      };

      // Write settings file
      await fileSystem.writeFile(
        settingsFile,
        JSON.stringify(defaultSettings, null, 2)
      );

      console.log("✅ Dependency Doctor initialized successfully!");
      console.log("");
      console.log("📁 Created:");
      console.log(`   ${path.relative(cwd, dependencyDoctorDir)}/`);
      console.log(`   ${path.relative(cwd, settingsFile)}`);
      console.log(`   ${path.relative(cwd, npmDir)}/`);
      console.log("");
      console.log("🚀 Next steps:");
      console.log(
        "   Use Dependency Doctor MCP tools to analyze your dependencies"
      );
    } catch (error) {
      console.error("Failed to initialize project:", error);
      process.exit(1);
    }
  });

// Show help if no command provided
if (process.argv.length === 2) {
  program.help();
}

program.parse();
