const EXTS_GROUP = '{ts,tsx,js,jsx}';

// In TS, all arguments are required for type information,
// so we need to override the base JS setting.
const noUnused = { vars: 'all', args: 'none', ignoreRestSiblings: true };

const project = 'tsconfig.eslint.json';

module.exports = {
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },

  parserOptions: {
    project,
  },

  overrides: [
    {
      files: ['*.{ts,tsx}'],

      parser: '@typescript-eslint/parser',

      plugins: ['@typescript-eslint'],

      rules: {
        'func-call-spacing': 'off',
        'no-restricted-globals': 'off',
        'no-unused-vars': 'off',

        // IMPORT (Conflicts with TS patterns)
        'no-duplicate-imports': 'off', // Disabled in favor of import/no-duplicates
        'import/export': 'off', // TypeScript allows same name for type and value exports
        'import/extensions': [
          'error',
          'never',
          {
            json: 'always',
          },
        ],
        'import/named': 'off',
        'import/no-cycle': 'off',
        'import/no-duplicates': 'error', // Handles TS type/value namespace separation
        'import/no-named-as-default': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              `test/**/*.${EXTS_GROUP}`,
              `tests/**/*.${EXTS_GROUP}`,
              `**/*.test.${EXTS_GROUP}`,
              `**/jest.config.${EXTS_GROUP}`,
              `**/webpack.config.${EXTS_GROUP}`,
              `**/webpack.config.*.${EXTS_GROUP}`,
            ],
            optionalDependencies: false,
          },
        ],

        // REACT (We dont use prop types)
        'react/default-props-match-prop-types': 'off',
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.tsx'],
          },
        ],
        'react/no-unused-prop-types': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',

        // UNICORN
        'unicorn/no-fn-reference-in-iterator': 'off',

        // TYPESCRIPT
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/camelcase': 'off', // broken
        '@typescript-eslint/class-name-casing': 'off', // broken
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
        ],
        '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
        '@typescript-eslint/explicit-function-return-type': 'off', // Allow inferrence
        '@typescript-eslint/func-call-spacing': ['error', 'never'],
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/member-ordering': 'off', // Prefer react/sort-comp
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-function': 'off', // Default props are usually empty
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': [
          'warn',
          { fixToUnknown: false, ignoreRestArgs: true },
        ],
        '@typescript-eslint/no-extra-parens': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', noUnused],
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'off', // Lots of false positives
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/promise-function-async': 'off', // Conflicts with other async rules
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
      },
    },
  ],
};
