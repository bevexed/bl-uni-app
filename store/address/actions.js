import {
  ADD_ADDRESS,
  GET_ALL_ADDRESS
} from '../mutation-types';

import {
  reqAddAddress,
  reqAddressDefault,
  reqAllAddress,
  reqDeleteAddress,
  reqChangeAddress
} from "../../api/address";

import { MSG_BACK, SHOW_MODAL, SMG } from "../../unit";

export const addAddress = async ({ dispatch }, data) => {
  let { addressee, city, county, phone, province, other } = data;
  if (!addressee) {
    SMG('请填写收件人姓名');
    return
  }

  let p = /^1\d{10}$/;
  if (!p.test(phone)) {
    SMG('请检测手机号');
    return
  }

  if (!city || !county || !province) {
    SMG('请选择地址');
    return
  }

  if (!other) {
    SMG('请填写详细地址');
    return
  }

  let res = await reqAddAddress(data);
  if (res.code === 200) {
    uni.showToast({
      title: '添加成功',
      mask: true,
      duration: 2000,
      success(res) {
        MSG_BACK({
          title:'添加成功'
        })
      }
    })
  }
};

export const getAllAddress = async ({ commit }) => {
  let res = await reqAllAddress();
  if (res.code === 200) {
    commit(GET_ALL_ADDRESS, res)
  }
};

export const deleteAddress = async ({ dispatch }, id) => {
  SHOW_MODAL({
    title: '删除地址',
    content: '确认删除地址？',
    async confirm() {
      let res = await reqDeleteAddress(id);
      if (res.code === 200) {
        await dispatch('getAllAddress');
        uni.showToast({
          title: '删除成功'
        })
      }
    },
    cancel() {

    }
  });
};

export const defaultAddress = async ({ dispatch }, id) => {
  let res = await reqAddressDefault(id);
  if (res.code === 200) {
    await dispatch('getAllAddress');
    uni.showToast({
      title: '修改成功'
    })
  }
};

export const changeAddress = async ({ dispatch }, data) => {
  let { addressee, city, county, phone, province, other } = data;
  if (!addressee) {
    SMG('请填写收件人姓名');
    return
  }

  let p = /^1\d{10}$/;
  if (!p.test(phone)) {
    SMG('请检测手机号');
    return
  }

  if (!city || !county || !province) {
    SMG('请选择地址');
    return
  }

  if (!other) {
    SMG('请填写详细地址');
    return
  }

  SHOW_MODAL({
    title: '编辑地址',
    content: '是否保存本次编辑结果？',
    async confirm() {
      let res = await reqChangeAddress(data);
      if (res.code === 200) {
        MSG_BACK({
          title: '修改成功'
        })
      }
    },
    cancel() {

    }
  })


};
