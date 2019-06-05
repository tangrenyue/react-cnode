import * as constants from './constants';

import {
  request as req,
} from '../../../utils';

const changeTopic = topic => ({
  type: constants.CHANGE_TOPIC,
  payload: topic,
});

const changeAuthor = authorInfo => ({
  type: constants.CHANGE_AUTHOR,
  payload: authorInfo,
});

export const getTopic = topicId => async (dispatch) => {
  const {
    data,
  } = await req.get(`/topic/${topicId}`);
  if (data.success) {
    return dispatch(changeTopic(data.data));
  }
  throw new Error('请求失败', data);
};

export const getUserInfo = username => async (dispatch) => {
  const {
    data,
  } = await req.get(`/user/${username}`);
  if (data.success) {
    return dispatch(changeAuthor(data.data));
  }
  throw new Error('请求失败', data);
};

export const clearTopicAndAuthor = () => ({
  type: constants.CLEAR_TOPIC_AUTHOR,
});
