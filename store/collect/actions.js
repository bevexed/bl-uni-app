import {
  ADD_COLLECT,
  GET_COLLECT
} from '../mutation-types';

import {
  reqAddCollect,
  reqCollect,
  reqDeleteCollect
} from "../../api/collect";

export const addCollect = async ({ commit }, id) => {
  let res = await reqAddCollect(id);
  if (res.code === 200) {
    uni.showToast({
      title: '收藏成功'
    })
  } else {
    uni.showToast({
      title: res.msg,
      icon: "none"
    })
  }
};

export const getCollect = async ({ commit }, status) => {
  let res = await reqCollect(status);
  if (res.code === 200) {
    commit(GET_COLLECT, res)
  }
};

export const deleteCollect = async ({ dispatch }, id) => {
  let res = await reqDeleteCollect(id);
  if (res.code === 200) {
    dispatch('getCollect').then(
      () => {
        uni.showToast({
          title: '删除成功',
          mask: true
        })
      }
    )
  }
};
