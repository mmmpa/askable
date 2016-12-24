const entryPoints =  require('glob').sync('./src/*/index.js').reduce((a, v)=> {
  a[v.split('/')[2]] = v
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
  }
}

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssConfiguration = {
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
          loader: "css-loader?minimize!sass-loader",
          publicPath: 'stylesheets',
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("common.css")
  ]
}

module.exports = [
  jsConfiguration,
  // cssConfiguration
]