import { GET_VERIFY } from '../mutation-types';
import { reqVerify } from "../../static/api/user";

export default {
  // 获取短信验证码
  async getVerify({ commit }, phone) {
    console.log(phone);
    let res = await reqVerify(0, phone);

    commit(GET_VERIFY, { phone });
  }
}

