import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
const FastClick = require('fastclick');

import '@/assets/stylus/index.styl';

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
