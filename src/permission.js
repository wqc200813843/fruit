import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  if (store.getters.addRouters.length === 0) {
    store.dispatch('SetRoutes').then(() => { // 生成可访问的路由
      router.addRoutes(store.getters.addRouters) // 动态添加路由
      next({...to}) // 重新跳转router，重新进入beforeEach方法，确保addRoutes已经成功
    })
  } else {
    next()
  }
})
