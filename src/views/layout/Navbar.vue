<template>
  <el-menu :default-active="$route.path" mode="horizontal" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b">
    <navbar-item :routes='permission_routers'></navbar-item>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import NavbarItem from './NavbarItem'
export default {
  name: 'navbar',
  components: { NavbarItem },
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  }
}
</script>
<style scoped>
/* .navbar-container {
    position: fixed;
    width: 100%;
    height: 50px;
} */
</style>

