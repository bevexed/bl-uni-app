export function addressList(state) {
  return state.addressList.map(item => {
    item.default = item.isMain;
    return item
  });
}
