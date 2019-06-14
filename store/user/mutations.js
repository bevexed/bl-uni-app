import {
  GET_VERIFY
} from '../mutation-types';

export default {
  [GET_VERIFY](state, { phone }) {
    state.phone = phone
    },
};
