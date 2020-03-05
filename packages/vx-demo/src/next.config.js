/* eslint-disable no-undef */
module.exports = {
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.scss$/,
      loader: ['style-loader', 'css-loader'],
    });
    return config;
  },
};
