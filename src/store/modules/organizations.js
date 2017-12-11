import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  organizationList: []
}

const getters = {
  organizationList: state => state.organizationList
}

const actions = {
  getOrganizationsList ({ commit, state }) {
    axios.get('/organizations', {})
      .then(function (response) {
        commit(types.GET_ORG_LIST, response.data.data)
      })
  },
  sortByName ({ commit }) {
    commit(types.GET_FILTER_BY_NAME)
  },
  sortByCreatedDate ({ commit }) {
    commit(types.GET_FILTER_BY_CREATED_DATE)
  },
  sortByUpdatedDate ({ commit }) {
    commit(types.GET_FILTER_BY_UPDATED_DATE)
  },
  addOrganisation ({ commit }, data) {
    axios.post('/organizations', data)
      .then(function (response) {
        commit(types.ADD_ORGANIZATION, response.data)
      })
  },
  removeLogo ({ commit }, id) {
    axios.delete('/uploads/' + id)
      .then(function (response) {
        console.log(response)
      })
  }
}

const mutations = {
  [types.GET_ORG_LIST] (state, data) {
    state.organizationList = data.sort((a, b) => {
      var textA = a.name.toUpperCase()
      var textB = b.name.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
  },
  [types.GET_FILTER_BY_NAME] (state) {
    state.organizationList = state.organizationList.sort((a, b) => {
      var textA = a.name.toUpperCase()
      var textB = b.name.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
  },
  [types.GET_FILTER_BY_CREATED_DATE] (state) {
    state.organizationList.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  },
  [types.GET_FILTER_BY_UPDATED_DATE] (state) {
    state.organizationList.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  },
  [types.ADD_ORGANIZATION] (state, data) {
    state.organizationList.push(data)
    state.organizationList = state.organizationList.sort((a, b) => {
      var textA = a.name.toUpperCase()
      var textB = b.name.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
