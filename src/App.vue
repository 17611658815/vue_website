<template>
    <div id="app">
        <tebs v-show="$route.name == 'home' || $route.name == 'information'"></tebs>
        <!-- 阻止页面重载 -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    import tebs from '@/components/tabber/tabber'
    export default {
      name: 'App',
      components:{
          tebs
      }
    }
</script>

<style  src='../src/assets/css/reset.css'>

</style>
