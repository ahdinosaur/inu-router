const pull = require('pull-stream')
const Pushable = require('pull-pushable')
const createLocation = require('sheet-router/create-location')

module.exports = {
  needs: { router: { set: 'first' } },
  path: ['router', 'navigate'],
  create: (api) => ({
    run: (model, nextRoute, { models }) => {
      const nextModel = createLocation(model, nextRoute)
 
      // update url bar if it changed
      if (nextModel.href !== model.href) {
        window.history.pushState({}, null, nextModel.href)
      }

      return pull.values([
        api.router.set(nextRoute)
      ])
    }
  })
}
