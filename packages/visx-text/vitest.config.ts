import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    name: '@visx/text',
    globals: true,
    environment: 'happy-dom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'json-summary', 'html', 'json', 'text'],
      include: ['packages/visx-text/src/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/esm/**', '**/lib/**', '**/test/**', '**/dist/**'],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '@visx/text': path.resolve(__dirname, './src'),
    },
  },
});
