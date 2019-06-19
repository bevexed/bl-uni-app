import {
  GET_HOME_BANNER
} from '../mutation-types';
import {
  reqHomeBanner
} from "../../api/home";

export const getHomeBanner = async ({ commit }, type) => {
  let res = await reqHomeBanner(type);
  console.log(res);
  commit(GET_HOME_BANNER, { data });
};
