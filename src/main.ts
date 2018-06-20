import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyLoad from 'vue-lazyload';
const FastClick = require('fastclick');

import '@/assets/stylus/index.styl';

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: require('@/assets/images/blank_1x1.png'),
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
