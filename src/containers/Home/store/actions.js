
import axios from 'axios';

import * as constants from './constants';
import {
  request as req,
} from '../../../utils';

export const clearTopicList = () => ({
  type: constants.CLEAR_TOPIC_LIST,
});


const setTopicList = (topicList, tabValue) => ({
  type: constants.SET_TOPIC_LIST,
  payload: {
    tabValue,
    topicList,
  },
});

const concatTopicList = (topicList, tabValue) => ({
  type: constants.CONCAT_TOPIC_LIST,
  payload: {
    tabValue,
    topicList,
  },
});

export const changeCurPage = newPage => ({
  type: constants.CHANGE_CUR_PAGE,
  payload: newPage,
});


const { CancelToken } = axios;
let source = CancelToken.source();
let preTopicRequests = [];
export const getTopicList = (page, tabValue, limit, mdrender = true) => async (dispatch) => {
  if (preTopicRequests.length) { // 表示以前tab下的存在请求，不论是已完成还是未完成的
    source.cancel('取消前tab下的请求');
    source = CancelToken.source(); // 获得新的source，否则新的tab请求也会被取消掉
    preTopicRequests = [];
  }
  dispatch(clearTopicList());
  dispatch(changeCurPage(2));
  // 表示如果再有请求，要请求第二页的帖子列表，因为本方法只用于请求第一页，所以这里写死了2
  const request = req.get('/topics', {
    cancelToken: source.token,
    params: {
      page,
      limit,
      mdrender,
      tab: tabValue,
    },
  });
  preTopicRequests.push(request);
  try {
    const { data } = await request;
    if (data.success) {
      return dispatch(setTopicList(data.data, tabValue));
    }
    throw new Error('请求失败', data);
  } catch (err) {
    // eslint-disable-next-line no-console
    if (axios.isCancel(err)) console.log('成功取消过期请求');
  }
  return request;
};

export const getTopicListAndConcat = (
  page,
  tabValue,
  limit,
  mdrender = true,
) => async (dispatch) => {
  dispatch(changeCurPage(page + 1));
  const request = req.get('/topics', {
    cancelToken: source.token,
    params: {
      page,
      limit,
      mdrender,
      tab: tabValue,
    },
  });
  preTopicRequests.push(request);
  try {
    const { data } = await request;
    if (data.success) {
      return dispatch(concatTopicList(data.data, tabValue));
    }
    throw new Error('请求失败', data);
  } catch (err) {
    // eslint-disable-next-line no-console
    if (axios.isCancel(err)) console.log('成功取消过期请求');
  }
  return request;
};

export const changeCurTab = tab => ({
  type: constants.CHANGE_CUR_TAB,
  payload: tab,
});
