const { isProd } = require('../shared')

exports.name = 'entry:misc'

exports.apply = (config) => {
  const entryMisc = config.entry('misc')

  // 设置主题偏好
  entryMisc.prepend('./src/app-entries/prefer-appreance.ts')

  // ios 系统设置 ontouchstart
  entryMisc.add('./src/app-entries/set-ios-html-ontouchstart.ts')

  if (isProd) {
    // gtag
    entryMisc.add('./src/app-entries/gtag.ts')
  }
}
