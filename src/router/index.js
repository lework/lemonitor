import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home'
import 'amfe-flexible/index.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: 'home'
      },
      component: resolve => {
        require(['@/components/home.vue'], resolve)
      }
    },
    {
      path: '/usage',
      meta: {
        title: 'usage'
      },
      component: resolve => {
        require(['@/components/usage.vue'], resolve)
      }
    }
  ]
})
