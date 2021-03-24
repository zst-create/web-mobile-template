<!--
 * @Author: wgj
 * @Date: 2021-03-22 10:26:34
 * @LastEditTime: 2021-03-24 13:40:40
 * @LastEditors: wgj
 * @Description: 
-->
<template>
  <div class="about">
    <h1 class="test_class">This is an about page</h1>
    <van-button type="primary">主要按钮</van-button>
    <van-button disabled type="primary">禁用状态</van-button>
    <svg-icon icon-class="icon-xls" />
    <van-sidebar>
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
    </van-sidebar>
  </div>
</template>
<script>
import { getSchoolClass } from '@/api';
export default {
  methods: {
    // 查询班级筛选条件
    getBelongClassOptions(val) {
      let obj = {
        schoolId: 24,
      };
      let params = {
        requestJson: JSON.stringify(obj),
      };
      console.log(obj);
      getSchoolClass(params).then((r) => {
        if (r.totalNum > 0) {
          let arr = r.data[0].SchoolClassVo;
          console.log('arr', arr);
        }
      });
    },
  },
  mounted() {
    this.getBelongClassOptions();
    console.log('66');
  },
};
</script>
<style lang="less" scoped>
h1 {
  background: @common_blue;
}
</style>