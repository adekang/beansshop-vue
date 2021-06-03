// 登录
export const loginRouter = [
  {path: '/', redirect: '/login'},
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login.vue')
  }
]
// 管理分支路由
const Welcome = {
  path: '/welcome',
  meta: {
    title: '欢迎界面',
    keepAlive: true
  },
  name: 'Welcome',
  component: () => import('@/components/Welcome.vue')
}
const Users = {
  path: '/users',
  meta: {
    title: ' 用户列表',
    requiresAuth: true
  },
  name: 'Users',
  component: () => import('@/components/user/users.vue')
}
const Roles = {
  path: '/roles',
  meta: {
    title: '角色列表',
    requiresAuth: true
  },
  name: 'Roles',
  component: () => import('@/components/power/Roles.vue')
}
const Rights = {
  path: '/rights',
  meta: {
    title: '权限列表',
    requiresAuth: true
  },
  name: 'Rights',
  component: () => import('@/components/power/Rights.vue')
}
const Categories = {
  path: '/categories',
  meta: {
    title: '商品分类',
    requiresAuth: true
  },
  name: 'Categories',
  component: () => import('@/components/goods/Categories.vue')
}
const Params = {
  path: '/params',
  meta: {
    title: '商品分类',
    requiresAuth: true
  },
  name: 'Params',
  component: () => import('@/components/goods/Params.vue')
}
const List = {
  path: '/goods',
  meta: {
    title: '商品列表',
    requiresAuth: true
  },
  name: 'List',
  component: () => import('@/components/goods/List.vue')
}
const Add = {
  path: '/goods/add',
  meta: {
    title: '添加商品',
    requiresAuth: true
  },
  name: 'Add',
  component: () => import('@/components/goods/Add.vue')
}
const Order = {
  path: '/orders',
  meta: {
    title: '订单列表',
    requiresAuth: true
  },
  name: 'Order',
  component: () => import('@/components/order/Order.vue')
}
const Report = {
  path: '/reports',
  meta: {
    title: '数据报表',
    requiresAuth: true
  },
  name: 'Report',
  component: () => import('@/components/report/Report.vue')
}

// 管理主路由
const userManage = {
  path: '/user-manage',
  meta: {
    title: '用户管理',
    keepAlive: true
  },
  name: 'UserManage',
  component: () => import('@/components/user/UserManage'),
  children: [
    Users
  ]
}
const rightsManage = {
  path: '/rights-manage',
  meta: {
    title: '权限管理',
    keepAlive: true
  },
  name: 'RightsManage',
  component: () => import('@/components/power/RightsManage'),
  children: [
    Roles,
    Rights
  ]
}
const goodsManage = {
  path: '/goods-manage',
  meta: {
    title: '商品管理',
    keepAlive: true
  },
  name: 'GoodsManage',
  component: () => import('@/components/goods/GoodsManage'),
  children: [
    Categories,
    Params,
    List,
    Add
  ]
}
const ordersManage = {
  path: '/orders-manage',
  meta: {
    title: '订单管理',
    keepAlive: true
  },
  name: 'OrdersManage',
  component: () => import('@/components/order/OrdersManage'),
  children: [Order]
}
const reportManage = {
  path: '/report-manage',
  meta: {
    title: '数据统计',
    keepAlive: true
  },
  name: 'ReportManage',
  component: () => import('@/components/report/ReportManage'),
  children: [Report]
}

// 主路由
export const appRouter = [
  {
    path: '/home',
    redirect: '/welcome',
    name: 'Home',
    component: () => import('@/components/Home'),
    children: [
      Welcome,
      userManage,
      rightsManage,
      goodsManage,
      ordersManage,
      reportManage
    ]
  },
  {name: '404', path: '/404', component: () => import('@/components/NotFound')},
  {path: '*', redirect: '/404'}
]

export const routes = [...loginRouter, ...appRouter]