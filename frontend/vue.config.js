/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	chainWebpack: config => {
		config.resolve.alias.set('@src', path.resolve(__dirname, 'src'));

		const svgRule = config.module.rule('svg');

		svgRule.uses.clear();

		svgRule
			.use('vue-loader')
			.loader('vue-loader-v16') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
			.end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader');
	},
	lintOnSave: process.env.NODE_ENV !== 'production',
};
