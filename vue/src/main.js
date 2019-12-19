import Vue from 'vue';
import ActionCableVue from 'actioncable-vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'all',
  connectionUrl: 'ws://localhost:3000/cable',
  connectImmediately: false,
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
    chat_channel_public: {
      connected() {
        console.log('I am connected to the public chat channel.');
        this.sendMessage();
        this.message = 'Number 2';
        this.sendMessage();
      },
      rejected() {},
      received(data) {
        console.log('I got this data', data);
      },
      disconnected() {},
    },
    chat_channel_private: {
      connected() {
        console.log('I am connected to the private chat channel.');
      },
    },
  },
  methods: {
    sendMessage() {
      this.$cable.perform({
        channel: 'chat_channel_public',
        action: 'send_message',
        data: {
          content: this.message,
        },
      });
    },
  },
  mounted() {
    this.$cable.subscribe(
      {
        channel: 'ChatChannel',
        room: 'public',
      },
      'chat_channel_public',
    );
  },


}).$mount('#app');
