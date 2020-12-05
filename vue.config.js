const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const VueAutoRoutes = require('vue-auto-routes/plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  chainWebpack: config => {
    config.plugin('auto-routes').use(VueAutoRoutes, [{
      dir: 'src/views',
      next: true
    }])

    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader-v16') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

    if (isProd) {
      config.plugin('prerender-spa').use(PrerenderSPAPlugin, [{
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/', '/me']
      }])
    }
  }
}
