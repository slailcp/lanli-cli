import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const $vm = new Vue();
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {path: '/', redirect: '/Query'},
  {
    path: '/Query',
    name: 'Query',
    meta: { keepAlive: false },
    component: () => import(/* webpackChunkName: "Query" */ '../views/query.vue'),
  },
  {
    path: '/OrderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "Query" */ '../views/order-list.vue'),
  },
  {
    path: '/HotelList',
    name: 'HotelList',
    component: () => import(/* webpackChunkName: "Query" */ '../views/hotel-list.vue'),
  },
  {
    path: '/HotelType',
    name: 'HotelType',
    component: () => import(/* webpackChunkName: "Query" */ '../views/hotel-type.vue'),
  },
  {
    path: '/HotelFillOrder',
    name: 'HotelFillOrder',
    component: () => import(/* webpackChunkName: "Query" */ '../views/hotel-fill-order.vue'),
  },
  {
    path: '/ApplicationListAfter',
    name: 'ApplicationListAfter',
    component: () => import(/* webpackChunkName: "Query" */ '../views/application/application-list-after.vue'),
  },
  {
    path: '/ApplicationListBefore',
    name: 'ApplicationListBefore',
    component: () => import(/* webpackChunkName: "Query" */ '../views/application/application-list-before.vue'),
  },
  {
    path: '/ApplicationCustomer',
    name: 'ApplicationCustomer',
    component: () => import(/* webpackChunkName: "Query" */ '../views/application/application-customer.vue'),
  },
  {
    path: '/HotelPay',
    name: 'HotelPay',
    component: () => import(/* webpackChunkName: "Query" */ '../views/hotel-pay.vue'),
  },
  {
    path: '/OrderDetail',
    name: 'OrderDetail',
    component: () => import(/* webpackChunkName: "Query" */ '../views/order-detail.vue'),
  },
  {
    path: '/PaySuccess',
    name: 'PaySuccess',
    component: () => import(/* webpackChunkName: "Query" */ '../views/pay-success.vue'),
  },
  {
    path: '/Error',
    name: 'Error',
    component: () => import(/* webpackChunkName: "Query" */ '../views/error.vue'),
  },
  {
    path: '/**',
    name: '404',
    component: () => import(/* webpackChunkName: "Query" */ '../views/404.vue'),
  }
];//

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


import { FillOrderStoreReset } from '@/store/modules/fill-order';
import { ViolationsStoreReset } from '@/store/modules/violations';
import { Cancel } from '@/services/api';
import { cacheFn } from './router.cache';

router.beforeEach((to, from, next) => {
  $vm.$layer.hide('all'); // 如果有路由跳转的话,则关闭掉所有的弹出层,包括,loading,comfirm,toast
  if(Cancel.length) {
        Cancel.forEach(e => {
          console.log(e.url);
          e && e.cancel('cancel-all');
        })
    } // 如果有路由跳转的话,取消所有请求;

  if(to.path === '/HotelType' && from.path !== '/HotelFillOrder' &&  from.path !== '/ApplicationListAfter'){
    ViolationsStoreReset();
  }

  if(from.path === '/HotelFillOrder') {
    FillOrderStoreReset();
  }

  cacheFn(to, from); // 添加页面缓存（不刷新）
  next()
})

export default router;
