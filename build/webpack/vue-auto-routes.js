const VueAutoRoutes = require('vue-auto-routes/plugin')

exports.name = 'plugin:vue-auto-routes'

exports.apply = (config) => {
  config.plugin('vue-auto-routes').use(VueAutoRoutes, [
    {
      dir: 'src/views',
    },
  ])
}
