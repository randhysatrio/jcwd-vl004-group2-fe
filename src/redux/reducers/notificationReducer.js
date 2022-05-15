const init_state = {
  alert: false,
  awaiting: false,
  history: false,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case 'ALERT_NEW':
      return { ...state, [action.payload]: true };
    case 'ALERT_CLEAR':
      return { ...state, [action.payload]: false };
    default:
      return init_state;
  }
};
