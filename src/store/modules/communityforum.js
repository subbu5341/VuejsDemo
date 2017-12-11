import * as types from '../mutation-types'
import { API } from '../api'
import axios from 'axios'

const state = {
  forumTopicList: []
}

const getters = {
  forumTopicList: state => state.forumTopicList
}

const actions = {
  getforumTopicList ({ commit, state }) {
    axios.get(API.FORUM_TOPIC_LIST, {})
      .then(function (response) {
        commit(types.GET_FORUM_TOPIC_LIST, response.data.data)
      })
  }
}

const mutations = {
  [types.GET_FORUM_TOPIC_LIST] (state, data) {
    state.forumTopicList = data[0].topics
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
