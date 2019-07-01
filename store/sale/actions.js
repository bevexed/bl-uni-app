import {
  GET_AFTER_SALE_LIST
} from '../mutation-types';
import { reqAfterSaleList, reqCreateAfterSale } from "../../api/sale";
import { MSG_TO } from "../../unit";

export const createAfterSale = async ({ commit }, data) => {
  let res = await reqCreateAfterSale(data);
  if (res.code === 200) {
    MSG_TO({
      title: '请求售后成功',
      url: 'sale-after-detail?orderId=' + res.data
    })
  }
};

export const getAfterSaleList = async ({ commit }, data) => {
  let res = await reqAfterSaleList({ page: 1, pageSize: 100000 });
  if (res.code === 200) {
    commit(GET_AFTER_SALE_LIST, res)
  }
}
