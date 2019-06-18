import {
  ADD_CART
} from '../mutation-types';

export default {
  [ADD_CART](state, { data }) {
    state.data = data;
  },
};
