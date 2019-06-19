export function goodList(state) {
  return state.goodList.map(item => {
    console.log(item);
    switch (item.status) {
      case 2:
        item.badge = '低库存';
        break;
      case 9:
        item.badge = '失效';
        break;
    }
    return item
  });
}
