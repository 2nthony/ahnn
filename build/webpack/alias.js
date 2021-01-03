const { join } = require('path')

exports.name = 'resolve:alias'

exports.apply = (config) => {
  config.resolve.alias.set('@app', join(process.cwd(), 'src'))
  config.resolve.alias.set('@modules', join(process.cwd(), 'modules'))
}
