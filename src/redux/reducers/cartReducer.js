const init_state = {
  total_data: 0,
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case 'CART_LIST':
      return { ...state, total_data: action.payload };
    default:
      return state;
  }
};

export default reducer;
