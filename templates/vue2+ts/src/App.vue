<template>
  <div id="app" :style="{minHeight:minHeight}">
    <HeaderComponent/>
    <!-- <HeaderComponent :setOtherBusiness="setOtherBusiness" /> -->
    <ContactComponent :openSdk="openSdk"/>
    <!-- <router-view/> -->
    <keep-alive :include="cached"  v-if="!requestError">
      <router-view/>
    </keep-alive>
    
    <!--如果接口报错(请求超时,服务期错误等严重的错误时才显示下面这个页面),则页面显示请求出错界面-->
    <RequestErrorComponent v-if="requestError"/>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HeaderComponent from '@/components/header.vue';
import ContactComponent from '@/components/contact.vue';
import RequestErrorComponent from '@/components/request-error.vue';
import { HotelStoreModule } from '@/store/modules/hotel';
import { HeaderStoreModule } from '@/store/modules/header';
import { ReponseResult } from '@/domain/Request';
import { ViolationsStoreReset } from './store/modules/violations';
import { FillOrderStoreModule, FillOrderStoreReset } from './store/modules/fill-order';
import { HomeGetUserBasicInfo } from './services/interfaces';
import { storage } from './utils/storage.time';
import { pageCache } from './utils/storage.cache';


 /**
 * warn: 刷新页面重置fillorder，fillorder.ts负责页面交互，显示的信息，页面刷新恢复到初始设置的数据
 * 
 * header 不需要重置，因为hotel在header.vue里面，每次刷新都会请求header里面的数据，更新header
 * hotel 不需要重置 里面在首页存储一些接口信息，用于全局使用。不存在后面覆盖
*/

@Component({
  components: { HeaderComponent, ContactComponent, RequestErrorComponent }
})
export default class App extends Vue {
  private isSdkReady = false;
  private HotelStoreModule = HotelStoreModule;
  private minHeight = 'auto';

  get cached() {
    return HotelStoreModule.cached;
  }

  get requestError() {
    return HotelStoreModule.RequestErrorInfo.error;
  }

  // get setOtherBusiness() {
  //   return HeaderStoreModule.setOtherBusiness;
  // }

  created() {
    this.minHeight = window.innerHeight + 'px';
    this.qiyuInit();
    this.onready(); 
    // ViolationsStoreReset(); // 重置Violations,注册到store中，放到 this.$store.replaceState(...)前面执行，确保不会负载session里面的数据
    
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      FillOrderStoreReset(); // 刷新页面，重置fillorder
      sessionStorage.clear()
      sessionStorage.setItem("stores", JSON.stringify(this.$store.state));
    })

    
    /**
     * 如果组件里面有调用store的话，刷新页面，会全部初始化sotre，覆盖了sessionStorage里面的值
     * 使用定时器 会导致数据提前请求完成后store赋值，然后store被sessionStorage重新赋值 为null；
     * 解决办法，在APP里面获取下每个模块的数据，初始就注册模块到sotre中。（即上面的初始化storereset方法）
    */
  // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("stores")) {
        // @ts-ignore
        this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("stores"))));
        // console.log(this.$store.state);
    }

    // TODO---如果使用请求报错跳转新页面的方式，下面的方法就要注释掉了
    // 刷新页面的话,重置setRequestErrorInfo,注意,要在sessionStorage后面,否则取的一直是之前的值
    HotelStoreModule.setRequestErrorInfo({error: false})

  }

  onready() {
    HomeGetUserBasicInfo().then((response: ReponseResult) => {
        const userData = response.Data;
        storage.set(storage.UserId, userData.UserId, storage.timeTerm); //设置用户userid
        pageCache.USERID = userData.UserId;
        
      // @ts-ignore: Unreachable code error
        window.ysf('onready',  () => {
            this.isSdkReady = true;
            // @ts-ignore: Unreachable code error
            window.ysf('config', {
                uid:userData.UserId,
                name:userData.UserName,
                mobile:userData.Mobile,
                //staffid:4090106, // 测试用的指定技术客服  前端客服4090106  技术支持4069381
                //groupid: 398331365, // 技术客服组
                groupid:398329208, // 住宿事业部客服组
                // robotShuntSwitch:1
            })
        })
    });
  }
  qiyuInit(){
      (function (w: any, d: any, n: any, a?: any, j?: any) {
          w[n] = w[n] || function (...arg: any) {
              (w[n].a = w[n].a || []).push(arg);
          };
          j = d.createElement('script');
          j.async = true;
          j.src ='https://qiyukf.com/script/c45c166d4a5f9eea1ecd26fc8d55c0a3.js&hidden=1';
          d.body.appendChild(j);
      })(window, document, 'ysf');
  }

  logoff() {
      // @ts-ignore: Unreachable code error
      window.ysf('logoff');
  }
  // 打开聊天面板
  openSdk() {
      if (this.isSdkReady) {
          // @ts-ignore: Unreachable code error
          window.ysf('open',{
              templateId:4480253
          });
          // window.location.href='https://fanjia.qiyukf.com/client?k=c45c166d4a5f9eea1ecd26fc8d55c0a3&wp=1&gid=398327326&robotShuntSwitch=1&robotId=3464785'
      } else {
          this.$layer.confirm('sdk尚未加载成功，请稍后再试');
      }
  }
}
</script>

<style lang="less">

</style>
