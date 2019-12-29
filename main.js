// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

Vue.prototype.$http = axios
// 把路径也放入全局变量
// Vue.prototype.$baseUrl = 'http://127.0.0.1:8002/myPostgresql/'
Vue.prototype.$baseUrl = '/api'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App: App
  },
  template: '<App/>',
  router: Router
})
