import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: '@visx/vendor',
    globals: true,
    environment: 'node',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'json-summary', 'html', 'json', 'text'],
      // vendor package re-exports d3 modules, coverage not applicable
      include: ['packages/visx-vendor/vendor-cjs/**/*.js'],
      exclude: ['**/node_modules/**', '**/esm/**', '**/lib/**', '**/test/**', '**/dist/**'],
      reportsDirectory: './coverage',
    },
  },
  // No alias needed - let Node's module resolution use package.json exports
});
