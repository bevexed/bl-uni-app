import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCT, GET_SIMILAR
} from '../mutation-types';

export default {
  [GET_PRODUCTS](state, data) {
    state.productList = [...state.productList, ...data.data];
    state.total = data.total;
    state.page = ++state.page;
    },
  [GET_CATEGORIES](state, data) {
    state.categories = data;
  },
  [GET_PRODUCT](state,data){
    state.product = data
  },
  [GET_SIMILAR](state,data){
    state.similar = data
  }
};
