import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  mutationsAddCount (state) {
    return (state.count++)
  },
  mutationsReduceCount (state) {
    return (state.count--)
  }
}

const actions = {
  actionsAddCount (context) {
    return context.commit('mutationsAddCount')
  },
  actionsReduceCount ({ commit }) {
    return commit('mutationsReduceCount')
  }
}

const getters = {
  getterCount (state) {
    return state.count
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
