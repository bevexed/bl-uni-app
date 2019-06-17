import { GET_PRODUCTS } from '../mutation-types';

export default {
  [GET_PRODUCTS](state, data) {
    state.productList = [...state.productList, ...data.data];
    state.total = data.total;
    state.page = ++state.page;
    },
};
