module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'eslint-plugin-prettier',
    '@typescript-eslint/eslint-plugin',
    'sonarjs'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:sonarjs/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'dist',
    'node_modules',
    'test'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/explicit-module-boundary-types': 2,
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
    'semi': ['error', 'always'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'custom': {
          'regex': '^I[A-Z]',
          'match': true
        }
      }
    ],
    'prettier/prettier': 'error',
  },
};
