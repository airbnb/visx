const esm = process.env.ESM;

const envOptions = {
  loose: false,
  modules: esm ? false : 'commonjs',
  shippedProposals: true,
  targets: {
    browsers: [
      'chrome >= 108',
      'edge >= 108',
      'firefox >= 133',
      'safari >= 15.6',
      'ios_saf >= 15.6',
      'samsung >= 27',
    ],
  },
  bugfixes: false,
};

const presets = [
  ['@babel/preset-env', envOptions],
  ['@babel/preset-react', { runtime: 'automatic', useBuiltIns: true, useSpread: true }],
  '@babel/preset-typescript',
];

const plugins = [];

const ignore = [
  'coverage/',
  'public/',
  'esm/',
  'lib/',
  'tmp/',
  'dist/',
  '*.d.ts',
  '__tests__',
  '__mocks__',
];

switch (process.env.NODE_ENV) {
  case 'test': {
    envOptions.modules = 'commonjs';
    envOptions.targets = { node: 'current' };
    plugins.push('babel-plugin-dynamic-import-node');
    break;
  }

  case 'development':
  case 'production':
  default: {
    break;
  }
}

module.exports = {
  ignore,
  plugins,
  presets,
};
