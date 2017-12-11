<template>
    <div class="app-main">
        <transition name="fade" mode="out-in">
            <router-view class="container" :key="key"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        key () {
            return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
        }
    }
}
</script>
<style scoped>
.app-main {
    min-width: 1250px;
    width: 80%;
    margin: 0 auto;
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 10px;
    right: 0;
}
</style>
