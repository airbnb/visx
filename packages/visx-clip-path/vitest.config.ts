import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    name: '@visx/clip-path',
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'json-summary', 'html', 'json', 'text'],
      include: ['packages/visx-clip-path/src/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/esm/**', '**/lib/**', '**/test/**', '**/dist/**'],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '@visx/clip-path': path.resolve(__dirname, './src'),
    },
  },
});
