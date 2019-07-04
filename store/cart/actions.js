import {
  ADD_CART,
  GET_CART_ALL,
  SELECT_PRODUCT,
  DELETE_CART,
  DELETE_INVALID, PUT_CART
} from '../mutation-types';

import {
  reqAddCart,
  reqSelectAll,
  reqDetele,
  reqDeleteInvalid,
  reqPutCart
} from "../../api/cart";
import { SHOW_MODAL, SMG } from "../../utils";

export const addCart = async ({ commit }, data) => {
  let res = await reqAddCart(data);
  if (res.code === 200) {
    uni.showToast({
      mask:true,
      title:'已加入购物车'
    });
    commit(ADD_CART, { data });
    return true;
  }
};

export const getCartAll = async ({ commit }) => {
  let res = await reqSelectAll();
  if (res.code === 200) {
    commit(GET_CART_ALL, res.data)
  }
};

export const doDeleteCart = async ({ dispatch }, { ids }) => {
  SHOW_MODAL({
    title: '删除商品',
    content: '确认删除商品？',
    async confirm() {
      let res = await reqDetele(ids.join(','));
      if (res.code === 200) {
        await dispatch('getCartAll');
        uni.showToast({ title: '删除成功' })
      }
    },
    cancel() {

    }
  });

};

export const doDeleteInvalid = async ({ dispatch }) => {
  SHOW_MODAL({
    title: '清除下架',
    content: '是否一键清除下架商品？',
    // confirmColor: '#f00',
    async confirm() {
      let res = await reqDeleteInvalid();
      if (res.code === 200) {
        await dispatch('getCartAll');
        uni.showToast({
          title: '已清空下架商品'
        })
      }
    },
    cancel() {

    }
  });
};

export const putCart = async ({ commit }, data) => {
  const { sampleType, shoppingNum } = data;
  if (!sampleType && !shoppingNum) {
    return SMG('商品和小样不能同同时为空');
  }
  let res = await reqPutCart(data);
  if (res.code !== 200) {
    return SMG('修改失败')
  }
};

export const selectProduct = ({ commit }, data) => {
  commit(SELECT_PRODUCT,data);
};
