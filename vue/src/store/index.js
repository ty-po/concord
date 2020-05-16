import Vue from 'vue';
import Vuex from 'vuex';
import auth from './actions/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
  },
  getters: {
    isAuthenticated: status => !!this.state.token,
    authStatus: state => state.status,
  },
  mutations: {
    [AUTH_REQUEST]: (state) => {
      this.state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
      this.state.status = 'success'
      this.state.token = token
    },
    [AUTH_ERROR]: (state) => {
      this.state.status = 'error'
    },
  },
  actions: {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit(AUTH_REQUEST)
        axios({url: `${this.api_host}/auth`, method: 'POST' })
          .then(resp => {
            const token = resp.data.find(a => a.provider == "spotify").token
            localStorage.setItem('user-token', token) // store the token in localstorage
            commit(AUTH_SUCCESS, token)
            // you have your token, now log in your user :)
            //dispatch(USER_REQUEST)
            resolve(resp)
          })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
      })
    },
  },
  modules: {
    auth,
  },
});
