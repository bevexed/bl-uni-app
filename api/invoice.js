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

export const reqInvoiceList = () => ajax('/invoice', {}, 'GET');

