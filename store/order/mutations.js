import {
  GET_ORDER_LIST
} from '../mutation-types';

export default {
  [GET_ORDER_LIST](state, { data }) {
    const { records, size, total, pages } = data;
    state.orderList = records;
    state.size = size;
    state.total = total;
    state.pages = pages;
    },
};
