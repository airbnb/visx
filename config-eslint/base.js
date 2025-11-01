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
      plugins: [],
      globals: {
        // vitest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        vitest: 'readonly',
        vi: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        // other globals
        jsdom: 'readonly',
      },
      env: {
        node: true,
      },
      rules: {
        'max-classes-per-file': 'off',
        'no-magic-numbers': 'off',
        'sort-keys': 'off',

        // REACT
        'react/function-component-definition': 'off',
      },
    },
  ],
};
