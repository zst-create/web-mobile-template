<!--
 * @Author: wgj
 * @Date: 2021-03-22 10:26:34
 * @LastEditTime: 2021-03-22 20:07:42
 * @LastEditors: wgj
 * @Description: 
-->
<template>
  <div class="about">
    <h1 class="test_class">This is an about page</h1>
    <van-button type="primary">主要按钮</van-button>
    <svg-icon class="ware-detail-title" icon-class="icon-xls" />
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
<style lang="scss" scoped>
h1 {
  background: $background-color;
}
</style>