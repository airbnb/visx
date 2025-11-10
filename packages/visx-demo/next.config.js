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
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
