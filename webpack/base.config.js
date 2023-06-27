const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outDir = path.resolve(__dirname, '../dist');

module.exports = {
  entry: [path.resolve(__dirname, '../src/index.js')],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // translates CSS into CommonJS modules
            'sass-loader', // compiles Sass to CSS
          ]
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/built/',
    filename: '[hash].bundle.js',
    devtoolModuleFilenameTemplate: '[resource-path]', // copied from Mathias, see: https://webpack.github.io/docs/configuration.html#output-devtoolmodulefilenametemplate
  },
  resolve: {
    extensions: ['.js'],
  },
  stats: {
    colors: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new CopyWebpackPlugin({patterns: [
      {from: path.resolve(__dirname, '../src/icons'), to: outDir},
      {from: path.resolve(__dirname, '../src/manifest.json'), to: outDir},
      {from: path.resolve(__dirname, '../src/browserconfig.xml'), to: outDir},
    ]}),
  ],
};
