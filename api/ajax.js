import uniRequest from 'uni-request';
import { MSG_TO } from "../static/unit";

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
        // 全局拦截 401 用户未登录
        if (response.data.code === 401) {
          uni.showModal({
            title: '未登录',
            content: '用户未登录，无法操作，是否跳转登录？',
            confirmColor: '#BFA065',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url: '/pages/login/login'
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
                // 后退方式
                // uni.navigateBack({
                //   delta: 10,
                //   fail() {
                //     uni.switchTab({
                //       url: '/pages/home/home'
                //     })
                //   }
                // })

                // 暴力方式
                uni.reLaunch({
                  url: '/pages/home/home'
                })
              }
            }
          });
          return
        }

        // 用户权限不足
        if (response.data.code === 403) {
          uni.showToast({
            title: '用户权限不足',
            icon: "none",
            mask: true,
            success() {
              setTimeout(() => {
                uni.navigateBack({
                  delta: 10,
                  fail() {
                    uni.switchTab({
                      url: '/pages/home/home'
                    })
                  }
                })
              }, 2000)
            }
          })
          // uni.showModal({
          //   title: '权限不足',
          //   content: '暂不支持此功能',
          //   confirmColor: '#BFA065',
          //   success: function (res) {
          //     if (res.confirm) {
          //       console.log('用户点击确定');
          //       uni.navigateBack({
          //         delta: 1
          //       })
          //     } else if (res.cancel) {
          //       console.log('用户点击取消');
          //     }
          //   }
          // });
          return
        }

        // 全局 520 \\ 404
        if (response.data.code === 520 || response.data.code === 404) {
          uni.showToast({
            title: response.data.msg,
            icon: "none",
            mask: true
          })

          // 此处 返回 虚假 200 强制接收假数据
          resolve({ code: 200, data: null });

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
