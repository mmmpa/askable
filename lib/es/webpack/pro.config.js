const webpack = require('webpack')
const glob = require('glob')
const path = require('path')

const CompressionPlugin = require("compression-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const jsConfiguration = {
  entry: require('./js-entry-points'),
  output: {
    path: 'dist/javascripts',
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$/,
      threshold: 0,
      minRatio: 0.8
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    })
  ]
}

const cssConfiguration = {
  entry: './sass/common.sass',
  output: {
    path: 'dist/stylesheets',
    filename: "common.css"
  },
  module: {
    loaders: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.sass|\.scss/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader?minimize!sass-loader"
        })
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.css$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ExtractTextPlugin("common.css")
  ]
}

module.exports = [
  jsConfiguration,
  cssConfiguration
]