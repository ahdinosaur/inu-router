const assign = require('object-assign')
const Router = require('sheet-router')

const sortRoutes = require('../lib/sortRoutes')

module.exports = {
  needs: { inu: { route: 'map' } },
  gives: { inu: { enhancer: true } },
  create: (api) => {
    const routes = sortRoutes(api.inu.route())
    const router = Router(routes)

    return { inu: { enhancer: inuRouter } }

    function viewByRoute (model, dispatch) {
      return router(model.router.href, model, dispatch)
    }

    function inuRouter (app) {
      return assign({}, app, { view: viewByRoute })
    }
  }
}
