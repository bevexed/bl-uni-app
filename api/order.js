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

/**
 * @function 取消订单
 * @param orderId
 * @param reason
 * @param reasonText
 * @returns {Promise<*>}
 */

export const reqCancelOrder = ({ orderId, reason, reasonText }) => ajax('/order/cancelOrder', {
  orderId,
  reason,
  reasonText,
}, 'PUT');

/**
 * @function 确认收货
 * @param orderId
 * @returns {Promise<*>}
 */

export const reqConfirmReceipt = orderId => ajax('/order/confirmReceipt/' + orderId, {}, 'PUT');

/**
 * @function 催单
 * @param orderId
 * @returns {Promise<*>}
 */
export const reqRemindOrder = orderId => ajax('/order/remindOrder/' + orderId, {}, 'PUT');

/**
 * @function 获取订单详情
 * @param orderId
 * @returns {Promise<*>}
 */

export const reqOrderDetail = orderId => ajax('/order/orderDetail', { orderId }, 'GET');

/**
 * @function 请求订单微信支付
 * @param amount
 * @param bankTransferRecord
 * @param code
 * @param filename
 * @param orderNum
 * @param paymentMethod
 * @returns {Promise<*>}
 */

export const reqPayOrder = ({ amount, bankTransferRecord, code, filename, orderNum, paymentMethod }) => ajax('/order/payOrder', {
  amount,
  bankTransferRecord,
  code,
  filename,
  orderNum,
  paymentMethod
}, 'PUT');

/**
 * @function 获取运费
 * @param addressId
 * @param item
 * @returns {Promise<*>}
 */
export const reqShipCost = ({ addressId, item }) => ajax('/order/shipCost', { addressId, item }, 'POST');

/**
 * @function 删除订单
 * @param orderId
 * @returns {Promise<*>}
 */
export const reqDeleteOrder = orderId => ajax('/order/deleteOrder', {}, 'DELETE');
