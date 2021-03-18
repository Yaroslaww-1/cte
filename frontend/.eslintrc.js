module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
	},
	extends: ['plugin:vue/vue3-essential', '@vue/standard', '@vue/typescript/recommended', '../.eslintrc.js']
};
