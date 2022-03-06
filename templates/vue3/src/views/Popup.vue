<template>
  <div class="home">
    <button class="btn" @click="open1()">普通使用</button><br />
    <button class="btn" @click="open2('up')">顶部</button><br />
    <button class="btn" @click="open2('down')">底部</button><br />
    <button class="btn" @click="open2('left')">left</button><br />
    <button class="btn" @click="open2('right')">right</button><br />

    <lan-popup v-model:show="toggle1" style="width: 70%; height: 70%">
      <div><h4>你好</h4></div>
    </lan-popup>

    <lan-popup v-model:show="toggle2" position="up">
      <h4>你好</h4>
    </lan-popup>
    <lan-popup v-model:show="toggle3" position="down">
      <h4>你好</h4>
    </lan-popup>
    <lan-popup v-model:show="toggle4" position="left">
      <h4>你好</h4>
    </lan-popup>
    <lan-popup v-model:show="toggle5" position="right">
      <h4>你好</h4>
    </lan-popup>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Home extends Vue {
  toggle1 = false;
  toggle2 = false;
  toggle3 = false;
  toggle4 = false;
  toggle5 = false;
  open1() {
    this.toggle1 = true;
  }
  open2(type: string) {
    if (type === "up") {
      this.toggle2 = true;
    }
    if (type === "down") {
      this.toggle3 = true;
    }
    if (type === "left") {
      this.toggle4 = true;
    }
    if (type === "right") {
      this.toggle5 = true;
    }
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