import {
  GET_INVOICE_DETAIL,
  GET_INVOICE_LIST
} from '../mutation-types';

export default {
  [GET_INVOICE_LIST](state, { data }) {
    state.invoiceList = data;
  },

  [GET_INVOICE_DETAIL](state, { data }) {
    state.invoiceDetail = data
  }
};
