module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es5: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    semi: ['error', 'always'],
  },
};
