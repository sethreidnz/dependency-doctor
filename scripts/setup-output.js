#!/usr/bin/env node

import { mkdirSync, rmSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Clean and create output directories
const outDir = 'out';

// Remove existing out directory if it exists
if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
}

// Create output structure
mkdirSync(`${outDir}/mcp`, { recursive: true });
mkdirSync(`${outDir}/test-output`, { recursive: true });

console.log('✅ Output directories created:');
console.log('  📁 out/mcp - MCP build artifacts');
console.log('  📁 out/test-output - Test results and coverage');