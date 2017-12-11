import * as types from '../mutation-types'
import { API } from '../api'
import axios from 'axios'

const state = {
  messages: []
}

const getters = {
  messages: state => state.messages
}

const actions = {
  getMessages ({ commit, state }) {
    axios.get(API.MESSAGES, {})
      .then(function (response) {
        commit(types.GET_MESSAGES, response.data.data)
      })
  }
}

const mutations = {
  [types.GET_MESSAGES] (state, data) {
    state.messages = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
