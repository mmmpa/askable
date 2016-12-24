const entryPoints =  require('glob').sync('./src/*/index.js').reduce((a, v)=> {
  a[v.split('/')[2]] = v
  return a
}, {})

module.exports = {
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
