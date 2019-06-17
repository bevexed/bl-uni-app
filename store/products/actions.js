import { GET_PRODUCTS } from '../mutation-types';
import { reqProducts } from "../../api/products";

export const getProducts = async ({ commit, state }, data) => {
  // todo:修复 分页
  let { page, total } = state;
  if (Math.ceil(total / 10) < page) {
    return
  }
  let res = await reqProducts(data);
  if (res.code === 200) {
    commit(GET_PRODUCTS, res.data);
  }
};
