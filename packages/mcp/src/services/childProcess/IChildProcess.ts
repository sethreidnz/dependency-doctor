import type { ExecOptions as NodeExecOptions } from 'child_process';

export interface IChildProcess {
  /**
   * Execute a command and return the output
   * @param command The command to execute
   * @param args Arguments for the command
   * @param options Execution options
   */
  exec(command: string, args?: string[], options?: ExecOptions): Promise<ExecResult>;
}

export interface ExecOptions extends Pick<NodeExecOptions, 'cwd' | 'env' | 'timeout'> {}

export interface ExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}