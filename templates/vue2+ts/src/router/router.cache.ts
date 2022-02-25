/**
 * 页面缓存
 */
import { HotelStoreModule } from '@/store/modules/hotel';

/**
 * 酒店列表->房型列表(刷新)   
 * 房型列表->酒店列表(不刷新)   
 * 房型列表->后置申请单/订单填下(刷新) 
 * 后置申请单/订单填下 -> 房型列表(不刷新) 
 * 后置申请单 <=> 订单填下(刷新) 
 */
export const HotelListTypeCache = (to: any, from: any) => {
  if(
    (from.path === '/HotelType' && (to.path === '/HotelFillOrder' || to.path === '/ApplicationListAfter')) || 
    ((from.path === '/HotelFillOrder' || from.path === '/ApplicationListAfter') && to.path === '/HotelType') ||
    (from.path === '/HotelFillOrder' && to.path === '/ApplicationListAfter') || 
    (from.path === '/ApplicationListAfter' && to.path === '/HotelFillOrder')
  ) { // 缓存酒店列和表房型列表页面
    return ['HotelList','HotelType']
  }else if(
    (from.path === '/HotelList' && to.path === '/HotelType') || 
    (from.path === '/HotelType' && to.path === '/HotelList')
  ){ // 缓存酒店列表页面
    return ['HotelList'];
  }
  return null;
}

/**
 * 订单列表->订单详情(刷新)
 * 订单详情->订单列表(不刷新)  
 */
export const OrderListCache = (to: any, from: any) => { 
  if(
    (from.path === '/OrderDetail' && to.path === '/OrderList') || 
    (from.path === '/OrderList' && to.path === '/OrderDetail')
  ) { // 订单列表缓存起来
    return ['OrderList'];
  }
  return null;
}

/**
 * 首页 ->前置申请单(刷新)  
 * 前置申请单->首页(不刷新)  
 * 前置申请单 -> 申请单入住人(刷新)
 * 申请单入住人 -> 前置申请单(不刷新)
 * 申请单入住人 -> 首页(不刷新)
 */
export const QueryBeforeCache = (to: any, from: any) => {
  if(
    from.path === '/Query' && to.path === '/ApplicationListBefore' || 
    from.path === '/ApplicationListBefore' && to.path === '/Query'
  ){ // 首页到前置申请单页面
    return ['Query'];
  }else if(
    from.path === '/ApplicationListBefore' && to.path === '/ApplicationCustomer' || 
    from.path === '/ApplicationCustomer' && to.path === '/ApplicationListBefore'
  ){ // 前置申请单到申请单选择人的页面
    return ['Query','ApplicationListBefore'];
  }else if(from.path === '/ApplicationCustomer' && to.path === '/Query'){ // 申请单选择人页面到首页
    return ['Query'];
  }else if(
    from.path === '/Query' && to.path === '/ApplicationCustomer' || 
    from.path === '/ApplicationCustomer' && to.path === '/Query'
  ){ // 首页到申请单选择人的页面
    return ['Query'];
  }
  return null;
}


export const cacheFn = (to: any, from: any) => {
  const hotelListTYpeCache = HotelListTypeCache(to, from);
  if(hotelListTYpeCache) {
    HotelStoreModule.CACHED(hotelListTYpeCache);
    return
  }

  const OrderList = OrderListCache(to, from);
  if(OrderList) {
    HotelStoreModule.CACHED(OrderList);
    return
  }

  const Query = QueryBeforeCache(to, from);
  if(Query) {
    HotelStoreModule.CACHED(Query);
    return
  }

  HotelStoreModule.CACHED([]);
}
