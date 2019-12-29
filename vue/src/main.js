import Vue from 'vue';
import ActionCableVue from 'actioncable-vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'all',
  connectionUrl: 'wss://api.ty-po.com/cable', // 'ws://localhost:3000/cable',
  connectImmediately: false,
});


axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
axios.defaults.withCredentials = true;


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
        this.getAuth();
      },
      rejected() {},
      received(data) {
        console.log('public got this data', data);
      },
      disconnected() {},
    },
    chat_channel_private: {
      connected() {
        console.log('I am connected to the private chat channel.');
      },
      recieved(data) {
        console.log('private got this data', data);
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
    getAuth() {
      this.$cable.perform({
        channel: 'chat_channel_public',
        action: 'get_user',
      });
    },
  },
  mounted() {
    axios
      .get('https://api.ty-po.com/auth')
      .then((response) => {
        console.log(response);
        this.data = response;
      });
    this.$cable.subscribe(
      {
        channel: 'ChatChannel',
        room: 'public',
      },
      'chat_channel_public',
    );
    this.$cable.subscribe(
      {
        channel: 'ChatChannel',
        room: 'private',
      },
      'chat_channel_private',
    );
  },
}).$mount('#app');
