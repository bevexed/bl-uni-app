import {
  GET_REFRESH_TOKEN,
  GET_CURRENT_USER_DETAIL,
  GET_VERIFY,
  LOGIN, GET_CODE, LOGIN_OUT
} from '../mutation-types';

export default {
  [GET_VERIFY](state, { phone }) {
    state.phone = phone
    },

  [LOGIN](state, data) {
    state.userInfo = data;
  },

  [GET_CURRENT_USER_DETAIL](state, data) {
    state.userInfo = data;
  },

  [GET_REFRESH_TOKEN](state, data) {
    state.userInfo = data;
  },

  [GET_CODE](state, code) {
    state.code = code;
  },

  [LOGIN_OUT](state, data) {
    state.userInfo = data;
    state.phone = '';
    state.code = '';
  }
};
