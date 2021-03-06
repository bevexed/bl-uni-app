import ajax, { companyId } from './ajax'

/**
 * @function 商品分类
 * */

export const reqCategories = () => ajax('/categories', {}, 'GET');

/**
 * @function 商品列表
 * @param page {number} 当前页
 * @param pageSize {number} 每页条数
 * @param categoryId {array} 分类
 * @param companyId {number} 公司编号
 * @param hasStock {boolean} boolean
 * @param pno {string} 商品编号
 * @param price {array} 价钱
 * @param weight {array} 克重
 * @param width {array} 幅宽
 * @param sort {string}  composite_desc, shelves_desc, sale_asc, price_asc, price_desc
 * */
// categoryId, hasStock, pno, price, weight, width, sort
export const reqProducts = ({ page = 1, pageSize = 10, ...rest }) => {
  // let str = '';
  // Object.entries(rest).forEach(([k, v]) => {
  //   // 当数组长度为0时过滤数组
  //   if (Array.isArray(v) && v.length === 0) {
  //     return
  //   }
  //   if (v) {
  //     str += k + '=' + v + '&'
  //   }
  // });
  // console.log(str);
  return ajax('/products', { companyId, page, pageSize, ...rest }, "GET")
};


/**
 * @function 商品详情
 * @param id {Number} 商品ID
 * */

export const reqProduct = id => ajax(`/products/${ id }`, {}, 'GET');


/**
 * @function 相似商品
 * @param id {Number} 商品ID
 */
export const reqSimilar = id => ajax(`/products/similar/${ id }`, {}, 'GET');

/**
 * @function 分享
 * @param id {Number} 商品ID
 * */

export const reqShare = id => ajax('/products/share/' + id, {}, 'GET');

/**
 * @function 商品试衣
 * @param id
 * @param rest
 * @returns {Promise<*>}
 */

export const reqFitting = ({id,...rest}) => ajax('/products/fitting/' + id, {id,...rest}, 'GET');
export const reqFittingModel = () => ajax('/products/fitting/model', {}, 'GET');
export const reqFittingSimilar = id => ajax('/products/fitting/similar/' + id, {}, 'GET');
