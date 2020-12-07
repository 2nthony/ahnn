exports.name = 'module:vue-svg-loader'

exports.apply = config => {
  const svgRule = config.module.rule('svg')
  svgRule.uses.clear()
  svgRule
    .use('vue-loader')
    // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
    .loader('vue-loader-v16')
    .end()
    .use('vue-svg-loader')
    .loader('vue-svg-loader')
}
