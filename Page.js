const assign = require('object-assign')
const N = require('libnested')

module.exports = PageModule

function PageModule (definition) {
  const {
    needs = {},
    create: createPage
  } = definition

  const gives = { inu: { route: true } }
  
  return { needs, gives, create }
  
  function create (api) {
    const route = Route(createPage(api))
    var module = {}
    N.set(module, ['inu', 'route'], route)
    return module
  }
}

function Route ({ route, view }) {
  return function () {
    return [route, (params, model, dispatch) => {
      return view(model, dispatch)
    }]
  }
}

