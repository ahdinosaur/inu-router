const Router = require('sheet-router')
const walk = require('sheet-router/walk')
const createLocation = require('sheet-router/create-location')

const sortRoutes = require('../lib/sortRoutes')

module.exports = {
  needs: {
    inu: { route: 'map' },
    router: { scrollToHash: 'first' }
  },
  path: ['router', 'set'],
  create: (api) => {
    const routes = sortRoutes(api.inu.route())

    // HACK to get route params
    var router = Router({ thunk: false }, routes)
    walk(router, (route, cb) => params => params)

    return {
      scope: ['router'],
      update: (model, nextRoute) => {
        var nextModel = createLocation(model, nextRoute)
        try {
          nextModel.params = router(nextModel.pathname)
        } catch (err) {
          if (/route '.*?' did not match/.test(err.message))
            nextModel.params = {}
          else throw err
        }
        
        if (nextModel.hash && nextModel.hash !== model.hash)
          var effect = scrollToHash(nextModel.hash)

        return { model: nextModel, effect }
      }
    }
  }
}
