const assign = require('object-assign')
const Router = require('sheet-router')

const sortRoutes = require('../lib/sortRoutes')

module.exports = {
  needs: { inu: { route: 'map' } },
  gives: { inu: { enhancer: true } },
  create: (api) => {
    var router

    return { inu: { enhancer: inuRouter } }

    function viewByRoute (model, dispatch) {
      if (router === undefined) {
        const routes = sortRoutes(api.inu.route())
        router = Router(routes)
      }
      try {
        return router(model.router.href, model, dispatch)
      } catch (err) {
        if (/route '.*?' did not match/.test(err.message)) return
        else throw err
      }
    }

    function inuRouter (app) {
      return assign({}, app, { view: viewByRoute })
    }
  }
}
