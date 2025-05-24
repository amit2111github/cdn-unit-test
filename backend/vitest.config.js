import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,              // Use global test functions like `describe`, `it`, etc.
    environment: 'node',        // Use Node environment (good for backend/Express testing)
    setupFiles: ['./test/setup.js'], // Optional: global setup (e.g. DB connect)
    include: ['test/**/*.test.js'],  // Where to look for test files
    coverage: {
      reporter: ['text', 'json', 'html'], // Optional: coverage reports
    },
  },
});
