#!/usr/bin/env node

import { Command } from 'commander';
import { initProject } from './commands/init.js';

const program = new Command();

program
  .name('dependency-doctor')
  .description('Dependency Doctor - Interactive dependency upgrade workflows')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize Dependency Doctor in the current project')
  .action(async () => {
    try {
      await initProject();
    } catch (error) {
      console.error('Failed to initialize project:', error);
      process.exit(1);
    }
  });

// Show help if no command provided
if (process.argv.length === 2) {
  program.help();
}

program.parse();