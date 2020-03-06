/* eslint-disable no-undef */
const withCss = require('@zeit/next-css');

module.exports = withCss({
  typescript: {
    // enable rendering when there are type errors
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
});
