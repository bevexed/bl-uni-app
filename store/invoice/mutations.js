import {
  GET_INVOICE_APPLY_REQUEST,
  GET_INVOICE_DETAIL,
  GET_INVOICE_LIST
} from '../mutation-types';

export default {
  [GET_INVOICE_LIST](state, { data }) {
    state.invoiceList = data;
  },

  [GET_INVOICE_DETAIL](state, { data }) {
    state.invoiceDetail = data
  },

  [GET_INVOICE_APPLY_REQUEST](state, data) {
    state.invoiceApplyRequest = { ...state.invoiceApplyRequest, ...data }
  }
};
