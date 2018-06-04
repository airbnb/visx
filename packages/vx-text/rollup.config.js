const pkg = require('./package.json');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

const name = pkg.name.replace('@vx/', '');
const deps = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies
});

const globals = deps.reduce((o, name) => {
  if (name.includes('@vx/')) {
    o[name] = 'vx';
  }
  if (name.includes('d3-')) {
    o[name] = 'd3';
  }
  if (name === 'react') {
    o[name] = 'React';
  }
  if (name === 'react-dom') {
    o[name] = 'ReactDOM';
  }
  if (name === 'prop-types') {
    o[name] = 'PropTypes';
  }
  if (name === 'classnames') {
    o[name] = 'classNames';
  }
  if (name === 'lodash-es') {
    o[name] = 'lodash';
  }
  return o;
}, {});

export default [
  {
    input: 'src/index',
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
        plugins: ['lodash', 'external-helpers']
      }),
      commonjs()
    ],
    output: {
      extend: true,
      file: pkg.main,
      format: 'umd',
      globals,
      name: 'vx'
    }
  },
  {
    input: 'src/index',
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
        plugins: ['lodash', 'external-helpers']
      }),
      commonjs()
    ],
    output: [{ file: pkg.module, format: 'es' }]
  }
];
