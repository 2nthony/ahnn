const { isProd } = require('../shared')

exports.name = 'entry:misc'

exports.apply = (config) => {
  const entryMisc = config.entry('misc')

  // ios 系统设置 ontouchstart
  entryMisc.add('./src/app-entries/set-ios-html-ontouchstart.ts')

  if (isProd) {
    // gtag
    entryMisc.add('./src/app-entries/gtag.ts')
  }
}
