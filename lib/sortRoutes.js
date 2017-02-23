module.exports = sortRoutes

function sortRoutes (routes) {
  return routes.slice().sort(sorter)
}

function sorter (a, b) {
  return b[0].length - a[0].length
}
