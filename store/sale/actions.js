import {
  GET_AFTER_SALE_LIST
} from '../mutation-types';
import { reqAfterSaleList, reqCreateAfterSale } from "../../api/sale";
import { MSG_REDIRECT, SMG } from "../../utils";

export const createAfterSale = async ({ commit }, data) => {

  if (data.productCount === 0) {
    return SMG('请选择商品数量')
  }

  const { reasonCode, type } = data;
  console.log(reasonCode, type);
  if (reasonCode === '' || type === '') {
    return SMG('请选择必选信息')
  }

  let res = await reqCreateAfterSale(data);
  if (res.code === 200) {
    MSG_REDIRECT({
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
