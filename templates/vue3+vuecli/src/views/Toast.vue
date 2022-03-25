<template>
  <div class="">
    <button class="btn" @click="open1('center')">普通使用</button><br />
    <button class="btn" @click="open1('top')">顶部</button><br />
    <button class="btn" @click="open1('bottom')">底部</button><br />
    <button class="btn" @click="open2()">5秒后关闭允许html</button><br />
    <button class="btn" @click="open3()">成功提示</button><br />
    <button class="btn" @click="open4()">loading</button><br />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Toast } from "lanli-ui";

export default class Home extends Vue {
  open1(type: any) {
    Toast({ position: type, message: "你的校验不通过哦", width: 300 });
  }
  open2() {
    Toast({
      message: "<span style='color:orange'>你的校验不通过哦</span>",
      allowHtml: true,
      duration: 5000,
      shade: false,
      width: 300,
    });
  }
  open3() {
    Toast({
      type: "success",
      message: "执行成功！",
      duration: 5000,
      width: 300,
    });
  }
  open4() {
    var i = Toast({
      type: "loading",
      message: "数据正在加载中,3秒后关闭",
      width: 300,
    });

    setTimeout(() => {
      Toast.close(i);
    }, 3000);
  }
}
</script>
<style scoped>
.btn {
  background-color: #2dc3e8;
  color: #fff;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  margin: 0 10px 10px 0;
}
</style>