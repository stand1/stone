import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  msgs: 'Hello World',
  val: 'aaaa'
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
  },
  mutationGetVal (state, str) {
    console.log(str)
    state.val = str
    return state.val
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
  },
  actionsGetVal ({commit}, str) {
    return commit('mutationGetVal', str)
  }
}

const getters = {
  getterCount (state) {
    return state.count
  },
  getterMsgs (state) {
    return state.msgs
  },
  getterVal (state) {
    return state.val
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
