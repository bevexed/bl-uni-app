import {
  ADD_ADDRESS
} from '../mutation-types';

export default {
  [ADD_ADDRESS](state, { data }) {
    state.data = data;
  },
};
