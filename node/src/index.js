import Vue from 'vue'
import Vuex from 'vuex'

import App from './components/App.vue'

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})


const store = new Vuex.Store({
    state: {
          count: 0
        },
    mutations: {
          increment (state) {
                  state.count++
                }
        }
})

store.commit('increment')
console.log(store.state.count) // -> 1
