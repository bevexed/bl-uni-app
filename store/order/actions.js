import {
  GET_ORDER_LIST,
  CREATE_ORDER
} from '../mutation-types';
import {
  reqOrderList,
  reqCreateOrder,
  reqCancelOrder, reqConfirmReceipt, reqRemindOrder
} from "../../api/order";
import { MSG_TO } from "../../static/unit";

export const getOrderList = async ({ commit, state }, data) => {
  const { page, pages, currentStatus } = state;
  const { status } = data;
  // fixMe : 翻页拦截
  // if (pages < page && status === currentStatus) return;
  let res = await reqOrderList(data);
  if (res.code === 200) {
    commit(GET_ORDER_LIST, { ...res, status });
  }
};


export const createOrder = async ({ commit }, data) => {
  let res = await reqCreateOrder(data);
  if (res.code === 200) {
    uni.navigateTo({
      url: '/pages/pay/pay'
    });
  }
};

export const cancelOrder = async ({ dispatch }, data) => {
  let res = await reqCancelOrder(data);
  if (res.code === 200) {
    MSG_TO({
      title: '订单取消成功',
      url: '/pages/order/order',
    })
  }
};

export const confirmReceipt = async ({ dispatch }, data) => {
  let res = await reqConfirmReceipt(data);
  if (res.code === 200) {
   uni.showToast({
     title:'收货成功'
   })
  }
};

export const remindOrder = async ({ dispatch }, data) => {
  let res = await reqRemindOrder(data);
  if (res.code === 200) {
    uni.showToast({
      title: '催单成功'
    })
  }
};
