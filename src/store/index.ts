import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions';
import getters from '@/store/getters';
import state from '@/store/state';
import mutations from '@/store/mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
});
