import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/home/index').default
    },
    {
      path: '/report',
      name: 'report',
      component: require('@/views/report/index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
