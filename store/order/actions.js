import {
  GET_ORDER_LIST
} from '../mutation-types';
import { reqOrderList } from "../../api/order";

export const getOrderList = async ({ commit }, data) => {
  let res = await reqOrderList(data);
  commit(GET_ORDER_LIST, { data });
};
