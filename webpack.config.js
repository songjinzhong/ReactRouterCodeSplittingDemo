const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ENV = process.env.NODE_ENV || 'production'
const isDEV = ENV === 'production' ? false : true

const publicPath = isDEV
  ? '/'
  : 'http://127.0.0.1:8887/'

const cleanPath = isDEV ? [] : ['build']

const config = {
  mode: process.env.NODE_ENV || 'production',
  context: path.join(__dirname, 'src'),
  devServer: {
    contentBase: [
      path.join(__dirname, 'build'),
      path.join(__dirname),
    ],
  },
  entry: {
    // vendor: ['react', 'react-dom', 'react-router-dom'],
    index: './index.js',
    test: './index.js',
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
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        react: {
          name: 'react',
          chunks: 'all',
          test: /react/,
          priority: 1,
        },
        common: {
          name: 'common',
          chunks: 'all',
          test: /lodash/,
          minChunks: 2, // 至少两个
          priority: 2,
        }
      }
      // cacheGroups: {
      //   vendor: {
      //     name: 'vendor',
      //     chunks: 'initial',
      //     test: /react/,
      //   },
      //   lodash: {
      //     name: 'lodash',
      //     chunks: 'initial',
      //     test: /lodash/,
      //   }
      // }
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: './.eslintrc.js'
        }
      }
    }),
    new CleanWebpackPlugin(cleanPath),
  ]
}
if (isDEV) {
  config.devtool = 'source-map'
}
module.exports = config