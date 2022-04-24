import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import adminReducer from './reducers/adminReducer';
import cartReducer from './reducers/cartReducer';

export default combineReducers({
  user: userReducer,
  adminReducer,
  cart: cartReducer,
});
