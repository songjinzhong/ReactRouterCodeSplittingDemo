const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ENV = process.env.NODE_ENV || 'production'
const isDEV = ENV === 'production' ? false : true
const publicPath = isDEV
  ? '/'
  : 'http://127.0.0.1:8887/'
module.exports = {
  mode: process.env.NODE_ENV || 'production',
  context: path.join(__dirname, 'src'),
  devServer: {
    contentBase: [
      path.join(__dirname, 'build'),
      path.join(__dirname),
    ],
  },
  entry: {
    index: './index.js',
  },
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
    publicPath: publicPath,
    path: path.join(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /\.min\.js$/],
        enforce: 'pre',
        loader: 'eslint-loader',
        options: { fix: true },
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /\.min\.js$/],
        loader: 'babel-loader',
        options: {
          presets: ['react', ['env', { modules: false }]],
          plugins: ['transform-class-properties', 'syntax-dynamic-import'],
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: './.eslintrc.js'
        }
      }
    }),
    new CleanWebpackPlugin(['build']),
  ]
}