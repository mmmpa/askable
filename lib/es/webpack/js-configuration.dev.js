var webpack = require("webpack");

module.exports = {
  entry: require('./js-entry-points'),
  output: {
    publicPath: 'javascripts',
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    })
  ]
};
