<!--
 * @Author: wgj
 * @Date: 2021-03-25 17:34:08
 * @LastEditTime: 2021-04-25 10:47:24
 * @LastEditors: wgj
 * @Description: 
-->
<!--  -->
<template>
  <van-tabbar route>
    <van-tabbar-item replace to="/" icon="home-o">
      <span>首页</span>
      <template #icon="props">
        <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
        <span> <svg-icon :icon-class="props.active ? 'icon-menu-home-select' : 'icon-menu-home'" /></span>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/about" icon="search">
      <span>我的</span>
      <template #icon="props">
        <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
        <span> <svg-icon :icon-class="props.active ? 'icon-menu-mine-select' : 'icon-menu-mine'" /></span>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'footerMenu',
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang='less' scoped>
.icon-menu {
  color: #666666;
}
.icon-menu-active {
  color: #5981f9;
}
</style>