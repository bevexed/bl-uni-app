/**
 * @function 提示后延时跳转
 * @param title
 * @param url
 * @param duration
 * @param mask
 * @constructor
 */

export const MSG_TO = ({ title, url, duration = 2000, mask = true }) => {
  uni.showToast({
    title,
    duration,
    mask,
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
 * @function 提示后回退
 * @param title
 * @param url
 * @param duration
 * @constructor
 */

export const MSG_BACK = ({ title, duration = 2000, mask = true }) => {
  uni.showToast({
    title,
    duration,
    mask,
    success(res) {
      setTimeout(() => {
        uni.navigateBack({
          delta: 1
        })
      }, duration)
    }
  })
};

export const MSG_RELAUNCH = ({ title, url, icon = 'success', duration = 2000, mask = true }) => {
  uni.showToast({
    title,
    duration,
    icon,
    mask,
    success(res) {
      setTimeout(() => {
        uni.reLaunch({
          url
        })
      }, duration)
    }
  })
};

export const MSG_REDIRECT = ({ title, url, duration = 2000, mask = true }) => {
  uni.showToast({
    title,
    duration,
    mask,
    success(res) {
      setTimeout(() => {
        uni.redirectTo({
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

/**
 * @function 获取当前地址
 * @param index
 * @returns {() => void}
 */

export const getRoute = index => {
  let pages = getCurrentPages();
  return pages[pages.length - index].route;
};

/**
 * @function 模态框
 * @param title
 * @param content
 * @param confirm
 * @param cancel
 * @constructor
 */

export const SHOW_MODAL = ({ title, content, confirm, cancel }) => {
  uni.showModal({
    title,
    content,
    confirmColor: '#BFA065',
    success(res) {
      if (res.confirm) {
        confirm()
      } else if (res.cancel) {
        cancel()
      }
    }
  });
};

/**
 * @function 权限跳转页面
 * @param url
 * @param data
 * @param type
 * @constructor
 */
export const authenticationTo = ({ url, status, type = 'navigateTo' }) => {

  if (status === 1) {
    return SMG('用户未激活，请等待激活！');
  }

  if (!status) {
    return SHOW_MODAL({
      title: '未登录',
      content: '用户未登录，无法操作，是否跳转登录？',
      confirm() {
        uni.redirectTo({
          url: '/pages/login/login'
        })
      },
      cancel() {
        // uni.reLaunch({
        //   url: '/pages/home/home'
        // })
      }
    });

  }

  switch (type) {
    case "navigateTo":
      uni.navigateTo({
        url
      });
      break;
  }

};

// fixMe:2.隐私政策内容无
// fixMe:12.我的订单的售后状态查询出的应该是售后数据，不是订单的数据


// 注册/登录
// 登录
// 1. 有隐私政策  ->  无隐私政策
//
// 注册
//
// 2.隐私政策不正确  ->  “已经阅读并同意隐私政策”
//
// 3. "隐私政策"链接不可用
//
// 5.公司名称和职务根据后台设置，确认必填和非必填
//
// 6.登录成功后跳转个人中心页面
//
// 商品详情页面
// 1.长按轮播图片后松开，显示全屏  ->  暂停轮播，松开后重新计算
//
// 2.未认证用户点击图片后放大  ->  只有已认证可以放大图片
//
// 3.收藏按钮无明显反应，不能取消收藏
//
// 4.数量选择
// 1）默认数量为1，不可单独购买小样 -> 默认为0
// 2）第一次输入为0，显示为1；再次输入0时，显示为0  ->  输入所选商品数量：0，不选择小样，保存不成功，提示：请选择商品数量；选择小样，保存成功，返回页面，该商品条目处显示保存的商品数量和小样，商品价格亦随之改变
// 3）确定后，加入购物车，且商品选择处未显示所选数量和小样
//   ->  确定后，返回与入口相对应的页面（未选择商品和小样，点击加入购物车和立即购买，弹出弹窗）：
//     商品选择/加入购物车：确定后隐藏窗口，回到原商品详情页，商品选择处显示所选的商品数量和小样数量
// 立即购买：确定后跳转 结算付款 页面  4）未选择商品，点击“加入购物车”,提示“已加入购物车”  ->  弹出数量选择弹窗,确定后，回到原商品详情页，商品选择处显示所选的商品数量和小样数量
// 5）未选择商品，点击“立即购买”，无反应 -> 弹出数量选择弹窗,确定后跳转 结算付款 页面
// 6）文本输入：第一次设置商品数量>库存，直接显示库存量；再次设置商品数量>库存，可设置成功 -> 设置商品数量>库存，确定时保存不成功，提示框提示：超过库存上限，不可操作
// 7）“+”“-”按钮，默认为1 -> 根据后台设置显示
//
// 5.商品详情信息未过滤
//
// 6.购物车图标显示的商品种类数量不正确
// 10:03
// 购物车
//
// 2.修改状态
// 1）有“总计”显示
// 2）可同时展开编辑区域（数量方块）
//   3）修改数量和小样：
// 小样不可修改
// 数量不能为0，输入为0时，保存默认显示为1
// 输入所选商品数量<=库存，保存后，对应的商品价格没有变化
// 输入所选商品数量>库存，第一次修改，显示库存量，再次修改显示为修改值，保存后，显示库存数量，对应的商品价格没有变化 -> 保存不成功，提示框提示：超过库存上限，不可操作
// 修改数量，保存后，锁屏，再次打开，购物车数量恢复原来数值
//               “+”“-”按钮，默认+10 -> 根据后台设置
// 4.下架商品无下架标识
//
// 5.清除下架时无提示信息 -> 弹框提示：是否一键清除下架商品？（确定，取消）
//
// 6.点击商品列表，无法跳转到商品详情页
