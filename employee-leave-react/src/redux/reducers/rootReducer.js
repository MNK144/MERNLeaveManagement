import { combineReducers } from 'redux';
import AuthReducer from './auth';
import LeaveReducer from './leave';

const RootReducer = combineReducers({
  AuthReducer,
  LeaveReducer,
});

export default RootReducer;
