import {
  GET_INVOICE_LIST
} from '../mutation-types';

export default {
    [GET_INVOICE_LIST](state, { data }) {
      console.log(data);
      state.invoiceList = data;
    },
};
