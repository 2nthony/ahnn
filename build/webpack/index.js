// collection
const path = require('path')
const fs = require('fs-extra')
const resolve = (...dir) => path.resolve(__dirname, ...dir)

const extendConfigs = fs
  .readdirSync(resolve())
  .filter((filename) => filename !== 'index.js')

module.exports = (chainWebpack) => {
  const collection = extendConfigs.map((filename) => require(resolve(filename)))

  console.log()
  collection.forEach((config) => {
    if (config.when && !config.when()) return

    if (config.apply && !config.disabled) {
      console.info('Apply config:', config.name) // eslint-disable-line no-console
      config.apply(chainWebpack)
    }
  })
}
