exports.name = 'module:vuedown-loader'

exports.apply = (config) => {
  config.module
    .rule('vuedown')
    .test(/\.md$/)
    .use('vue-loader')
    .loader('vue-loader-v16')
    .end()
    .use('vuedown-loader')
    .loader('@evillt/vuedown-loader')
}
