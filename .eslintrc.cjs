module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier', // This line replaces 'prettier/@typescript-eslint'
  ],
  rules: {
    // Add your custom rules here
  },
};
