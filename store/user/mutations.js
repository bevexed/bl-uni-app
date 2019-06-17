import {
  GET_REFRESH_TOKEN,
  GET_CURRENT_USER_DETAIL,
  GET_VERIFY,
  LOGIN
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
  }
};
