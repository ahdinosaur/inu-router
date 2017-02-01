# inu-router

page router for inu

```shell
npm install --save inu-router
```

## example

```js
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
```

## usage

### `{ Page, modules } = require('inu-router')`

## license

The Apache License

Copyright &copy; 2017 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
