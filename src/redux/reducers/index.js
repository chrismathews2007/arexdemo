// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  users: userReducer,
  // Add more reducers if needed
});

export default rootReducer;
