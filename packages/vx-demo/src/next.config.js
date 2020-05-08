/* eslint-disable no-undef */
const withCss = require('@zeit/next-css');

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
      },
    ];

    // apply parsing to imports from other packages src/ folders
    // docgen doesn't work on transpiled packages, and ts parsing isn't
    // applied outside of vx-demo without this
    babelConfig.include.push(/vx-.*\/src/);

    return config;
  },
});
