var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers           = require('./helpers');
var pkg               = require('../package.json');

module.exports = {

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  postcss: function (webpack) {
    return [
      require('postcss-import')({addDependencyTo: webpack}),
      require('precss')(),
      require('postcss-image-sizes')({assetsPath: './source/assets/images'}),
      require('postcss-at2x')(),
      require("postcss-calc")({mediaQueries: true}),
      require('autoprefixer')()
    ]
  }
};
