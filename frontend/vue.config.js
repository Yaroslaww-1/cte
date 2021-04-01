/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@src', path.resolve(__dirname, 'src'));
    config.resolve.alias.set('@api', path.resolve(__dirname, 'src', 'api'));
    config.resolve.alias.set('@shared', path.resolve(__dirname, '..', 'cte-shared'));
    config.resolve.alias.set('@shared-frontend', path.resolve(__dirname, 'src', 'shared-frontend'));
    config.resolve.alias.set('@components', path.resolve(__dirname, 'src', 'components'));
    config.resolve.alias.set('@pages', path.resolve(__dirname, 'src', 'pages'));
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
};
