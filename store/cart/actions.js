import {
  ADD_CART
} from '../mutation-types';

import {
  reqAddCart
} from "../../api/cart";

export const addCart = async ({ commit }, data) => {
  let res = await reqAddCart(data);
  if (res.code === 200) {
    uni.showToast({
      mask:true,
      title:'已加入购物车'
    })
  }
  commit(ADD_CART, { data });
};
