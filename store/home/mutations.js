import {
  GET_HOME_BANNER
} from '../mutation-types';

export default {
  [GET_HOME_BANNER](state, data) {
    state.homeData = { ...state.homeData, ...data };
  },
};
