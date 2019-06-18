import ajax from './ajax'

/**
 * @function 购物车新增
 * @param companyId {Number} 公司ID
 * @param gmtCreate {Date} 时间
 * @param id {Number} 购物车ID
 * @param image {String}
 * @param pno {String}
 * @param price {Number}
 * @param productId {Number} 商品ID 必传
 * @param sampleType {Number} 是否有小样 1有 0无
 * @param shoppingNum {Number} 购买数量
 * @param status {Number} 状态 1 正常 2低库存 3 失效
 * @param stock {Number}
 * @param totalAmount {number}
 * @param userId {Number}
 */

export const reqAddCart = ({ shoppingNum = 1, productId }) => ajax('/cart', { shoppingNum, productId }, 'POST');

/**
 * @function 查询购物车详情
 * */

export const reqSelectAll = () => ajax('/cart/selectAll', {}, 'GET');

/**
 * @function 删除购物车商品
 * @param id {Number} 商品 ID
 * */

export const reqDetele = id => ajax('/cart/' + id, {}, 'DELETE');
