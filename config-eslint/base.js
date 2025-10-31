const EXTS = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const EXTS_GROUP = '{ts,tsx,js,jsx}';
const ASSET_EXT_PATTERN = /\.(ttf|eot|otf|svg|woff|woff2|mp3|png|jpg|jpeg|gif|ico)$/;

module.exports = {
  parser: '@babel/eslint-parser',

  parserOptions: {
    requireConfigFile: false,
  },

  extends: ['airbnb', 'plugin:jsx-a11y/recommended'],

  plugins: ['import', 'react', 'react-hooks'],

  globals: {
    // Metrics and analytics providers
    ga: 'readonly',
    // Mostly for easier compatibility between browsers, workers, etc
    global: 'readonly',
    // Mostly references to `process.env.NODE_ENV`
    process: 'readonly',
  },

  env: {
    browser: true,
    node: false,
  },

  reportUnusedDisableDirectives: true,

  settings: {
    propWrapperFunctions: ['forbidExtraProps', 'exact', 'Object.freeze'],
    'import/ignore': ['node_modules', '\\.json$', ASSET_EXT_PATTERN.source],
    'import/extensions': EXTS,
    'import/resolver': {
      node: {
        extensions: EXTS,
      },
    },
  },

  rules: {
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
  },

  overrides: [
    {
      files: [`*.test.${EXTS_GROUP}`],
      plugins: ['jest'],
      globals: {
        jsdom: 'readonly',
      },
      env: {
        jest: true,
        node: true,
      },
      rules: {
        'max-classes-per-file': 'off',
        'no-magic-numbers': 'off',
        'sort-keys': 'off',

        // JEST
        'jest/expect-expect': 'error',
        'jest/no-alias-methods': 'error',
        'jest/no-done-callback': 'error',
        'jest/no-disabled-tests': 'error',
        'jest/no-duplicate-hooks': 'error',
        'jest/no-export': 'error',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/no-jasmine-globals': 'error',
        'jest/no-standalone-expect': 'error',
        'jest/no-test-prefixes': 'error',
        'jest/no-test-return-statement': 'error',
        'jest/prefer-hooks-on-top': 'error',
        'jest/prefer-spy-on': 'error',
        'jest/prefer-todo': 'error',
        'jest/prefer-to-be': 'error',
        'jest/prefer-to-contain': 'error',
        'jest/prefer-to-have-length': 'error',
        'jest/require-to-throw-message': 'error',
        'jest/require-top-level-describe': 'error',
        'jest/valid-describe-callback': 'error',
        'jest/valid-expect': 'error',
        'jest/valid-title': 'error',

        // REACT
        'react/function-component-definition': 'off',
      },
    },
  ],
};
