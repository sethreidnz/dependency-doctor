import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    outDir: "packages/cli/dist",
    rollupOptions: {
      external: [
        "commander",
        "path",
        "fs",
        "fs/promises",
        "child_process",
        "util",
      ],
      output: {
        entryFileNames: "[name].js",
        banner: "#!/usr/bin/env node",
      },
    },
    target: "node16",
    minify: false,
    ssr: true,
  },
  test: {
    environment: "node",
    setupFiles: ["reflect-metadata"],
  },
});
