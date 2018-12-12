const pkg = require('./package.json');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify').uglify;

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
  return o;
}, {});

export default [
  {
    input: 'src/index',
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        ENV: JSON.stringify('production')
      }),
      uglify()
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
        exclude: 'node_modules/**'
      }),
      replace({
        ENV: JSON.stringify('production')
      })
    ],
    output: [{ file: pkg.module, format: 'es' }]
  }
];
