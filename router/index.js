const { State, Action, Effect } = require('inu')

module.exports = {
  view: require('./view'),
  state: State(require('./state')),
  set: Action(require('./set')),
  go: Action(require('./go')),
  listen: Effect(require('./listen')),
  navigate: Effect(require('./navigate')),
  scrollToHash: Effect(require('./scrollToHash'))
}
