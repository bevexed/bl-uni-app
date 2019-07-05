import {
  GET_REFRESH_TOKEN,
  GET_CURRENT_USER_DETAIL,
  GET_VERIFY,
  LOGIN, GET_CODE, LOGIN_OUT, IS_EXIST, GET_FUNCTION_SETTING,
} from '../mutation-types';

export default {
  [GET_VERIFY](state, { phone }) {
    state.phone = phone
    },

  [LOGIN](state, data) {
    state.userInfo = data;
    state.isAfterSaleOpen = data.isAfterSaleOpen
  },

  [GET_CURRENT_USER_DETAIL](state, data) {
    state.userInfo = data;
  },

  [GET_REFRESH_TOKEN](state, data) {
    state.userInfo = data.userInfo;
    state.isAfterSaleOpen = data.systemInfo.isAfterSaleOpen
  },

  [GET_CODE](state, code) {
    state.code = code;
  },

  [LOGIN_OUT](state, data) {
    state.userInfo = {};
    state.phone = '';
    state.code = '';
  },

  [IS_EXIST](state, data) {
    state.exist = data
  },

  [GET_FUNCTION_SETTING](state, { data }) {
    state.setting = data
  }
};
