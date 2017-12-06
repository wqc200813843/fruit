import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  if (store.getters.addRouters.length === 0) {
    store.dispatch('SetRoutes').then(() => {
      router.addRoutes(store.getters.addRouters)
      next()
    })
  } else {
    next()
  }
})
