import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import auth from './actions/auth';

Vue.use(Vuex);

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
axios.defaults.withCredentials = true;

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    api_host: process.env.VUE_APP_API_HOSTNAME,
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    apiHost: state => state.api_host,
  },
  mutations: {
    [auth.REQUEST]: (state) => {
      state.status = 'loading';
    },
    [auth.SUCCESS]: (state, token) => {
      state.status = 'success';
      state.token = token;
    },
    [auth.ERROR]: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    [auth.REQUEST]: ({ commit, dispatch, getters }, user) => new Promise((resolve, reject) => {
      commit(auth.REQUEST);
      axios({ url: `${getters.apiHost}/auth`, method: 'GET' })
        .then((resp) => {
          if (resp.data !== null) {
            const { token } = resp.data.find(a => a.provider === 'spotify');
            localStorage.setItem('user-token', token); // store the token in localstorage
            commit(auth.SUCCESS, token);
            // you have your token, now log in your user :)
            dispatch('USER_REQUEST'); // TODO
            console.log(user); // TODO
            resolve(resp);
          } else {
            commit(auth.ERROR);
            localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
            reject(new Error('null response from /auth'));
          }
        })
        .catch((err) => {
          commit(auth.ERROR, err);
          localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
          reject(err);
        });
    }),
  },
  modules: {
    auth,
  },
});
