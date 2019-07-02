// 所有商品总价
export const total = state => state.item.reduce((pre, cur) =>
  pre + (cur.price * cur.shoppingNum + cur.sampleType * cur.samplePrice), 0).toFixed(2);
