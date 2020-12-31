const { isProd } = require('../shared')

exports.name = 'entry:misc'

exports.apply = (config) => {
  // 设置主题偏好
  // 应该在app挂载之前设置主题防止闪屏
  config.entryPoints.get('app').prepend('./src/app-entries/prefer-appreance.ts')

  const entryMisc = config.entry('misc')

  // ios 系统设置 ontouchstart
  entryMisc.add('./src/app-entries/set-ios-html-ontouchstart.ts')

  if (isProd) {
    // gtag
    entryMisc.add('./src/app-entries/gtag.ts')
  }
}
