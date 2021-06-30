<!--
 * @Author: wgj
 * @Date: 2021-03-22 19:40:55
 * @LastEditTime: 2021-06-10 10:24:31
 * @LastEditors: wgj
 * @Description: 
-->
<!--
 * @Author: wgj
 * @Date: 2021-03-22 19:40:55
 * @LastEditTime: 2021-03-24 09:39:48
 * @LastEditors: wgj
 * @Description: 
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <footer-menu v-if="showMenu" />
    <transition name="fade">
      <loading v-if="this.$store.getters.getIsLoading"></loading>
    </transition>
    <transition :mode="mode" :name="transitionName">
      <router-view class="center"></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import footerMenu from '@/components/footerMenu.vue';
import Loading from '@/components/loading';
export default {
  name: 'app',
  components: {
    footerMenu,
    Loading,
  },
  data() {
    return {
      loading: true,
      mode: '',
      transitionName: 'slide-left', //默认动画
    };
  },
  computed: {
    showMenu() {
      return this.$route.meta.showMenu;
    },
  },
  watch: {
    $route(to, from) {
      //页面切换动画
      console.log(to);
      let toName = to.name;
      const toIndex = to.meta.index;
      const fromIndex = from.meta.index;
      if (toIndex == undefined) {
        this.mode = 'out-in';
        this.transitionName = '';
      } else {
        this.mode = '';
        this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left';
      }
    },
  },
  mounted() {
    this.loading = false;
    console.log('showMenu', this.showMenu, this.$store.getters.getIsLoading);
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
