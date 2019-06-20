import ajax from './ajax'

/**
 * @function 获取订单列表
 * @param page {Number} 页数
 * @param pageSize {Number} 每页数量
 * @param status {Number} 订单状态筛选
 * @returns {Promise<*>}
 */

export const reqOrderList = ({ page, pageSize = 10, ...rest }) => ajax('/order/orderList', {
  page,
  pageSize,
  ...rest
}, 'GET');

/**
 * @function 创建订单
 * @param addressId
 * @param item {Array<product>} product={count,productId,sampleType}
 * @returns {Promise<*>}
 */

export const reqCreateOrder = ({ addressId, item }) => ajax('/order/createOrder', { addressId, item }, 'POST');
