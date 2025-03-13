module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
  ],
  rules: {
    'space-before-function-paren': [2, 'never']
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/recommended'
  ]
}
