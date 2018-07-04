import Vue from 'vue';
import Router from 'vue-router';
import Rank from './views/rank/index.vue';
import Recommends from './views/recommends/index.vue';
import Search from './views/search/index.vue';
import Singers from './views/singers/index.vue';
import Singer from './views/singer/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommends',
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
    },
    {
      path: '/recommends',
      name: 'recommends',
      component: Recommends,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/singers',
      name: 'singers',
      component: Singers,
      children: [
        {
          path: ':id',
          name: 'singer',
          component: Singer,
        },
      ],
    },
  ],
});
