import {
  GET_CODE,
  GET_CURRENT_USER_DETAIL,
  GET_REFRESH_TOKEN,
  GET_VERIFY,
  IS_EXIST,
  LOGIN,
  LOGIN_OUT
} from '../mutation-types';
import {
  reqChangeUser,
  reqCurrentUserDetail,
  reqIsExist,
  reqLogin,
  reqRefreshToken,
  reqUpdatePhone,
  reqVerify
} from "../../api/user";
import { MSG_BACK, MSG_REDIRECT, MSG_RELAUNCH, SHOW_MODAL, SMG } from "../../unit";

export default {
  // 获取code
  async getCode({ commit }) {
    return new Promise(resolve => {
      uni.login({
        provider: 'weixin',
        success({ code }) {
          resolve(code);
          commit(GET_CODE, code)
        }
      });
    })
  },
  // 检验用户是否存在
  async getIsExist({ commit }, phone) {
    let p = /^1[0-9]{10}$/;
    if (!p.test(phone)) {
      uni.showToast({
        title: '请检查手机号码是否正确',
        icon: "none"
      });
      return
    }
    let res = await reqIsExist({ phone });
    if (res.code === 200) {
      commit(IS_EXIST, res.data);
      if (!res.data) {
        SHOW_MODAL({
          title: '用户未注册',
          content: '用户未注册，是否跳转注册页面？',
          confirm() {
            uni.navigateTo({
              url: '/pages/login/base-information?phone=' + phone
            })
          },
          cancel() {
            uni.reLaunch({
              url: '/pages/login/login'
            })
          }
        });
      } else {
        return true
      }
    }
  },

  // 获取短信验证码
  async getVerify({ commit }, phone) {
    let res = await reqVerify({ phone });
    if (res.code === 200) {
    commit(GET_VERIFY, { phone });
      uni.showToast({
        title: '短信发送成功',
        mask: true
      });
      return true
    } else {
      uni.showToast({
        title: res.msg,
        icon: "none"
      });
      return false;
    }
  },

  // 用户登录
  async doLogin({ commit }, data) {
    let res = await reqLogin(data);
    if (res.code === 200) {
      commit(LOGIN, res.data);
      // 同步写入 token
      uni.setStorage({
        key: 'token',
        data: res.data.token,
        success(res) {
          console.log('token',res);
          uni.switchTab({
            url: '/pages/home/home'
          })
        }
      })
    } else {
      uni.showToast({
        title: '验证码错误，请重新输入',
        icon: "none"
      })
    }
  },

  // 用 token 获取用户信息
  async getCurrentUserInfo({ commit }) {
    let res = await reqCurrentUserDetail();
    if (res.code === 200) {
      commit(GET_CURRENT_USER_DETAIL, res.data)
    }
  },

  // 刷新 用户 token
  async getRefreshToken({ commit }) {
    let res = await reqRefreshToken();
    if (res.code === 200) {
      uni.setStorage({
        key: 'token',
        data: res.data.userInfo.token,
        success() {
          commit(GET_REFRESH_TOKEN, res.data.userInfo);
        }
      });
    }
  },

  async changeUser({ state, dispatch }, data) {
    let { id } = state.userInfo;
    return reqChangeUser({ id, ...data })
  },

  async loginOut({ commit }) {
    commit(LOGIN_OUT, {});
    uni.clearStorage();
    MSG_RELAUNCH({
      title:'已退出登录',
      url: '/pages/home/home'
    })
  },

  async changePhone({}, data) {
    const { phone, verify } = data;
    let p = /^1[0-9]{10}$/;
    if (!p.test(phone)) {
      SMG('请检查手机号');
      return
    }
    let res = await reqUpdatePhone(data);
    if (res.code === 200) {
      uni.setStorage({
        key: 'token',
        data: res.data,
        success(res) {
          MSG_BACK({
            title: '修改成功',
            url: '/pages/personal-information/personal-information'
          })
        }
      })

    }
  }
}



