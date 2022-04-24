const init_state = {
  cartList: [],
  total_data: 0,
  total_page: 0,
  active_page: 0,
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case 'CART_LIST':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
