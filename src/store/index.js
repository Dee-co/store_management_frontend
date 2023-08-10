import { createStore } from 'vuex'

export default createStore({
  state: {
    authToken: null,
  },
  getters: {
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
    clearAuthToken(state) {
      state.authToken = null;
    },
  },
  actions: {
    setAuthToken({ commit }, token) {
      commit('SET_AUTH_TOKEN', token);
    },
  },
  modules: {
  }
})
