import {} from '../mutation-types';
import { reqCreateAfterSale } from "../../api/sale";

export const createAfterSale = async ({ commit }, data) => {
  let res = await reqCreateAfterSale(data)
};
