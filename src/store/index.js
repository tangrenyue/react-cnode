import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '../containers/Home/store';
import { reducer as detailReducer } from '../containers/Detail/store';
import { reducer as loginReducer } from '../containers/Login/store';


// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducer = combineReducers({
  home: homeReducer,
  detail: detailReducer,
  login: loginReducer,
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
