import Vue from 'vue'
import Router from 'vue-router'
// import NewPage from '@/pages/mainPage/newPage'
import demePage from '@/pages/mainPage/demoPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      // redirect: '/home',
      // component: require('@/components/LandingPage').default
      // component: require('@/pages/mainPage/mainPage').default
      // component: require('@/pages/mainPage/demoPage').default
      component: demePage
      // component: import('../pages/mainPage/demoPage')
      // children: [
      //   {
      //     path: '/home',
      //     component: import('../pages/mainPage/demoPage'),
      //     name: 'home',
      //     meta: {
      //       title: 'home'
      //     }
      //   }
      //   {
      //     path: '/newPage2',
      //     component: import('../pages/mainPage/demoPage'),
      //     name: 'NewPage2',
      //     meta: {
      //       title: 'NewPage2'
      //     }
      //   }
      // ]
    },
    // {
    //   path: '/home',
    //   component: import('../pages/mainPage/demoPage'),
    //   name: 'NewPage2',
    //   meta: {
    //     title: 'NewPage2'
    //   }
    // },
    {
      name: 'newPage2',
      path: '/new-page',
      component: function (resolve) {
        require(['../pages/mainPage/newPage2'], resolve)
      }
    }
    // {
    //   path: '/newPage2',
    //   component: import('../pages/mainPage/demoPage'),
    //   name: 'NewPage2',
    //   meta: {
    //     title: 'NewPage2'
    //   }
    // }
    // {
    //   path: '/newPage',
    //   name: 'landing-newPage',
    //   // component: require('@/components/LandingPage').default
    //   // component: require('@/pages/mainPage/mainPage').default
    //   component: import('@/pages/mainPage/newPage')
    // }
    // {
    //   path: '*',
    //   redirect: '/'
    // }
  ]
})
