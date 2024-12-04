import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // Use jsdom for DOM testing
    setupFiles: "./src/setupTests.ts", // Make sure this path exists and is correct
  },
});
