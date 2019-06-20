// 所有商品总价
export const total = state => state.item.reduce((pre, cur) => pre + cur.totalAmount, 0);
