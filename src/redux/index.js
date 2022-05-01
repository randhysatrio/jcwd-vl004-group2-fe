import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import adminReducer from './reducers/adminReducer';
import cartReducer from './reducers/cartReducer';
import socketReducer from './reducers/socketReducer';

export default combineReducers({
  user: userReducer,
  adminReducer,
  cart: cartReducer,
  socket: socketReducer,
});
