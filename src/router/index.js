import Vue from 'vue'
import Router from 'vue-router'
/* layout */
import Layout from '../views/layout/layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }
]

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/person',
    component: Layout,
    redirect: '/person/index',
    noDropdown: true,
    name: '人员管理',
    children: [
      {
        path: 'index', component: _import('person/index'), name: '人员管理'
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    redirect: '/task/index',
    noDropdown: true,
    name: '任务管理',
    children: [
      {
        path: 'index', component: _import('task/index'), name: '任务管理'
      }
    ]
  }
]
