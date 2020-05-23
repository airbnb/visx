/* eslint-disable no-undef */
const withCss = require('@zeit/next-css');
const path = require('path');

module.exports = withCss({
  typescript: {
    // enable rendering when there are type errors
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack: config => {
    // append docgen loader to the babel loader (executed bottom->top)
    const babelConfig = config.module.rules[0];
    const initialBabelUse = babelConfig.use;
    babelConfig.use = [
      initialBabelUse,
      {
        loader: 'react-docgen-typescript-loader',
        options: {
          // display types from outside a component's source even tho
          // we hide these with the propFilter below, if we don't do
          // this the component's own props become any
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
    ];

    // apply parsing to imports from other packages src/ folders
    // docgen doesn't work on transpiled packages, and ts parsing isn't
    // applied outside of vx-demo without this
    babelConfig.include.push(/vx-.*\/src/);

    return config;
  },
});
