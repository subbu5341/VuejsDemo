import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  moduleList: [],
  moduleStatistics: []
}

const getters = {
  moduleList: state => state.moduleList,
  moduleStatistics: state => state.moduleStatistics
}

const actions = {
  getModule ({ commit, state }, data) {
    axios.get('/organizations/' + data.organizationId + '/applications/' + data.applicationId, {})
      .then(function (response) {
        commit(types.GET_MODULE_LIST, response.data.percentage)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getModuleStatistics ({ commit, state }, moduleId) {
    // TODO URL and it's params might be changed
    axios.get('/statistics/' + moduleId)
      .then(function (response) {
        commit(types.GET_MODULE_STATISTICS, response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

const mutations = {
  [types.GET_MODULE_LIST] (state, data) {
    state.moduleList = data
  },
  [types.GET_MODULE_STATISTICS] (state, data) {
    state.moduleStatistics = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
