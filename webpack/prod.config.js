const base = require('./base.config');
const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");

const productionConfig = {
  devtool: 'source-map', // activate source maps, see https://webpack.github.io/docs/configuration.html#devtool alternative cheap-module-eval-source-map: has proper source maps in development
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

module.exports = merge(base, productionConfig);
