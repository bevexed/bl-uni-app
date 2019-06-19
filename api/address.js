import ajax from './ajax'

/**
 * @function 新增收货地址
 * @param addressee {string} 联系人
 * @param city {string} 城市
 * @param companyId {number}  4
 * @param gmtCreate {data} 创建时间
 * @param isMain {boolean} 是否默认
 * @param other {string} 详细
 * @param phone {string} 电话
 * @param province {string} 省
 * @param userId {string}
 */

export const reqAddAddress = ({ addressee, city, county, companyId = 4, isMain, other, phone, province, userId }) =>
  ajax('/address', { addressee, city, county, companyId, isMain, other, phone, province, userId }, 'POST');
