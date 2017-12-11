<template>
    <img v-loading.lock="loading" :src="url">
</template>
<script>
export default {
    props: ['src'], // 父组件传过来所需的url
    data () {
        return {
            url: '', // 先加载loading.gif
            loading: true
        }
    },
    mounted () {
        var newImg = new Image()
        newImg.src = this.src
        newImg.onerror = () => {    // 图片加载错误时的替换图片
            newImg.src = '/src/assets/img/pictureError.png'
            this.loading = false
        }
        newImg.onload = () => { // 图片加载成功后把地址给原来的img
            this.url = newImg.src
            this.loading = false
        }
    }
}
</script>
