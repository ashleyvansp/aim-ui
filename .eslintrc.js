module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
  ],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'indent': 'warn',
    'no-trailing-spaces': 'warn',
    'max-len': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
