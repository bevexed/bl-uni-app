import {
  ADD_CART,
  GET_CART_ALL,
  SELECT_PRODUCT,
  DELETE_CART,
  DELETE_INVALID
} from '../mutation-types';

import {
  reqAddCart,
  reqSelectAll,
  reqDetele,
  reqDeleteInvalid, reqPutCart
} from "../../api/cart";
import { SMG } from "../../static/unit";

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
  console.log(ids);
  let res = await reqDetele(ids.join(','));
  if (res.code === 200) {
    dispatch('getCartAll').then(
      result => {
        uni.showToast({
          title:'删除成功'
        })
      }
    )
  }
};

export const doDeleteInvalid = async ({ dispatch }) => {
  let res = await reqDeleteInvalid();
  if (res.code === 200) {
    dispatch('getCartAll').then(
      result => {
       uni.showToast({
         title:'已清空下架商品'
       })
      }
    )
  }
};

export const putCart = async ({ dispatch }, data) => {
  let res = await reqPutCart(data);
  if (res.code !== 200) {
    SMG('修改失败')
  }
};

export const selectProduct = ({ commit }, data) => {
  commit(SELECT_PRODUCT,data);
};
