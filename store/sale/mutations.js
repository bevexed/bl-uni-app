import {
  GET_AFTER_SALE_LIST
} from '../mutation-types';

export default {
  [GET_AFTER_SALE_LIST](state, { data }) {
    state.afterSaleList = data.records
  }
};
