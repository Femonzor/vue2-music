module.exports = {
  root: true,
  env: {
    node: true
  },
  // parserOptions: {
  //   'ecmaVersion': 6
  // },
  // parser: 'typescript-eslint-parser',
  // plugins: [
  //   'vue',
  //   'typescript'
  // ],
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'trailingComma': 'all',
      'jsxBracketSameLine': true,
      'printWidth': 100,
    }],
    'vue/no-unused-vars': 'off',
  }
}
