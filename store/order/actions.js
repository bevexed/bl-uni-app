import {
  GET_ORDER_LIST,
  CREATE_ORDER
} from '../mutation-types';
import {
  reqOrderList,
  reqCreateOrder
} from "../../api/order";

export const getOrderList = async ({ commit }, data) => {
  let res = await reqOrderList(data);
  if (res.code === 200) {
    commit(GET_ORDER_LIST, res);
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
