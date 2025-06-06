module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    // 'eslint:recommended',
    '@vue/typescript'
  ],
  overrides: [
    {
      files: '*',
      rules: {
        'vue/no-mutating-props': 'off',
        'vue/multi-word-component-names': 0,
        'vue/no-reserved-component-names': 0
      }
    }
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
