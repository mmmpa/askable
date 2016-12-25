module.exports = require('glob').sync('./src/*/index.js').reduce((a, v)=> {
  a[v.split('/')[2]] = v
  return a
}, {})
