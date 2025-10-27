import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    name: 'visx',
    globals: true,
    environment: 'node',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'json-summary', 'html', 'json', 'text'],
      include: ['packages/visx-visx/src/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/esm/**', '**/lib/**', '**/test/**', '**/dist/**'],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      visx: path.resolve(__dirname, './src'),
    },
  },
});
