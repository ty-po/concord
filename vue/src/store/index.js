import Vue from 'vue';
import Vuex from 'vuex';

import Discord from 'discord.js';
import Spotify from 'spotify-web-api-node';

import axios from 'axios';
import auth from './actions/auth';

import player from './actions/player';

Vue.use(Vuex);

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
axios.defaults.withCredentials = true;

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    player: '',
    player_insights: '',
    api_host: process.env.VUE_APP_API_HOSTNAME,
    spotify: new Spotify(),
    discord: new Discord.Client(),
    debug: '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    apiHost: state => state.api_host,
    spotify: state => state.spotify,
    discord: state => state.discord,
    playing_id: state => state.player?.item?.id,
  },
  mutations: {
    [auth.REQUEST]: (state) => {
      state.status = 'loading';
    },
    [auth.SUCCESS]: (state, token) => {
      state.status = 'success';
      state.token = token;
      state.spotify.setAccessToken(token.spotify);
      state.discord.login(token.discord);
    },
    [auth.ERROR]: (state) => {
      state.status = 'error';
    },
    [player.FETCH]: (state, data) => {
      state.player = data;
    },
    [player.LOAD]: (state, data) => {
      state.player_insights = data;
    },
  },
  actions: {
    [auth.REQUEST]: ({ commit, dispatch, getters }, user) => new Promise((resolve, reject) => {
      commit(auth.REQUEST);
      axios({ url: `${getters.apiHost}/auth`, method: 'GET' })
        .then((resp) => {
          if (resp.data !== null) {
            const token = {
              spotify: resp.data.find(a => a.provider === 'spotify')?.token,
              discord: resp.data.find(a => a.provider === 'discord')?.token,
            };
            localStorage.setItem('user-token', token); // store the token in localstorage
            commit(auth.SUCCESS, token);
            // you have the token now log in your user :)
            setInterval(() => { dispatch(player.FETCH); }, 3000); // TODO
            dispatch(player.LOAD);
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
    [player.FETCH]: ({ commit, dispatch, getters }) => new Promise((resolve, reject) => {
      getters.spotify.getMyCurrentPlaybackState({
      })
        .then((data) => {
          console.log(data.body);
          if (getters.playing_id !== data.body.item.id) {
            commit(player.FETCH, data.body);
            dispatch(player.LOAD);
          } else {
            commit(player.FETCH, data.body);
          }
          resolve(data);
        }, (err) => {
          reject(new Error('rip', err));
        });
    }),
    [player.LOAD]: ({ commit, getters }) => new Promise((resolve, reject) => {
      getters.spotify.getAudioFeaturesForTrack(getters.playing_id)
        .then((features) => {
          getters.spotify.getAudioAnalysisForTrack(getters.playing_id)
            .then((analysis) => {
              // Output items
              const data = { features: features.body, analysis: analysis.body };
              commit(player.LOAD, data);
              resolve(data);
            }, (err) => {
              reject(new Error('rip', err));
            });
        }, (err) => {
          reject(new Error('rip', err));
        });
    }),
  },
  modules: {
    auth,
  },
});
