import { exec } from "child_process";
import { promisify } from "util";
import { injectable } from "tsyringe";
import {
  IChildProcess,
  type ExecOptions,
  type ExecResult,
} from "./IChildProcess.js";

const execAsync = promisify(exec);

@injectable()
export class ChildProcess implements IChildProcess {
  async exec(
    command: string,
    args: string[] = [],
    options: ExecOptions = {}
  ): Promise<ExecResult> {
    const fullCommand =
      args.length > 0 ? `${command} ${args.join(" ")}` : command;

    try {
      const result = await execAsync(fullCommand, {
        cwd: options.cwd,
        env: { ...process.env, ...options.env },
        timeout: options.timeout,
      });

      return {
        stdout: result.stdout.trim(),
        stderr: result.stderr.trim(),
        exitCode: 0,
      };
    } catch (error: any) {
      return {
        stdout: error.stdout?.trim() || "",
        stderr: error.stderr?.trim() || error.message,
        exitCode: error.code || 1,
      };
    }
  }
}
