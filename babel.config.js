const esm = process.env.ESM;

const envOptions = {
  loose: true,
  modules: esm ? false : 'commonjs',
  shippedProposals: true,
  targets: {
    ie: 11,
  },
  bugfixes: false,
};

const presets = [
  ['@babel/preset-env', envOptions],
  ['@babel/preset-react', { runtime: 'automatic' }],
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
