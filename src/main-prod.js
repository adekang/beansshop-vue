import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// 路由
import router from './router'
// Vuex
import store from './store'
// 全局引入 ElementUI
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.scss'
// 字体图标
import './assets/fonts/iconfont.css'
//导入vue-quill-editor（富文本编辑器）
import VueQuillEditor from 'vue-quill-editor'


// 引入加载效果
import NProgress from 'nprogress'

//全局注册组件
Vue.component('tree-table', TreeTable)
//全局注册富文本组件
Vue.use(VueQuillEditor)

// 引入axios
import axios from 'axios'
// 配置默认请求地址
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'
// 设置拦截器
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

axios.interceptors.request.use(config => {
  //当进入request拦截器，表示发送了请求，我们就开启进度条
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
//在response拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  //当进入response拦截器，表示请求已经结束，我们就结束进度条
  NProgress.done()
  return config
})

import TreeTable from 'vue-table-with-tree-grid'

Vue.component('tree-table', TreeTable)
Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.use(ElementUI)

//创建过滤器将秒数过滤为年月日，时分秒
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
