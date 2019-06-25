import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_SIMILAR
} from '../mutation-types';

import {
  reqProducts,
  reqCategories,
  reqProduct,
  reqSimilar
} from "../../api/products";

export const getProducts = async ({ commit, state }, data) => {
  // 如果此用户不是会员
  const { status, reset } = data;
  if (status !== 2 && state.page === 2) {
    return
  }

  // 翻页
  // let { page, total } = state;
  // if (Math.ceil(total / 10) < page && !reset) {
  //   return
  // }

  let res = await reqProducts(data);
  if (res.code === 200) {
    commit(GET_PRODUCTS, { data: res.data, reset });

    return true;
  }
};

export const getCategories = async ({ commit }) => {
  let res = await reqCategories();
  if (res.code === 200) {
      commit(GET_CATEGORIES,res.data)
  }
};

export const getProduct = async ({ commit }, id) => {
  let res = await reqProduct(id);
  if (res.code === 200) {
    commit(GET_PRODUCT, res.data)
  }
};

export const getSimilar = async ({ commit }, id) => {
  let res = await reqSimilar(id);
  if (res.code === 200){
    commit(GET_SIMILAR,res.data)
  }
};
