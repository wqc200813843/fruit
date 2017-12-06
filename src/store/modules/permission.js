import { asyncRouterMap, constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap, // 可访问路由
    addRouters: [] // 除初始已有路由，后加入的路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    SetRoutes ({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', asyncRouterMap)
        resolve()
      })
    }
  }
}

export default permission
