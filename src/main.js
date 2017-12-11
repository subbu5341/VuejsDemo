// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import 'npm-font-open-sans/open-sans.css'
import store from './store'
import filters from './assets/filters/index'

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: () => {
      return EventBus
    }
  }
})

Vue.use(BootstrapVue)
Vue.use(filters)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
