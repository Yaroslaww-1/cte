module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 2,
    'max-len': [
      'warn',
      {
        'code': 120,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreComments': true
      }
    ],
    'object-curly-spacing': ['warn', 'always'],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always']
  },
};
