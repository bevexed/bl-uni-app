import {GET_PRODUCTS} from '../mutation-types';

export default {
    [GET_PRODUCTS](state, { data }) {
        state.data = data;
    },
};
