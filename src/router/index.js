import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from '@/router/routers'

Vue.use(VueRouter)
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes,
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

//   获取Token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('./login')
  }
  next()
})
export default router
