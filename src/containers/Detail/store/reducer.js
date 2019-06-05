import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  topic: null,
  author: null,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_TOPIC: {
      return state.set('topic', fromJS(action.payload));
    }
    case constants.CHANGE_AUTHOR: {
      return state.set('author', fromJS(action.payload));
    }
    case constants.CLEAR_TOPIC_AUTHOR: {
      return state.merge(fromJS({
        topic: null,
        author: null,
      }));
    }
    default: break;
  }
  return state.set();
};
