import Vue from 'vue';
import Router from 'vue-router';
import Rank from './views/rank/rank.vue';
import Recommends from './views/recommends/recommends.vue';
import Search from './views/search/search.vue';
import Singers from './views/singers/singers.vue';
import Singer from './views/singer/singer.vue';

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
