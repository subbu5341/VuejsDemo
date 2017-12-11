import truncate from './truncate'

let filters = {
  install (Vue) {
    Vue.filter('truncate', truncate)
  }
}

export default filters
