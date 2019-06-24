import ajax from './ajax'

/**
 * @function 申请合同
 * @param orderId
 * @returns {Promise<*>}
 */
export const reqApplyContract = orderId => ajax('/contract/' + orderId, {}, 'POST');

/**
 * @function 获取合同
 * @param orderId
 * @returns {Promise<*>}
 */
export const reqContractDetail = orderId => ajax('/contract/' + orderId, {}, 'GET');
