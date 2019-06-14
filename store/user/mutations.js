import {
  GET_VERIFY,
  LOGIN
} from '../mutation-types';

export default {
  [GET_VERIFY](state, { phone }) {
    state.phone = phone
    },

  [LOGIN](state, data) {
    state = {...state, ...data};
    console.log(state);
  }
};
