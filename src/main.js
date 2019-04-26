import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import center from './tools/center'
//引入全局工具
import tools from './tools'
Vue.config.productionTip = false

Vue.use(tools);
Vue.prototype.$center = center;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
