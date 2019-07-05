import uniRequest from 'uni-request';
import { MSG_RELAUNCH, MSG_TO, SHOW_MODAL, SMG } from "../utils";
import Store from '../store'


// 全局修改公司 ID
export const companyId = 4;


// 全局配置
uniRequest.defaults.baseURL = 'http://www.ziniuxiaozhu.com/micro';

const header = () => {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key: 'token',
      success(res) {
        // 此处获取的 token 只有第一次初始化时有效
        uniRequest.defaults.headers.common['Authorization'] = res.data;
        resolve(res.data)
      },
      fail(err) {
        uniRequest.defaults.headers.common['Authorization'] = '';
        resolve(err);
      }
    });
  })
};

uniRequest.defaults.headers.post['Content-Type'] = 'application/json';
uniRequest.defaults.headers.put['Content-Type'] = 'application/json';

// 请求别名
// uniRequest.request(config)
// uniRequest.get(url[, config])
// uniRequest.delete(url[, config])
// uniRequest.head(url[, config])
// uniRequest.options(url[, config])
// uniRequest.post(url[, data[, config]])
// uniRequest.put(url[, data[, config]])
// uniRequest.patch(url[, data[, config]])

export default async function ajax(url, data = {}, type, loading = true) {

  console.log('query', data);

  await header();

  if (loading) {
    uni.showLoading({
      title: 'loading'
    })
  }

  return new Promise((resolve, reject) => {
    let promise;
    switch (type) {
      case "POST":
        promise = uniRequest.post(url, data);
        break;
      case 'GET':
        // 过滤空数据
        let realData = {};
        Object.entries(data).map(([k, v]) => {
          // 排除 值等于 0 的情况
          if (v || v === 0) {
            realData[k] = v
          }
        });
        promise = uniRequest.get(url, {
          params: realData
        });
        break;
      case "PUT":
        promise = uniRequest.put(url, data);
        break;
      case "DELETE":
        promise = uniRequest.delete(url, data);
    }


    promise.then(
      response => {
        uni.hideLoading();
        console.log('ajax-success', response.data);

        //todo; 400 401 清数据
        if (response.data.code === 400) {
          return SMG(response.data.msg);
        }

        // 全局拦截 401 用户未登录
        if (response.data.code === 401) {
          uni.clearStorage();
          SHOW_MODAL({
            title: '未登录',
            content: '用户未登录，无法操作，是否跳转登录？',
            confirm() {
              uni.redirectTo({
                url: '/pages/login/login'
              })
            },
            cancel() {
              uni.reLaunch({
                url: '/pages/home/home'
              })
            }
          });
          return
        }

        // 用户权限不足
        if (response.data.code === 403) {
          MSG_RELAUNCH({
            title: '用户未激活，请等待激活！',
            icon: "none",
            mask: true,
            url: '/pages/home/home'
          });
          return
        }

        // 全局 520 \\ 404
        if (response.data.code === 520 || response.data.code === 404) {
          uni.showToast({
            title: response.data.msg,
            icon: "none",
            mask: true
          });
          return;
        }

        resolve(response.data);

      },
      error => {
        uni.hideLoading();
        uni.showToast({
          icon: 'none',
          title: '服务器错误'
        });
        reject('ajax-error', error)
      }
    );

  })
}
