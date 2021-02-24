const { RemoteBrowserTarget } = require('happo.io');
const { findPagesDir } = require('next/dist/lib/find-pages-dir');
const getWebpackConfig = require('next/dist/build/webpack-config').default;
const nextConfig = require('./next.config');
const path = require('path');
const { asyncTimeout } = require('./.happo-variables');

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
  include: 'happo/*.@(ts|tsx)',

  // https://github.com/happo/happo.io/blob/3cba9a0a/README.md#comparethreshold-experimental
  compareThreshold: 0.008,

  targets: {
    'chrome-desktop': new RemoteBrowserTarget('chrome', {
      viewport: '800x552',
      prefersReducedMotion: true, // disables flaky tests caused by animation
    }),
  },

  // extend next's webpack config so examples can be used directly
  // this is largely taken from the happo storybook plugin
  customizeWebpackConfig: async config => {
    const base = await getWebpackConfig(__dirname, {
      config: {
        devIndicators: {},
        distDir: happoTmpDir,
        experimental: { plugins: [] },
        future: {},
        env: {},
        pageExtensions: ['pages.js'],
        sassOptions: {}, // we don't have this loader
        ...nextConfig,
      },
      rewrites: [],
      entrypoints: {},
      pagesDir: findPagesDir(process.cwd()),
    });
    config.plugins = base.plugins;
    config.resolve = base.resolve;
    config.resolveLoader = base.resolveLoader;
    Object.keys(config.resolve.alias).forEach(key => {
      if (!config.resolve.alias[key]) {
        delete config.resolve.alias[key];
      }
    });
    config.module = base.module;
    return config;
  },

  // happo is unable to resolve some imports if the tmpdir isn't located inside
  // the project structure. The default is an OS provided folder, `os.tmpdir()`.
  tmpdir: path.join(__dirname, happoTmpDir),
};
