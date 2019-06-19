import {
  ADD_ADDRESS,
  GET_ALL_ADDRESS
} from '../mutation-types';

export default {
  [GET_ALL_ADDRESS](state, { data }) {
    state.addressList = data;
  },
};
