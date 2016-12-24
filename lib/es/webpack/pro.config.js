const webpack = require('webpack')
const glob = require('glob')
const path = require('path')

const CompressionPlugin = require("compression-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const entryPoints = glob.sync('./src/*/index.js').reduce((a, v)=> {
  a[v.split('/')[2]] = v // This Arraying puts a entry point into each workaround.
  return a
}, {})

const jsConfiguration = {
  entry: entryPoints,
  output: {
    publicPath: 'javascripts',
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
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
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}

const cssConfiguration = {
  entry: './sass/common.sass',
  output: {
    path: path.join(__dirname, '../../../public/css'),
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
  // cssConfiguration
]