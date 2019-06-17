import {
  GET_REFRESH_TOKEN,
  GET_CURRENT_USER_DETAIL,
  GET_VERIFY,
  LOGIN
} from '../mutation-types';
import {
  reqVerify,
  reqLogin,
  reqIsExist,
  reqCurrentUserDetail,
  reqRefreshToken
} from "../../api/user";

export default {
  // 检验用户是否存在
  async getIsExist({ commit }, phone) {
    if (phone.length < 11) {
      uni.showToast({
        title: '请检查手机号码是否正确',
        icon: "none"
      });
      return
    }
    let res = await reqIsExist({ phone });
    if (res.code === 200) {
      // 未注册
      if (!res.data) {
        uni.navigateTo({
          url: '/pages/login/base-information'
        })
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
      })
    } else {
      uni.showToast({
        title: res.msg,
        icon: "none"
      })
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
    }
  },

  // 用 token 获取用户信息
  async getCurrentUserInfo({ commit }) {
    let res = await reqCurrentUserDetail();
    if (res.code === 200) {
      commit(GET_CURRENT_USER_DETAIL, res.data)
    } else {
      /*
       * 只有token存在是才会进入此状态，
       * 所以此时 token 必定失效,
       * 需要跳转到登录页面
       */
      uni.showToast({
        title: res.msg,
        mask: true,
        duration: 2000,
        icon: "none",
        success(res) {
          setTimeout(()=>{
            uni.navigateTo({
              url:'/pages/login/login'
            })
          },2000)
        }
      })
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
          uni.switchTab({
            url: '/pages/home/home'
          })
        },
        fail(res) {
          uni.navigateTo({
            url:'/pages/login/login'
          })
        }
      });
    }
  }


}

