/* eslint-disable no-undef */
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  basePath: isProd ? "/visx" : "",
  assetPrefix: isProd ? "/visx/" : "",
  typescript: {
    // enable rendering when there are type errors
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "react-docgen-typescript-loader",
          options: {
            // display types from outside a component's source even tho
            // we hide these with the propFilter below, if we don't do
            // this the component's own props become any
            tsconfigPath: path.resolve(__dirname, "./tsconfig.json"),
            // filter props like React.HTMLProps/React.SVGProps
            propFilter(prop) {
              if (prop.parent) {
                return !prop.parent.fileName.includes("node_modules");
              }
              return true;
            },
          },
        },
      ],
    });

    const babelConfig = config.module.rules[0];
    babelConfig.include.push(/visx-.*\/src/);

    return config;
  },
};
