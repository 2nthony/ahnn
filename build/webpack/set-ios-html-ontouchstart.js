exports.name = 'entry:set-ios-html-ontouchstart'

exports.apply = (config) => {
  config
    .entry('set-ios-html-ontouchstart')
    .add('./src/apps/set-ios-html-ontouchstart.ts')
}
