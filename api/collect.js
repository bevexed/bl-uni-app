import ajax from './ajax'

/**
 * @function 新增收藏
 * @param productId {number} 商品ID
 */

export const reqAddCollect = productId => ajax('/collect/' + productId, {}, 'POST');

