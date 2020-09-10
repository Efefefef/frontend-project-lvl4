module.exports = {
  parser: 'babel-eslint',
    parserOptions: {
      sourceType: "module",
    },
  plugins: [
    'import',
    'react',
    'jsx-a11y',
    'jest'
  ],
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  env: {
    'node': true,
    'jest': true,
    'browser': true
  },
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    // 'no-shadow': 'off',
    'no-console': 'off',
    'react/prop-types': 'off'
  }
}
