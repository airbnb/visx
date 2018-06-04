const pkg = require('./package.json');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

const name = pkg.name.replace('@vx/', '');
const deps = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies
});

export default [
  {
    input: 'src/index',
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
        plugins: ['external-helpers']
      })
    ],
    output: {
      extend: true,
      file: pkg.main,
      format: 'umd',
      globals: deps,
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
        plugins: ['external-helpers']
      })
    ],
    output: [{ file: pkg.module, format: 'es' }]
  }
];
