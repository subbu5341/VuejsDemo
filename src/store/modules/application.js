import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  applicationsList: []
}

const getters = {
  applicationsList: state => state.applicationsList
}

const actions = {
  getApplications ({ commit, state }, organizationId) {
    return axios.get('/organizations/' + organizationId + '/applications', {})
      .then(function (response) {
        commit(types.GET_APPLICATIONS_LIST, response.data)
      })
  }
}

const mutations = {
  [types.GET_APPLICATIONS_LIST] (state, data) {
    state.applicationsList = data.filter(item => item)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
