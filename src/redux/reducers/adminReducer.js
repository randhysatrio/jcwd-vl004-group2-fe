const init_state = {
  id: 0,
  name: '',
  email: '',
  username: '',
  password: '',
  profile_picture: '',
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case 'AUTH_ADMIN':
      return { ...state, ...action.payload };
    case 'ADMIN_LOGOUT':
      return init_state;
    default:
      return state;
  }
};

export default reducer;
