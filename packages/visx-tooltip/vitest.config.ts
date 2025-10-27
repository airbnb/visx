import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    name: '@visx/tooltip',
    globals: true,
    environment: 'happy-dom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'json-summary', 'html', 'json', 'text'],
      include: ['packages/visx-tooltip/src/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/esm/**', '**/lib/**', '**/test/**', '**/dist/**'],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '@visx/tooltip': path.resolve(__dirname, './src'),
    },
  },
});
