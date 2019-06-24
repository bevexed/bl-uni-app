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
 * @param  companyId {Number}
 * @param  custName  {String}
 * @param  job       {String}
 * @param  phone     {String}
 * @param  verify    {String}
 * @param  avatar    {String}
 * @param  nickname  {String}
 * @param id
 * */

export const reqChangeUser = ({ id, sex, job, phone, verify, avatar, nickname, birthday }) => ajax('/user', {
  id,
  companyId,
  job,
  phone,
  verify,
  avatar,
  nickname,
  birthday,
  sex
}, 'PUT');
