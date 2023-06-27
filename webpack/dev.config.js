const path = require('path');
const base = require('./base.config');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const developmentConfig = {
  devServer: {
    // stats: 'errors-only',
    static: path.resolve(__dirname, 'dist'),
    // compress: true,
    port: 3000,
  },
  devtool: 'eval', // babel sourcemap setting, this is best for development but has no source maps - see https://webpack.github.io/docs/configuration.html#devtool alternative cheap-module-eval-source-map: has proper source maps in development
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

module.exports = merge(base, developmentConfig);
