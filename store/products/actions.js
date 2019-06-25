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
  console.log(data);
  // if (data.status !== 2 && state.page === 2) {
  //   return
  // }
  //
  // let { page, total } = state;
  // if (Math.ceil(total / 10) < page) {
  //   return
  // }
  let res = await reqProducts(data);
  if (res.code === 200) {
    commit(GET_PRODUCTS, res.data);
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
  let res =await reqSimilar(id)
  if (res.code === 200){
    commit(GET_SIMILAR,res.data)
  }
};
