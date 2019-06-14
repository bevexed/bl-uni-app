import {GET_PRODUCTS} from '../mutation-types';

export function getProducts({ commit }, { data }) {

    commit(GET_PRODUCTS, { data });
}
