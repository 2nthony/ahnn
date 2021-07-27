const webpack = require('webpack')
const pkg = require('../../package.json')

const t = (val) => JSON.stringify(val)

exports.name = 'plugin:define-constants'

exports.apply = (config) => {
  config.plugin('define-constants').use(webpack.DefinePlugin, [
    {
      __GTAG_ID__: t(process.env.GTAG_ID),
      __APP_VERSION__: t(pkg.version),
      __DEPENDENCIES__: t(resolveAllDepsLicense()),
    },
  ])
}

const fastLicense = (name, license, homepage) => ({ name, license, homepage })
function resolveAllDepsLicense() {
  return [
    ...Object.keys(pkg.dependencies).map((dep) => {
      const depPkg = require(`${dep}/package.json`)
      return fastLicense(dep, depPkg.license, depPkg.homepage)
    }),
    fastLicense(
      'frappe-charts - Modified Ver. 1.5.6',
      'MIT',
      'https://github.com/frappe/charts#readme',
    ),
  ]
}
