import ajax from './ajax'

/**
 * @function 商品分类
 * */

export const reqCategories = () => ajax('/categories','GET');

/**
 * 商品列表
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
export const reqProducts = ({ page = 1, pageSize = 10, companyId = 4, ...rest }) => ajax('/products', {
  page,
  pageSize,
  companyId,
  ...rest
}, "GET");
