var webpack           = require('webpack');
var webpackMerge      = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig      = require('./webpack.common.js');
var helpers           = require('./helpers');
var pkg               = require('../package.json');


console.log('\n\n --->  WEBPACK RESULT IS SERVED FROM http://0.0.0.0:8080/  <--- \n\n');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  entry: {
    'polyfills':  './source/polyfills.ts',
    'vendor':     './source/vendor.ts',
    'app': [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      './source/main.ts'
    ]
  },

  output: {
    path: helpers.root('build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
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
        loader: 'url'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('source', 'components'),
        loader: 'style!css?sourceMap!postcss'
      },
      {
        test: /\.css$/,
        include: helpers.root('source', 'components'),
        loader: 'css-to-string!css?sourceMap!postcss'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'source/index.hbs',
      version: 'v' + pkg.version + '&nbsp;&nbsp;→&nbsp;&nbsp;&nbsp;' + new Date().toGMTString()
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    inline: true,
    host: '0.0.0.0',
    port: '8080'
  }
});
