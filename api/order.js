import ajax from './ajax'

/**
 * @function 获取订单列表
 * @param page {Number} 页数
 * @param pageSize {Number} 每页数量
 * @param status {Number} 订单状态筛选
 * @returns {Promise<*>}
 */

export const reqOrderList = ({ page, pageSize = 10, status }) => ajax('/order/orderList', {
  page,
  pageSize,
  status
}, 'GET');
