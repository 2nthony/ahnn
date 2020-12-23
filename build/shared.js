const path = require('path')
const resolve = (...dir) => path.resolve(__dirname, ...dir)

exports.routesFilePath = resolve('.share', 'routes.js')
exports.isProd = process.env.NODE_ENV === 'production'
