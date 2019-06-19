import {
  ADD_COLLECT,
  GET_COLLECT
} from '../mutation-types';

import {
  reqAddCollect,
  reqCollect
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
