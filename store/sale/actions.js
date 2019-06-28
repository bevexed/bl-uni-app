import {
  GET_AFTER_SALE_LIST
} from '../mutation-types';
import { reqAfterSaleList, reqCreateAfterSale } from "../../api/sale";

export const createAfterSale = async ({ commit }, data) => {
  let res = await reqCreateAfterSale(data)
};

export const getAfterSaleList = async ({ commit }, data) => {
  let res = await reqAfterSaleList({page:1});
}
