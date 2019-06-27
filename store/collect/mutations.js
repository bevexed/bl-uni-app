import {
  ADD_COLLECT,
  GET_COLLECT
} from '../mutation-types';

export default {
    [GET_COLLECT](state, { data }) {
        state.goodList = data;
    },
};
