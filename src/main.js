import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { message } from "ant-design-vue";
import axios from "axios";
import "amfe-flexible";

Vue.config.productionTip = false;

Vue.prototype.$message = message;

axios.defaults.baseURL = process.env.API_ROOT;
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  store.dispatch("onLoading", true);
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  store.dispatch("onLoading", false);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
