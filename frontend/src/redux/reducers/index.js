import { combineReducers } from 'redux';

import usersReducer from './users';
import alert from './alert';

export default combineReducers({ usersReducer, alert });
