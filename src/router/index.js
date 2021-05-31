import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import NotFound from '../components/NotFound.vue'
import Users from '@/components/user/users.vue'
import Rights from '@/components/power/Rights.vue'
import Roles from '@/components/power/Roles.vue'
import Categories from '@/components/goods/Categories.vue'
import Params from '@/components/goods/Params.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {path: '/welcome', component: Welcome},
      {path: '/users', component: Users},
      {path: '/rights', component: Rights},
      {path: '/roles', component: Roles},
      {path: '/categories', component: Categories},
      {path: '/params', component: Params},
    ]
  },
  // 404页面
  {name: '404', path: '/404', component: NotFound},
  {path: '*', redirect: '/404'}
]

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
