const init_state = {
  cartTotal: 0,
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case 'CART_TOTAL':
      return { ...state, cartTotal: action.payload };
    default:
      return state;
  }
};

export default reducer;
