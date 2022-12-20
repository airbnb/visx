module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    // these are relics of nimbus, we could definitely simplify + consolidate
    './config-eslint/base.js',
    './config-eslint/next.js',
    './config-eslint/typescript.js',
    './config-eslint/prettier.js',
  ],
  overrides: [
    {
      files: '*.test.{js,jsx,ts,tsx}',
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'jest/require-to-throw-message': 'off',
      },
    },
    {
      files: '*.{js,jsx,ts,tsx}',
      rules: {
        'arrow-parens': 'off',
        'consistent-return': 'off',
        'import/prefer-default-export': 'off',
        'linebreak-style': 'off',
        'lines-between-class-members': 'off',
        'no-console': 'off',
        'no-nested-ternary': 'off',
        'no-param-reassign': 'warn',
        'no-restricted-syntax': 'off',
        'no-use-before-define': 'off',
        'no-useless-rename': 'off',
        'object-curly-newline': 'off',
        'operator-linebreak': 'off',
        'promise/param-names': 'off',
        'react/destructuring-assignment': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-curly-brace-presence': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-no-literals': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-sort-default-props': 'off',
        'react/jsx-sort-props': 'off',
        'react/no-array-index-key': 'off',
        'react/no-children-prop': 'off',
        'react/require-default-props': 'off',
        'react/sort-comp': 'off',
        'react/sort-prop-types': 'off',
        'unicorn/catch-error-name': 'off',
        'unicorn/no-fn-reference-in-iterator': 'off',
        'unicorn/prefer-node-append': 'off',
      },
    },
    {
      files: './packages/visx-demo/**',
      rules: {
        '@typescript-eslint/no-explicit-any': [
          'warn',
          {
            fixToUnknown: false,
          },
        ],
        'import/no-unresolved': [
          'error',
          {
            ignore: ['^!!raw-loader!.*'],
          },
        ],
        'import/no-webpack-loader-syntax': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/no-onchange': 'off',
        'no-alert': 'off',
        'no-param-reassign': 'off',
        'react/button-has-type': 'off',
        'react/no-danger': 'off',
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off',
        'react/state-in-constructor': 'off',
      },
    },
  ],
};
