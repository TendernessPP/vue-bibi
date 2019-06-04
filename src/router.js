import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: "about" */ './views/index.vue')
    },
    {
      path: '/test',
      component: () => import(/* webpackChunkName: "about" */ './views/test.vue')
    },
    {
      path: '/channel',
      name: 'channel',
      component: () => import(/* webpackChunkName: "about" */ './views/channel.vue')
    },
    {
      path: '/moving',
      name: 'moving',
      component: () => import(/* webpackChunkName: "about" */ './views/moving.vue')
    },
    {
      path: '/memberPurchase',
      name: 'memberPurchase',
      component: () => import(/* webpackChunkName: "about" */ './views/memberPurchase.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ './views/search.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import(/* webpackChunkName: "about" */ './views/me.vue')
    },
    {
      path: '/*',
      redirect: '/index'
    }
  ]
})
