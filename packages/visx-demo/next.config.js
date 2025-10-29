const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProd ? '/visx' : '',
  ...(isProd && { assetPrefix: '/visx/' }),
  typescript: {
    // enable rendering when there are type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Don't run ESLint during builds (it's run at the root level)
    ignoreDuringBuilds: true,
  },
  experimental: {
    // note: this can be removed in future next versions
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // add visx-*/src/* to be parsed by babel
    // Find all rules that handle JS/TS files and add visx source files to their include
    config.module.rules.forEach((rule) => {
      // Check if this rule handles .tsx/.ts files
      if (rule.test && (rule.test.test?.('.tsx') || rule.test.test?.('.ts'))) {
        // Expand include to also handle visx packages' src directories
        if (Array.isArray(rule.include)) {
          rule.include.push(/visx-.*\/src/);
        } else if (rule.include) {
          rule.include = [rule.include, /visx-.*\/src/];
        } else {
          rule.include = /visx-.*\/src/;
        }
      }

      // Also check nested rules
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.test && (oneOfRule.test.test?.('.tsx') || oneOfRule.test.test?.('.ts'))) {
            if (Array.isArray(oneOfRule.include)) {
              oneOfRule.include.push(/visx-.*\/src/);
            } else if (oneOfRule.include) {
              oneOfRule.include = [oneOfRule.include, /visx-.*\/src/];
            } else {
              oneOfRule.include = /visx-.*\/src/;
            }
          }
        });
      }
    });

    return config;
  },
};

module.exports = nextConfig;
