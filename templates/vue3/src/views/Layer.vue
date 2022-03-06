<template>
  <div class="">
    <button class="btn" @click="open1('center')">普通使用</button><br />
    <button class="btn" @click="open2()">按钮阻止关闭</button><br />
    <button class="btn" @click="open3()">按钮异步</button><br />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Layer } from "lanli-ui";

export default class Home extends Vue {
  open1() {
    Layer({ message: "你好",width:300 });
  }
  open2() {
    Layer.confirm({
      title: "警告!!!",
      message: "<span style='color:orange'>真的要删除吗?</span>",
      className: "app-home-confirm",
      allowHtml: true,
      lockScroll: true,
      width:300,
      beforeClose: (action) => {
        if (action === "confirm") {
          return false;
        } // 点击确认按钮的时候,阻止弹出层关闭
      },
      cancelButtonText: "取消",
      confirmButtonText: "点错了啊",
    })
      .then((ret) => {
        console.log(ret); // 点击确定按钮
      })
      .catch((ret) => {
        console.log(ret); // 点击取消按钮
      });
  }
  open3() {
    Layer.confirm({
      message: "真的要删除吗?",
      width:300,
      beforeClose: (action) => {
        // 返回Promise
        return new Promise((resolve) => {
          setTimeout(() => {
            if (action === "confirm") {
              resolve(true);
            } else {
              resolve(false);
            }
          }, 1000);
        });
      },
    });
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
