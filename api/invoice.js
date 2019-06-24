import ajax, { companyId } from "./ajax";

/**
 * @function 添加开票信息
 * @param account
 * @param address
 * @param bank
 * @param city
 * @param companyName
 * @param companyTax
 * @param county
 * @param id
 * @param isDefault {Boolean}
 * @param phone
 * @param province
 * @param type {string} 专票 普票
 * @param userId
 * @returns {Promise<*>}
 */

export const reqAddInvoice = ({ account, address, bank, city, companyName, companyTax, county, id, isDefault, phone, province, type, userId }) => ajax('/invoice/add', {
  account,
  address,
  bank,
  city,
  companyName,
  companyTax,
  county,
  id,
  isDefault,
  phone,
  province,
  type,
  userId,
  companyId
}, 'POST');

/**
 * @method 获取发票列表
 * @returns {Promise<*>}
 */

export const reqInvoiceList = () => ajax('/invoice', {}, 'GET');

/**
 * @method 获取发票详情
 * @param id
 * @returns {Promise<*>}
 */

export const reqInvoiceDetail = id => ajax('/invoice/' + id, {}, 'GET');

/**
 * @method 修改默认发票
 * @param id
 * @returns {Promise<*>}
 */
export const changInvoiceDetail = id => ajax('/invoice/' + id, {}, 'PUT');

/**
 * @method 修改发票信息
 * @param account
 * @param address
 * @param bank
 * @param city
 * @param companyName
 * @param companyTax
 * @param county
 * @param id
 * @param isDefault
 * @param phone
 * @param province
 * @param type
 * @param userId
 * @returns {Promise<*>}
 */

export const upDateInvoice = ({ account, address, bank, city, companyName, companyTax, county, id, isDefault, phone, province, type, userId }) => ajax('/invoice/update', {
  account,
  address,
  bank,
  city,
  companyName,
  companyTax,
  county,
  id,
  isDefault,
  phone,
  province,
  type,
  userId,
  companyId
}, 'PUT');

/**
 * @method 申请发票
 * @param invoiceApplyRequest
 * @returns {Promise<*>}
 */
export const reqApplyInvoice = invoiceApplyRequest => ajax('/invoice/apply', invoiceApplyRequest, 'POST');

