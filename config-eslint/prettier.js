module.exports = {
  parser: '@babel/eslint-parser',

  extends: ['prettier'],

  plugins: ['prettier'],

  rules: {
    'prettier/prettier': 'error',
  },
};
