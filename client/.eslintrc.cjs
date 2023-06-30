module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    {
      extends: ['airbnb', 'plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': ['error'],
      },
    },
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
};
