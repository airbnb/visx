/* eslint-disable no-undef */
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProd ? '/visx' : '',
  assetPrefix: isProd ? '/visx/' : '',
  typescript: {
    // enable rendering when there are type errors
    ignoreDevErrors: true,
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
    // note: the location of this rule depends/breaks based on our nextjs version
    // and/or next config itself (e.g., experimental flag)
    const babelConfig = config.module.rules[1];
    babelConfig.include.push(/visx-.*\/src/);

    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'react-docgen-typescript-loader',
          options: {
            // display types from outside a component's source even tho
            // we hide these with the propFilter below, if we don't do
            // this the component's own props become `any`
            tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
            // filter props like React.HTMLProps/React.SVGProps
            propFilter(prop) {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules');
              }
              return true;
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
