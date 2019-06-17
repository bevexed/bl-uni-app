import { GET_PRODUCTS } from '../mutation-types';
import { reqProducts } from "../../api/products";

export const getProducts = async ({ commit }, data) => {
  let res = await reqProducts(data);
  if (res.code === 200) {
    commit(GET_PRODUCTS, res.data.data);
  }
};
