const init_state = {
  id: 0,
  name: '',
  email: '',
};

export default (state = init_state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, id: action.payload.id, name: action.payload.name, email: action.payload.email };
    case 'USER_LOGOUT':
      return init_state;
    default:
      return state;
  }
};
