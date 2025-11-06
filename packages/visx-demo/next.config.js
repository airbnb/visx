const nextConfig = {
  output: 'export',
  typescript: {
    // enable rendering when there are type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Don't run ESLint during builds (it's run at the root level)
    ignoreDuringBuilds: true,
  },
  // Handle ESM packages that are imported by visx
  experimental: {
    esmExternals: 'loose',
  },
  // In Next.js 13+, use transpilePackages to transpile visx source files
  // This is simpler and more reliable than custom webpack config
  transpilePackages: [
    '@visx/annotation',
    '@visx/axis',
    '@visx/bounds',
    '@visx/brush',
    '@visx/chord',
    '@visx/clip-path',
    '@visx/curve',
    '@visx/delaunay',
    '@visx/drag',
    '@visx/event',
    '@visx/geo',
    '@visx/glyph',
    '@visx/gradient',
    '@visx/grid',
    '@visx/group',
    '@visx/heatmap',
    '@visx/hierarchy',
    '@visx/legend',
    '@visx/marker',
    '@visx/mock-data',
    '@visx/network',
    '@visx/pattern',
    '@visx/point',
    '@visx/react-spring',
    '@visx/responsive',
    '@visx/sankey',
    '@visx/scale',
    '@visx/shape',
    '@visx/stats',
    '@visx/text',
    '@visx/threshold',
    '@visx/tooltip',
    '@visx/vendor',
    '@visx/visx',
    '@visx/voronoi',
    '@visx/wordcloud',
    '@visx/xychart',
    '@visx/zoom',
  ],
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
