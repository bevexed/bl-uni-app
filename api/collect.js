import ajax from './ajax'

/**
 * @function 新增收藏
 * @param productId {number} 商品ID
 */

export const reqAddCollect = productId => ajax('/collect/' + productId, {}, 'POST');

/**
 * @function 获取收藏列表
 * @param status {number} 状态 1全部 2 低库存 9失效
 */

export const reqCollect = (status = 1) => ajax('/collect/' + status, {}, 'GET');

/**
 * @function 收藏删除
 * @param productId {Number} 商品ID
 * */

export const reqDeleteCollect = productId => ajax('/collect/' + productId, {}, 'DELETE');
