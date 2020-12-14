const fs = require('fs-extra')
const { collectRoutes } = require('vue-auto-routes/lib/collect-fs-routes')
const { routesFilePath } = require('./shared')

// prepare routes for prerender-spa
async function prepareRoutes() {
  const _routes = await collectRoutes({
    dir: 'src/views',
  })

  const routes = _routes.map(({ path }) => path)
  const data = `exports.routes=${JSON.stringify(routes)}`

  await fs.outputFile(routesFilePath, data, 'utf8')
}

prepareRoutes()
