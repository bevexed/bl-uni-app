import {GET_VERIFY} from '../mutation-types';

export default {
    [GET_VERIFY](state, { data }) {
        state.data = data;
    },
};
