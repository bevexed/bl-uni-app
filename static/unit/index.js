function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    return canvas.toDataURL();
}

export const myImage = img => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = img;

        image.onload = function() {
            console.dir(image);
            if (image.complete) {
                let base64;
                base64 = getBase64Image(image);
                console.log(base64);
                resolve(base64)
            } else {
                reject(err)
            }

        }
    });
};


/**
 * @function 提示后延时跳转
 * @param title
 * @param url
 * @param duration
 * @constructor
 */

export const MSG_TO = ({ title, url, duration = 2000 }) => {
  uni.showToast({
    title,
    duration,
    success(res) {
      setTimeout(() => {
        uni.navigateTo({
          url
        })
      }, duration)
    }
  })
};

/**
 * 表单验证
 * @param title
 * @constructor
 */

export const SMG = title => uni.showToast({
  title,
  mask: true,
  icon: "none"
});

// fixMe:2.隐私政策内容无
// fixMe:6.绑定手机号、昵称、企业名称、职位、邮箱无法修改
// fixMe:7.购买时标样选不了
// fixMe:9.获取合同、查看合同、申请发票这个状态有点乱
// fixMe:10。购物车中修改无法选中标样
// fixMe:11.交易完成的订单，在待付款中查询出来了
// fixMe:12.我的订单的售后状态查询出的应该是售后数据，不是订单的数据
