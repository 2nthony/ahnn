const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

exports.name = 'plugin:prerender-spa'

exports.when = () => process.env.NODE_ENV === 'production'

exports.apply = config => {
  config.plugin('prerender-spa').use(PrerenderSPAPlugin, [{
    staticDir: path.join(__dirname, 'dist'),
    routes: ['/', '/me']
  }])
}
