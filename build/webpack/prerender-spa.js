const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const { routesFilePath, isProd } = require('../shared')

exports.name = 'plugin:prerender-spa'

exports.when = () => isProd

exports.apply = (config) => {
  const { routes } = require(routesFilePath)

  config.plugin('prerender-spa').use(PrerenderSPAPlugin, [
    {
      staticDir: path.resolve(__dirname, '../../dist'),
      routes,
    },
  ])
}
