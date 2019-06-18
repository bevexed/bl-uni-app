import {
  ADD_CART,
  GET_CART_ALL,
  DELETE_CART,
  DELETE_INVALID
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
      num: 0, // 购买数量，
      tagsList: ['标样'],
      tagCurrentSelect: []
    };

    state.goods = data.map(item => {
      return { ...item, ...base }
    });
  }
};
