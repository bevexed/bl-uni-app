import {
  GET_ORDER_LIST,
  CREATE_ORDER,
  GET_ORDER_DETAIL, GET_SHIP_COST
} from '../mutation-types';

import {
  reqOrderList,
  reqCreateOrder,
  reqCancelOrder,
  reqConfirmReceipt,
  reqRemindOrder,
  reqOrderDetail,
  reqPayOrder, reqShipCost
} from "../../api/order";
import { MSG_TO, SMG } from "../../static/unit";
import { reqDetele } from "../../api/cart";

export const getOrderList = async ({ commit, state }, data) => {
  const { page, pages, currentStatus } = state;
  const { status } = data;

  if (data.page === 1) {
    state.orderList = [];
  }

  // if (pages < page && status === currentStatus) return;
  let res = await reqOrderList(data);
  if (res.code === 200) {
    commit(GET_ORDER_LIST, { ...res, status });
  }
};


export const createOrder = async ({ commit }, data) => {
  let res = await reqCreateOrder(data);
  if (res.code === 200) {
    let item = JSON.parse(data.item);
    let result = await reqDetele(item.map(pro => pro.productId));
    if (result.code !== 200) {
      SMG(res.msg);
      return
    }
    uni.redirectTo({
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
          uni.redirectTo({
            url: '/pages/order/order'
          })
        },
        fail: function (err) {
          console.log('fail:' + JSON.stringify(err));
        }
      });
      return
    }

    uni.showToast({
      title: '支付成功',
      mask: true,
      success() {
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/order/order'
          })
        }, 2000)
      }
    })
  }
};

export const getShipCost = async ({ commit }, data) => {
  let res = await reqShipCost(data);
  if (res.code === 200) {
    commit(GET_SHIP_COST, res.data)
  }
};
