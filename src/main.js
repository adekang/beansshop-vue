import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// 路由
import router from './router'
// Vuex
import store from './store'
// 全局引入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.scss'
// 字体图标
import './assets/fonts/iconfont.css'

// 引入axios
import axios from 'axios'
// 配置默认请求地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
