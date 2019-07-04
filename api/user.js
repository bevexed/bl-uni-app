import ajax from './ajax.js';
import { companyId } from "./ajax";

/**
 * 校验用户是否注册
 * @param {Number} companyId
 * @param {String} phone
 * */

export const reqIsExist = ({ phone }) => ajax(`/user/isExist/${ companyId }/${ phone }`, {}, 'GET');

/**
 * 验证码发送
 * @param {Number} companyId
 * @param {String} phone
 */

export const reqVerify = ({ phone }) => ajax('/user/verify', {
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

export const reqLogin = ({ job, custName, phone, verify, avatar, nickname}) => ajax('/user/login', {
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
 * */

export const reqChangeUser = ({ id, email, sex, job, phone, verify, avatar, nickName, username, birthday, custName }) =>
  ajax('/user', {
    id,
    companyId,
    email,
    job,
    phone,
    verify,
    avatar,
    nickName,
    birthday,
    sex,
    username,
    custName
}, 'PUT');

/**
 * @function 验证码 检查
 * @param phone
 * @param verify
 * @returns {Promise<*>}
 */
export const reqCheckVerify = ({ phone, verify }) => ajax('/user/checkVerify/' + phone + '/' + verify, {}, 'GET');

/**
 * @function 修改用户手机号
 * @param phone
 * @param verify
 * @returns {Promise<*>}
 */
export const reqUpdatePhone = ({ phone, verify }) => ajax('/user/' + phone + '/' + verify, {}, 'PUT');

export const reqConfigureCollection = () => ajax(`/configureCollection/${ companyId }`, {}, 'GET');

export const reqFunctionSetting = () => ajax('/functionSetting', {}, 'GET');
