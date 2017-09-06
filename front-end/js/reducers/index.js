import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import navReducer from './nav';
import drawer from './drawer';
import user from './user';
import list from './list';
import login from './login';
import auth from './auth';

export default combineReducers({
  nav: navReducer,
  form: formReducer,
  auth,
  drawer,
  user,
  list,
  login
});
