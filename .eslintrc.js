module.exports = {
  root: true,
  // Recognize global vars for these environments
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    // Possible errors
    'no-console': 'off',

    // Best practices
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    'no-unused-vars': ['warn', { args: 'all', argsIgnorePattern: '^_' }],

    // Stylistic
    '@typescript-eslint/indent': ['warn', 2],
    'arrow-body-style': 'off',
    'arrow-parens': ['warn', 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
    'import/prefer-default-export': 'off',
    'lines-between-class-members': ['warn', 'always'],
    'no-trailing-spaces': 'warn',
    'padded-blocks': 'off',
    'quotes': ['warn', 'single'],
  },
};
