import ajax from './ajax.js';

/**
 * 校验用户是否注册
 * @param {Number} companyId
 * @param {String} phone
 * */

export const reqIsExist = ({ phone, companyId = 4 }) => ajax(`/user/isExist/${ companyId }/${ phone }`, {}, 'GET');

/**
 * 验证码发送
 * @param {Number} companyId
 * @param {String} phone
 */

export const reqVerify = ({ phone, companyId = 4 }) => ajax('/user/verify', {
  companyId,
  phone
});

/**
 * 用户登录
 * @param {Number} companyId
 * @param {String} custName
 * @param {String} job
 * @param {String} phone
 * @param {String} verify
 * @param {String} avatar
 * @param {String} nickname
 * */

export const reqLogin = ({ job, custName, phone, verify, avatar, nickname, companyId = 4 }) => ajax('/user/login', {
  job, custName, companyId, phone, verify, avatar, nickname
});

/**
 * 实时获取用户信息
 * */
export const reqCurrentUserDetail = () => ajax('/user/currentUserDetail',{},'GET');

/**
 * 刷新 token
 * */
export const reqRefreshToken = () => ajax('/user/refreshToken', {}, 'GET');
