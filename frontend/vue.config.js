/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	chainWebpack: config => {
		config.resolve.alias.set('@src', path.resolve(__dirname, 'src'));
	},
	lintOnSave: process.env.NODE_ENV !== 'production',
};