const webpack = require('webpack')
const pkg = require('../../package.json')

const t = val => JSON.stringify(val)

exports.name = 'plugin:define-constants'

exports.apply = config => {
  config
    .plugin('define-constants')
    .use(webpack.DefinePlugin, [{
      __APP_VERSION__: t(pkg.version)
    }])
}
