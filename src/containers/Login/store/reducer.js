import {
  fromJS,
} from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  isLogin: false,
  user: null,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_USER_INFO: {
      return state.merge(fromJS(action.payload));
    }
    case constants.LOGOUT: {
      return state.merge(fromJS({
        isLogin: false,
        user: {},
      }));
    }
    default:
      break;
  }
  return state.set();
};
