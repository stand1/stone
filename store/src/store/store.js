import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  msgs: 'Hello World'
}

const mutations = {
  mutationsAddCount (state) {
    return (state.count++)
  },
  mutationsReduceCount (state) {
    return (state.count--)
  },
  mutationChangeMsgs (state) {
    state.msgs = state.msgs.split('').reverse().join('')
    return state.msgs
  }
}

const actions = {
  actionsAddCount (context) {
    return context.commit('mutationsAddCount')
  },
  actionsReduceCount ({ commit }) {
    return commit('mutationsReduceCount')
  },
  actionsChangeMsgs ({ commit }) {
    return commit('mutationChangeMsgs')
  }
}

const getters = {
  getterCount (state) {
    return state.count
  },
  getterMsgs (state) {
    return state.msgs
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
