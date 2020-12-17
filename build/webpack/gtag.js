exports.name = 'entry:gtag'

exports.when = () => process.env.NODE_ENV === 'production'

exports.apply = (config) => {
  config.entry('gtag').add('./src/gtag.ts')
}
