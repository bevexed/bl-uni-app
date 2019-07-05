import {
  ADD_INVOICE,
  GET_INVOICE_APPLY_REQUEST,
  GET_INVOICE_DETAIL,
  GET_INVOICE_LIST
} from '../mutation-types';

import {
  changInvoiceDetail,
  reqAddInvoice, reqApplyInvoice, reqDeleteIncoice, reqInvoiceDetail, reqInvoiceList, upDateInvoice
} from "../../api/invoice";

import { MSG_BACK, MSG_TO, SHOW_MODAL, SMG } from "../../utils";

export const addInvoice = async ({ dispatch }, data) => {
  const { account, address, bank, city, companyName, companyTax, county, isDefault, phone, province, type, userId } = data;
  if (!type) {
    return SMG('请选择开票状态')
  }


  if (type === '普票') {
    if (!companyName) {
      SMG('请输入企业名称');
      return
    }
    if (!companyTax) {
      SMG('请输入税号');
      return
    }
    data = { companyName, companyTax, type, userId, isDefault }
  } else if (type === '专票') {
    if (!account) {
      SMG('请输入开户账号');
      return
    }

    if (!city || !county || !province) {
      SMG('请选择地址');
      return
    }

    if (!address) {
      SMG('请填写详细地址');
      return
    }

    if (!bank) {
      SMG('请选择开户银行');
      return
    }

    let p = /^1\d{10}$/;
    if (!p.test(phone)) {
      SMG('请检查手机号');
      return
    }

    if (!companyName) {
      SMG('请输入企业名称');
      return
    }
    if (!companyTax) {
      SMG('请输入税号');
      return
    }
  }

  let res = await reqAddInvoice(data);
  if (res.code === 200) {
    MSG_BACK({
      title:'添加成功'
    });
  }
};

export const getInvoiceList = async ({ commit }) => {
  let res = await reqInvoiceList();
  if (res.code === 200) {
    commit(GET_INVOICE_LIST, res)
  }
};

export const getInvoiceDetail = async ({ commit }, id) => {
  let res = await reqInvoiceDetail(id);
  if (res.code === 200) {
    commit(GET_INVOICE_DETAIL, res)
  }
};

export const invoiceDetail = async ({ dispatch }, id) => {
  let res = await changInvoiceDetail(id);
  if (res.code === 200) {
    await dispatch('getInvoiceList');
    uni.showToast({
      title: '修改成功'
    })
  }
};

export const doUpdateInvoice = async ({}, data) => {
  const { account, address, bank, city, companyName, companyTax, county, isDefault, phone, province, type, userId, id } = data;

  if (type === '普票') {
    if (!companyName) {
      SMG('请输入企业名称');
      return
    }
    if (!companyTax) {
      SMG('请输入税号');
      return
    }
    data = { companyName, companyTax, type, userId, isDefault, id }
  } else if (type === '专票') {
    if (!account) {
      SMG('请输入开户账号');
      return
    }

    if (!city || !county || !province) {
      SMG('请选择地址');
      return
    }

    if (!address) {
      SMG('请填写详细地址');
      return
    }

    if (!bank) {
      SMG('请选择开户银行');
      return
    }

    let p = /^1\d{10}$/;
    if (!p.test(phone)) {
      SMG('请检查手机号');
      return
    }

    if (!companyName) {
      SMG('请输入企业名称');
      return
    }
    if (!companyTax) {
      SMG('请输入税号');
      return
    }
  }

  let res = await upDateInvoice(data);

  if (res.code === 200) {
    MSG_BACK({
      title: '修改成功'
    })
  }


};

export const applyInvoice = async ({ commit, state }, orderId) => {
  const { invoiceApplyRequest } = state;
  const { address, invoiceId } = invoiceApplyRequest;

  if (!address) {
    SMG('请选择地址');
    return
  }

  if (!invoiceId) {
    SMG('请选择发票信息');
    return
  }

  let res = await reqApplyInvoice({ ...invoiceApplyRequest, orderId });
  if (res.code === 200) {
    uni.showToast({
      title: '申请成功',
      mask: true,
      success(res) {
        setTimeout(() => {
          uni.redirectTo({
            url: '/pages/order/order'
          })
        }, 2000)
      }
    })
  }
};


export const getInvoiceApplyRequest = ({ commit }, data) => {
  commit(GET_INVOICE_APPLY_REQUEST, data)
};


export const deleteInvoice = async ({ dispatch }, data) => {
  SHOW_MODAL({
    title: '删除开票信息',
    content: '确定要删除该信息吗?',
    confirmText: '删除',
    confirmColor: '#f00',
    async confirm() {
      let res = await reqDeleteIncoice(data);
      if (res.code === 200) {
        await dispatch('getInvoiceList');
        uni.showToast({title:'删除成功'})
      }
    }
  })

};
