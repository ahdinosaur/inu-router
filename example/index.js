const combine = require('depject')
const pull = require('pull-stream')
const start = require('inu-engine')
const { entry, modules: inuModules } = require('inu')
const { Page, modules: routerModules } = require('../')
const html = require('yo-yo')

const layoutModule = {
  needs: { inu: { html: 'first' } },
  gives: { layout: true },
  create: (api) => {
    return { layout }

    function layout (view) {
      return (model, dispatch) => html`
        <div>
          <nav>
            <a href='/'>home</a>
            <a href='/cats'>cats</a>
            <a href='/nope'>nope</a>
          </nav>
          ${view(model, dispatch)}
        </div>
      `
    }
  }
}

const homePage = Page({
  needs: {
    inu: { html: 'first' },
    layout: 'first'
  },
  create: (api) => ({
    route: '/',
    view: api.layout((model) => api.inu.html`
      <div>welcome home!</div>
    `)
  })
})

const catsPage = Page({
  needs: {
    inu: { html: 'first' },
    layout: 'first'
  },
  create: (api) => ({
    route: '/cats',
    view: api.layout((model) => api.inu.html`
      <div>meow :3</div>
    `)
  })
})

const missingPage = Page({
  needs: {
    inu: { html: 'first' },
    layout: 'first'
  },
  create: (api) => ({
    route: '/404',
    view: api.layout(() => api.inu.html`
      <div>404</div>
    `)
  })
})

const modules = {
  layoutModule,
  homePage,
  catsPage,
  missingPage,
  inuModules,
  routerModules
}

const sockets = combine(modules)
const store = entry(sockets)
const { views } = start(store)

const main = document.querySelector('.main')
pull(views(), pull.drain(html.update.bind(null, main)))
