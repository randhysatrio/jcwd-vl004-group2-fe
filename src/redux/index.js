import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import adminReducer from './reducers/admin';

export default combineReducers({
  user: userReducer,
  adminReducer,
});
