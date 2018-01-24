module.exports = {
  presets: [
    ['es2015', { 'modules': process.env.BABEL_ENV === 'es6' ? false : 'commonjs' }],
    'react',
    'stage-0'
  ],
  plugins: [],
  env: {
    development: {
      plugins: [
        ['react-transform', {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }]
        }],
        'transform-runtime',
        'transform-decorators-legacy'
      ]
    }
  }
}
