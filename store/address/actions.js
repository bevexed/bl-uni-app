import {
  ADD_ADDRESS
} from '../mutation-types';

import {
  reqAddAddress
} from "../../api/address";

const SMG = title => uni.showToast({
  title,
  mask: true,
  icon: "none"
});

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
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/address-book/address-book'
          })
        }, 2000)
      }
    })
  }
};
