/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@src', path.resolve(__dirname, 'src'));
    config.resolve.alias.set('@api', path.resolve(__dirname, 'src', 'api', 'services'));
    config.resolve.alias.set('@shared', path.resolve(__dirname, '..', 'cte-shared'));
    config.resolve.alias.set('@shared-frontend', path.resolve(__dirname, 'src', 'shared-frontend'));
    config.resolve.alias.set('@components', path.resolve(__dirname, 'src', 'components'));
    config.resolve.alias.set('@pages', path.resolve(__dirname, 'src', 'pages'));
    config.resolve.alias.set('@assets', path.resolve(__dirname, 'assets'));

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
