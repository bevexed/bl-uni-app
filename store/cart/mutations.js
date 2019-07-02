import {
  ADD_CART,
  GET_CART_ALL,
  SELECT_PRODUCT,
  DELETE_CART,
  DELETE_INVALID, PUT_CART
} from '../mutation-types';

export default {
  [ADD_CART](state, { data }) {
    state.data = data;
  },

  [GET_CART_ALL](state, data) {

    let base = {
      willBuy: false, // 是否要买
      willDel: false, // 是否要删
      willChange: false, // 是否改变 当前商品数量 小样数量
      tagsList: ['标样'],
      tagCurrentSelect: []
    };

    state.goods = data
      .map(item => ({ ...item, ...base }))
      .filter(item => item.status !== 9);

    state.u_goods = data
      .map(item => ({ ...item, ...base }))
      .filter(item => item.status === 9);
  },

  [SELECT_PRODUCT](state, data) {
    state.item = data;
  }
};
