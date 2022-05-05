const init_state = {
  instance: null,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case 'SET_SOCKET':
      return { ...state, instance: action.payload };
    case 'REMOVE_SOCKET':
      return init_state;
    default:
      return state;
  }
};
