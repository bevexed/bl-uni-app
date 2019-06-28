import {
  ADD_COLLECT,
  GET_COLLECT
} from '../mutation-types';

import {
  reqAddCollect,
  reqCollect,
  reqDeleteCollect
} from "../../api/collect";
import { getRoute, SHOW_MODAL, SMG } from "../../unit";

export const addCollect = async ({ dispatch, }, id) => {
  let res = await reqAddCollect(id);
  if (res.code === 200) {
    await dispatch('Products/getProduct', id, { root: true });
    uni.showToast({
      title: '收藏成功'
    });
    return
  }
  SMG(res.msg);
};

export const getCollect = async ({ commit }, status) => {
  let res = await reqCollect(status);
  if (res.code === 200) {
    commit(GET_COLLECT, res)
  }
};

export const deleteCollect = async ({ dispatch }, id) => {
  SHOW_MODAL({
    title: '取消收藏',
    content: '确认取消该商品？',
    async confirm() {
      let res = await reqDeleteCollect(id);
      if (res.code === 200) {
        let route = getRoute(1);
        if (route === 'pages/shop-detail/shop-detail') {
          await dispatch('Products/getProduct', id, { root: true });
        }

        await dispatch('getCollect');
        uni.showToast({
          title: '取消收藏成功',
          mask: true
        })
      }
    },
    cancel() {

    }
  });

};
