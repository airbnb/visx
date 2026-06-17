import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    name: '@visx/registry',
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'json-summary', 'html', 'json', 'text'],
      include: ['packages/visx-registry/scripts/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/esm/**', '**/lib/**', '**/test/**', '**/dist/**'],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '@visx/a11y': path.resolve(__dirname, '../visx-a11y/src'),
      '@visx/a11y/react': path.resolve(__dirname, '../visx-a11y/src/react'),
      '@visx/axis': path.resolve(__dirname, '../visx-axis/src'),
      '@visx/axis/react': path.resolve(__dirname, '../visx-axis/src/react'),
      '@visx/chart': path.resolve(__dirname, '../visx-chart/src'),
      '@visx/clip-path': path.resolve(__dirname, '../visx-clip-path/src'),
      '@visx/grid': path.resolve(__dirname, '../visx-grid/src'),
      '@visx/heatmap': path.resolve(__dirname, '../visx-heatmap/src'),
      '@visx/hierarchy': path.resolve(__dirname, '../visx-hierarchy/src'),
      '@visx/kernel': path.resolve(__dirname, '../visx-kernel/src'),
      '@visx/responsive': path.resolve(__dirname, '../visx-responsive/src'),
      '@visx/scale': path.resolve(__dirname, '../visx-scale/src'),
      '@visx/scale/react': path.resolve(__dirname, '../visx-scale/src/react'),
      '@visx/shape': path.resolve(__dirname, '../visx-shape/src'),
      '@visx/threshold': path.resolve(__dirname, '../visx-threshold/src'),
      '@visx/theme': path.resolve(__dirname, '../visx-theme/src'),
      '@visx/theme/react': path.resolve(__dirname, '../visx-theme/src/react'),
      '@visx/vendor/d3-array': path.resolve(__dirname, '../visx-vendor/esm/d3-array.js'),
      '@visx/vendor/d3-path': path.resolve(__dirname, '../visx-vendor/esm/d3-path.js'),
      '@visx/vendor/d3-scale': path.resolve(__dirname, '../visx-vendor/esm/d3-scale.js'),
      '@visx/vendor/d3-shape': path.resolve(__dirname, '../visx-vendor/esm/d3-shape.js'),
    },
  },
});
