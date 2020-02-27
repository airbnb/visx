/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /code/,
        loader: path.resolve(__dirname, 'codemirror-webpack-loader.js'),
      },
    );
    return config;
  },
};
