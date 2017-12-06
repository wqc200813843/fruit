<template>
	<el-container class="app-wrapper">
		<el-header>
      <navbar></navbar>
    </el-header>
		<el-main>
      <app-main></app-main>
    </el-main>
	</el-container>
</template>

<script>
import { Navbar, AppMain } from './index'

export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain
  }
}
</script>
<style scoped>
.app-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}
.el-header {
  background-color:#545c64
}
.el-main {
  padding: 0 ;
  position: relative;
  background-attachment: fixed;
}
</style>
