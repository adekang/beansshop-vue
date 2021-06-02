import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
// import Users from '@/components/user/users.vue'
// import Rights from '@/components/power/Rights.vue'
// import Roles from '@/components/power/Roles.vue'
// import Categories from '@/components/goods/Categories.vue'
// import Params from '@/components/goods/Params.vue'
// import List from '@/components/goods/List.vue'
// import Add from '@/components/goods/Add.vue'
// import Order from '@/components/order/Order.vue'
// import Report from '@/components/report/Report.vue'

const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/Login.vue')
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/Home.vue')
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/Welcome.vue')
const NotFound = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/NotFound.vue')
const Users = () => import(/* webpackChunkName:"user" */ '@/components/user/users.vue')
const Rights = () => import(/* webpackChunkName:"power" */ '@/components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName:"power" */ '@/components/power/Roles.vue')
const Categories = () => import(/* webpackChunkName:"goods" */ '@/components/goods/Categories.vue')
const Params = () => import(/* webpackChunkName:"goods" */ '@/components/goods/Params.vue')
const List = () => import(/* webpackChunkName:"goods" */ '@/components/goods/List.vue')
const Add = () => import(/* webpackChunkName:"goods" */ '@/components/goods/Add.vue')
const Order = () => import(/* webpackChunkName:"order" */ '@/components/order/Order.vue')
const Report = () => import(/* webpackChunkName:"report" */ '@/components/report/Report.vue')

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
      {path: '/goods', component: List},
      {path: '/goods/add', component: Add},
      {path: '/orders', component: Order},
      {path: '/reports', component: Report}
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
