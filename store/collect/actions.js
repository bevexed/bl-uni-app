import {
  ADD_COLLECT
} from '../mutation-types';

import {
  reqAddCollect
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

  commit(ADD_COLLECT, { data });
};
