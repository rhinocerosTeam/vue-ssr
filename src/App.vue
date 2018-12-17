<template>
  <div id="app">
    <div>
      <router-link :to='{path:"/home"}'>首页</router-link>
      <router-link :to='{path:"/about"}'>关于</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import libs from './libs/'

export default {
  name: 'app',
  components: {
  },
  mounted(){
        console.log("这是loibs",  libs.add());
  }
}
</script>
<style lang="less" scoped>
  #app{
    color: red;
  }
</style>



