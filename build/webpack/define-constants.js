const webpack = require('webpack')
const pkg = require('../../package.json')

const t = (val) => JSON.stringify(val)

exports.name = 'plugin:define-constants'

exports.apply = (config) => {
  config.plugin('define-constants').use(webpack.DefinePlugin, [
    {
      __APP_VERSION__: t(pkg.version),
      __DEPENDENCIES__: t(resolveAllDepsLicense()),
    },
  ])
}

function resolveAllDepsLicense() {
  return Object.keys(pkg.dependencies).map((dep) => {
    const depPkg = require(`${dep}/package.json`)
    return {
      name: dep,
      license: depPkg.license,
      homepage: depPkg.homepage,
    }
  })
}
