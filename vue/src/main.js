import Vue from 'vue';
import ActionCableVue from 'actioncable-vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'all',
  connectionUrl: 'wss://api.ty-po.com/cable',
  connectImmediately: true,
});

new Vue({
  router,
  store,
  render: h => h(App),

  data() {
    return {
      message: 'Hello world',
    };
  },
  channels: {
    ChatChannel: {
      connected() {},
      rejected() {},
      received(data) { console.log(data); },
      disconnected() {},
    },
  },
  methods: {
    sendMessage() {
      this.$cable.perform({
        channel: 'ChatChannel',
        action: 'send_message',
        data: {
          content: this.message,
        },
      });
    },
  },
  mounted() {
    this.$cable.subscribe({
      channel: 'ChatChannel',
      room: 'public',
    });
  },


}).$mount('#app');
