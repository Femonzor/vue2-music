import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Recommends = (resolve: Function) => {
  import('@/views/recommends/recommends.vue').then(module => {
    resolve(module);
  });
};

const Singer = (resolve: Function) => {
  import('@/views/singer/singer.vue').then(module => {
    resolve(module);
  });
};

const Rank = (resolve: Function) => {
  import('@/views/rank/rank.vue').then(module => {
    resolve(module);
  });
};

const Singers = (resolve: Function) => {
  import('@/views/singers/singers.vue').then(module => {
    resolve(module);
  });
};

const Disc = (resolve: Function) => {
  import('@/views/disc/disc.vue').then(module => {
    resolve(module);
  });
};

const Search = (resolve: Function) => {
  import('@/views/search/search.vue').then(module => {
    resolve(module);
  });
};

const TopList = (resolve: Function) => {
  import('@/views/top-list/top-list.vue').then(module => {
    resolve(module);
  });
};

const UserCenter = (resolve: Function) => {
  import('@/views/user-center/user-center.vue').then(module => {
    resolve(module);
  });
};

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
      children: [
        {
          path: ':id',
          name: 'top-list',
          component: TopList,
        },
      ],
    },
    {
      path: '/recommends',
      name: 'recommends',
      component: Recommends,
      children: [
        {
          path: ':id',
          name: 'disc',
          component: Disc,
        },
      ],
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [
        {
          path: ':id',
          component: Singer,
        },
      ],
    },
    {
      path: '/singers',
      name: 'singers',
      component: Singers,
      children: [
        {
          path: ':id',
          component: Singer,
        },
      ],
    },
    {
      path: '/user',
      name: 'user',
      component: UserCenter,
    },
  ],
});
