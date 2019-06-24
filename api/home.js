import ajax, { _companyId } from './ajax'

/**
 * 首页 '/pages/home/home
 */


/**
 * @function banner
 *
 */

export const getAd = ({ company = 4 }) => ajax('/configure/banner/ad', { company }, 'GET');


/**
 * @function 获取首页 banner 图
 * @param companyId {number} 4
 * @param type {Number} 通过type获取banner图,1：首页banner图；2：第二屏banner图；3：第三屏banner图
 */

export const reqHomeBanner = ({ type }) => ajax('/homeBanner', { _companyId, type }, 'GET');
