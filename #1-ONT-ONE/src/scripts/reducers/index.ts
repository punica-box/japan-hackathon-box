import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dapi from './components/dapi';
import account from './components/account';

const rootReducer = combineReducers({
  routing: routerReducer,
  dapi,
  account,
});

export default rootReducer;
