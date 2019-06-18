import uniRequest from 'uni-request';


// 全局配置
uniRequest.defaults.baseURL = 'https://www.chengqj.com/micro';

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
        reject(err)
      }
    });
  })

};

uniRequest.defaults.headers.post['Content-Type'] = 'application/json';

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
        promise = uniRequest.get(url, {
          params: data
        });
        break;
      case "PUT":
        promise = uniRequest.put(url, data)
    }


    promise.then(
      response => {
        uni.hideLoading();
        console.log('ajax-success', response.data);


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
