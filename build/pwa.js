const { isProd } = require('./shared')

module.exports = {
  name: isProd ? 'Ahnn' : 'Ahnn Dev',
  themeColor: '#000000',
  msTileColor: '#000000',

  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black-translucent',
}
