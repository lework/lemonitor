// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import { message } from 'ant-design-vue'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
// Vue.use(Antd)
Vue.prototype.$message = message
Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
  store.dispatch('onLoading', true)
  next()
})

router.afterEach((to, from) => {
  store.dispatch('onLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
