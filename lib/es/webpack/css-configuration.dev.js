const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './sass/common.sass',
  output: {
    filename: "common.css"
  },
  module: {
    loaders: [
      {
        test: /\.sass|\.scss/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader!sass-loader",
          publicPath: 'stylesheets',
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("common.css")
  ]
}
