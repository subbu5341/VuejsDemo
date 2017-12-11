import Vue from 'vue'
import Vuex from 'vuex'
import { API } from './api'
import axios from 'axios'
import communityforum from './modules/communityforum'
import organizations from './modules/organizations'
import application from './modules/application'
import messages from './modules/messages'
import module from './modules/module'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
axios.defaults.baseURL = API.BASE_URL

export default new Vuex.Store({
  state: {},
  modules: {
    communityforum,
    organizations,
    application,
    messages,
    module
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
