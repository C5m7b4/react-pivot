import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    reporters: ["default"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      enabled: true,
      reportOnFailure: true,
      exclude: [
        "playwright.config.ts",
        "tailwind.config.js",
        "vite.config.ts",
        "jest.config",
        "src/test-utils.js",
        "src/apis/*.*",
        "src/__tests__/**",
        "src/mocks/**",
        "tests/**",
        "e2e/**",
      ],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["tests/setupTests.js"],
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    exclude: ["**/node_modules/**", "**/tests/**", "tests/**", "e2e/**"],
    browser: {
      enabled: true,
      provider: "playwright",
      name: "chromium",
    },
  },
  build: {
    sourcemap: "inline",
  },
});
