import {
  GET_ORDER_LIST
} from '../mutation-types';

export default {
  [GET_ORDER_LIST](state, { data }) {
    const { records, size, total, pages, current, status } = data;
    state.size = size;
    state.total = total;
    state.pages = pages;
    state.page = current;
    state.status = status;
    if (current === 1) {
      state.orderList = records;
      return
    }
    state.orderList = [...state.orderList, ...records];

    },
};
