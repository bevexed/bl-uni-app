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
}, 'POST');

/**
 * @function 用户登录
 * @param  companyId {Number}
 * @param  custName  {String}
 * @param  job       {String}
 * @param  phone     {String}
 * @param  verify    {String}
 * @param  avatar    {String}
 * @param  nickname  {String}
 * */

export const reqLogin = ({ job, custName, phone, verify, avatar, nickname, companyId = 4 }) => ajax('/user/login', {
  job, custName, companyId, phone, verify, avatar, nickname
}, 'POST');

/**
 * @function 实时获取用户信息
 * */
export const reqCurrentUserDetail = () => ajax('/user/currentUserDetail',{},'GET');

/**
 * @function 刷新 token
 * */
export const reqRefreshToken = () => ajax('/user/refreshToken', {}, 'GET');

/**
 * @function 修改用户信息
 * @param  companyId {Number}
 * @param  custName  {String}
 * @param  job       {String}
 * @param  phone     {String}
 * @param  verify    {String}
 * @param  avatar    {String}
 * @param  nickname  {String}
 * */

// todo:修改 用户信息
export const reqUser = ({ data }) => ajax('/user', { data }, 'PUT');
