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
  reqPayOrder,
  reqShipCost, reqDeleteOrder
} from "../../api/order";
import { getRoute, MSG_REDIRECT, MSG_TO, SHOW_MODAL, SMG } from "../../utils";
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
  const {addressId} = data;
  if (!addressId){
    return SMG('请选择收货地址')
  }

  let res = await reqCreateOrder(data);
  if (res.code === 200) {
    let item = JSON.parse(data.item);

    const route = getRoute(2);

    if (route !== 'pages/shop-detail/shop-detail') {
      let result = await reqDetele(item.map(pro => pro.productId));

      if (result.code !== 200) {
        SMG(res.msg);
        return
      }
    }
    uni.redirectTo({
      url: '/pages/pay/pay?orderNum=' + res.data + '&amount=' + data.amount
    });
  }
};

export const cancelOrder = async ({ dispatch }, data) => {
  const {reason} = data;
  if (reason === '') {
    return SMG('请选择退款原因')
  }
  let res = await reqCancelOrder(data);
  if (res.code === 200) {
    const route = getRoute(1);
    if (route === 'pages/order/order') {
      uni.showToast({
        title: "订单取消成功"
      });
      return
    }
    MSG_REDIRECT({
      title: '订单取消成功',
      url: '/pages/order/order',
    })
  }
};

export const confirmReceipt = async ({ dispatch }, data) => {
  SHOW_MODAL({
    title: '确认收货',
    content: '确定收到货物了吗？',
    async confirm() {
      let res = await reqConfirmReceipt(data.orderId);
      if (res.code === 200) {
        await dispatch('getOrderList', { status: data.status, page: 1, pageSize: 100 });
        uni.showToast({
          title: '收货成功'
        })
      }
    }
  })

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
          uni.redirectTo({
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

export const deleteOrder = async ({ dispatch }, data) => {
  SHOW_MODAL({
    title: '删除订单',
    content: '确认删除订单?',
    async confirm() {
      let res = await reqDeleteOrder(data.order);
      if (res.code === 200) {
        await dispatch('getOrderList', { status: data.status, page: 1, pageSize: 100 });
        uni.showToast({ title: '删除成功' })
      }
    }
  })
};
