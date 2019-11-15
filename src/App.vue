<template>
  <div id="app">
    <tebs v-show="$route.name == 'home' || $route.name == 'information'"></tebs>
    <!-- 阻止页面重载 -->
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import tebs from "@/components/tabber/tabber";
export default {
  name: "App",
  components: {
    tebs
  }
};
</script>

<style  src='../src/assets/css/reset.css'>

</style>
<style scoped>
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
