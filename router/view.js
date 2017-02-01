const assign = require('object-assign')
const Router = require('sheet-router')

module.exports = {
  needs: { inu: { route: 'map' } },
  gives: { inu: { enhancer: true } },
  create: (api) => {
    const routes = api.inu.route()
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
