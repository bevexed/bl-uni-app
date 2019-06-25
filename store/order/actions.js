import {
  GET_ORDER_LIST,
  CREATE_ORDER,
  GET_ORDER_DETAIL
} from '../mutation-types';

import {
  reqOrderList,
  reqCreateOrder,
  reqCancelOrder,
  reqConfirmReceipt,
  reqRemindOrder,
  reqOrderDetail,
  reqPayOrder
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
      url: '/pages/pay/pay?orderNum=' + res.data + '&amount=' + data.amount
    });
  }
};

export const cancelOrder = async ({ dispatch }, data) => {
  let { reasonText } = data;
  let res = await reqCancelOrder(data);
  if (res.code === 200) {
    if (!reasonText) {
      uni.showToast({
        title: "订单取消成功"
      });
      return
    }

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

export const getOrderDetail = async ({ commit }, data) => {
  let res = await reqOrderDetail(data);
  if (res.code === 200) {
    commit(GET_ORDER_DETAIL, res)
  }
};

export const payOrder = async ({dispatch}, data) => {
  const { code } = data;

  let res = await reqPayOrder(data);

  if (res.code === 200) {
    // code存在说明是微信支付
    if (code) {
      const { timestamp, sign, prepayId, nonceStr } = res.data;
      uni.requestPayment({
        provider: 'wxpay',
        timeStamp: timestamp,
        nonceStr,
        package: prepayId,
        signType: 'HMAC-SHA256',
        paySign: sign,
        success: function (res) {
          console.log('success:' + JSON.stringify(res));
        },
        fail: function (err) {
          console.log('fail:' + JSON.stringify(err));
        }
      });
      return
    }

    uni.showToast({
      title: '支付成功',
      mask: true
    })
  }
};
