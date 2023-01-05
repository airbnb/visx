const { RemoteBrowserTarget } = require('happo.io');
const { findPagesDir } = require('next/dist/lib/find-pages-dir');
const getBaseWebpackConfig = require('next/dist/build/webpack-config').default;
const loadNextConfig = require('next/dist/server/config').default;
const webpack = require('next/dist/compiled/webpack/webpack');
const path = require('path');

// note: these refs very much depend on our version of next.js and are based off
// visx-demo/node_modules/next/dist/build/index.js
const trace = require('next/dist/telemetry/trace');
const nextBuildSpan = trace.trace('next-build');

const { asyncTimeout } = require('./.happo-variables');

// happo will use next's compiled version of webpack
webpack.init(true);

const happoTmpDir = './.happo'; // should match .gitignore

module.exports = {
  // these are provided via github actions in CI, locally you
  // need to provide them yourself
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,

  // ms timeout for async examples (default=200)
  asyncTimeout,

  // don't use JSDOM for rendering. saves having to mock out
  // things like getBoundingClientRect + canvas element methods
  prerender: false,

  // use the demo site styles (else fonts, etc. are 😱)
  stylesheets: [path.join(__dirname, '/public/static/doc_styles.css')],

  // happo snapshots to include
  include: 'src/happo/*.@(ts|tsx)',

  // https://github.com/happo/happo.io/blob/3cba9a0a/README.md#comparethreshold-experimental
  compareThreshold: 0.008,

  targets: {
    'chrome-desktop': new RemoteBrowserTarget('chrome', {
      viewport: '800x552',
      prefersReducedMotion: true, // disables flaky tests caused by animation
    }),
  },

  // extend next's webpack config so examples can be used directly
  // https://github.com/happo/happo-next-demo
  customizeWebpackConfig: async (config) => {
    const nextConfig = await loadNextConfig('production', __dirname, null);
    const base = await getBaseWebpackConfig(__dirname, {
      config: nextConfig,
      entrypoints: {},
      pagesDir: findPagesDir(process.cwd()),
      rewrites: { beforeFiles: [], afterFiles: [], fallback: [] },
      runWebpackSpan: nextBuildSpan,
    });
    config.plugins = base.plugins;
    config.resolve = base.resolve;
    config.resolveLoader = base.resolveLoader;
    Object.keys(config.resolve.alias).forEach((key) => {
      if (!config.resolve.alias[key]) {
        delete config.resolve.alias[key];
      }
    });
    config.module = base.module;
    return config;
  },

  // use webpack from next.js
  webpack: webpack.webpack,

  // happo is unable to resolve some imports if the tmpdir isn't located inside
  // the project structure. The default is an OS provided folder, `os.tmpdir()`.
  tmpdir: path.join(__dirname, happoTmpDir),
};
