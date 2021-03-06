module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  extends: [
    '../.eslintrc.js'
  ],
  overrides: [
    {
      "files": ["**/*.model.ts"],
      "rules": {
        "@typescript-eslint/naming-convention": ["off"],
        "@typescript-eslint/no-empty-interface": ["off"],
      }
    }
  ]
};
