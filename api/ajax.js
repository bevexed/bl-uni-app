import uniRequest from 'uni-request';


// 全局配置
uniRequest.defaults.baseURL = 'http://192.168.3.108:7100/micro';
// uniRequest.defaults.headers.common['Authorization'] = AUTH_TOKEN;
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

export default function ajax(url, data = {}, type = "POST", loading = true) {

  if (loading) {
    uni.showLoading({
      title: 'loading'
    })
  }

    return new Promise((resolve, reject) => {
        let promise;
        if (type === 'GET') {
            promise = uniRequest.get(url, {
                params: data
            })
        } else {
            promise = uniRequest.post(url, data)
        }


        promise.then(
            response => {
                uni.hideLoading();
                console.log('ajax-success', response.data);
                resolve(response.data)
            },
            error => {
                uni.hideLoading();
                uni.showToast({
                    icon:'none',
                    title: '服务器错误'
                });
                reject('ajax-error', error)
            }
        );

    })
}
