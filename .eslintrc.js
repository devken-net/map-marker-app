module.exports = {
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:import/errors'],
  plugins: ['html', 'import'],
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      arrowFunctions: true,
    },
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'implicit-arrow-linebreak': 'off',
    // in browsers extensions are mandatory. For now we don't enforce either way
    'import/extensions': 0,
    // enable easier refactoring and IDE support for auto fix imports
    'import/no-default-export': 'error',
    // import order to prevent merge conflicts
    'import/order': ['error'],
    'import/prefer-default-export': 0,
    // less code changes when adding or removing parameters
    'arrow-parens': ['error', 'always'],
    // compact form allows better readability
    'max-len': ['error', { code: 80, ignoreStrings: true }]
  }
};