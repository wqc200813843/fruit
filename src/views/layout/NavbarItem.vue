<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">

      <router-link :key="item.path" v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <span>{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu :key="item.name" :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>

          <sidebar-item :key="child.path" class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>

          <router-link :key="child.path" v-else :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <span>{{child.name}}</span>
            </el-menu-item>
          </router-link>

        </template>

      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'NavbarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

