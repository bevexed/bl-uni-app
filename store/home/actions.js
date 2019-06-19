import {
  GET_HOME_BANNER
} from '../mutation-types';
import {
  reqHomeBanner
} from "../../api/home";

export const getHomeBanner = async ({ commit }, type) => {
  let res = await reqHomeBanner({ type });
  if (res.code === 200) {
    commit(GET_HOME_BANNER, { [type]: res.data });
  }
};
