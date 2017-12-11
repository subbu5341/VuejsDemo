import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Organization from '@/components/Organization'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/organization/:id',
      name: 'Organization',
      component: Organization
    }
  ]
})
