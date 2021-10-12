import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    SET_USER({commit}, user) {
      this.state.user = user
    }
  },
  getters: {
    getUser: (state) => state.user
  }
})
