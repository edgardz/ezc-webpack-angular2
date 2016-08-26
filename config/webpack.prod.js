var webpack           = require('webpack');
var webpackMerge      = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig      = require('./webpack.common.js');
var helpers           = require('./helpers');
var pkg               = require('../package.json');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {

  entry: {
    'polyfills':  './source/polyfills.ts',
    'vendor':     './source/vendor.ts',
    'app':        './source/main.ts'
  },

  output: {
    path: helpers.root('build'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('source', 'components'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      },
      {
        test: /\.css$/,
        include: helpers.root('source', 'components'),
        loader: 'css-to-string!css?sourceMap!postcss'
      }
    ]
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'source/index.hbs',
      version: 'v' + pkg.version + '&nbsp;&nbsp;→&nbsp;&nbsp;&nbsp;' + new Date().toGMTString()
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
