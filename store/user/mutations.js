import {
  GET_CURRENT_USER_DETAIL,
  GET_VERIFY,
  LOGIN
} from '../mutation-types';

export default {
  [GET_VERIFY](state, { phone }) {
    state.phone = phone
    },

  [LOGIN](state, data) {
    state = {...state, ...data};
  },

  [GET_CURRENT_USER_DETAIL](state, data) {
    state = { ...state, ...data }
  }
};
