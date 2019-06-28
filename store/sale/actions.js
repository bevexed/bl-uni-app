import {
  GET_AFTER_SALE_LIST
} from '../mutation-types';
import { reqAfterSaleList, reqCreateAfterSale } from "../../api/sale";

export const createAfterSale = async ({ commit }, data) => {
  let res = await reqCreateAfterSale(data)
};

export const getAfterSaleList = async ({ commit }, data) => {
  // 此处 售后量不是很大，所以一次拉取
  let res = await reqAfterSaleList({ page: 1, pageSize: 100000 });
  if (res.code === 200) {
    commit(GET_AFTER_SALE_LIST, res)
  }
}
