import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import adminReducer from './reducers/adminReducer';
import cartTotalReducer from './reducers/cartTotalReducer';
import socketReducer from './reducers/socketReducer';
import notificationReducer from './reducers/notificationReducer';

export default combineReducers({
  user: userReducer,
  adminReducer,
  cartTotal: cartTotalReducer,
  socket: socketReducer,
  notification: notificationReducer,
});
