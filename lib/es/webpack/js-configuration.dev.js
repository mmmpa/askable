module.exports = {
  entry: require('./js-entry-points'),
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
  }
}
