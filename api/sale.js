import ajax from './ajax'

/**
 * @function 创建售后单
 * @param orderItemId
 * @param productCount
 * @param reason
 * @param reasonCode
 * @param type
 * @returns {Promise<*>}
 */

export const reqCreateAfterSale = ({ orderItemId, productCount, reason, reasonCode, type }) => ajax('/afterSale/createAfterSale', {
  orderItemId,
  productCount,
  reason,
  reasonCode,
  type
}, 'POST');
