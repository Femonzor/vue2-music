import Vue from 'vue';
import Router from 'vue-router';
import Rank from './views/rank/index.vue';
import Recommend from './views/recommend/index.vue';
import Search from './views/search/index.vue';
import Singer from './views/singer/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommend',
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
    },
  ],
});
