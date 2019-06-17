import {
  GET_CATEGORIES,
  GET_PRODUCTS
} from '../mutation-types';

export default {
  [GET_PRODUCTS](state, data) {
    state.productList = [...state.productList, ...data.data];
    state.total = data.total;
    state.page = ++state.page;
    },
  [GET_CATEGORIES](state, data) {
    state.categories = data;
  }
};
