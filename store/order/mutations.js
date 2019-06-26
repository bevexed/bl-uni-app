import {
  GET_ORDER_LIST,
  GET_ORDER_DETAIL
} from '../mutation-types';

export default {
  [GET_ORDER_LIST](state, { data }) {
    if (data === null) {
      state.orderList = [];
      return
    }

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

  [GET_ORDER_DETAIL](state, { data }) {
    state.orderDetail = data;
  }
};
