import {
  fromJS,
} from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  topicList: null,
  curPage: 1, // 下一次将请求topicList的页数，默认为1，即第一次将要请求的topicList是第一页
  tab: constants.TAB.ALL, //  处在什么分类
  limit: 30, // 每次请求返回的topiclist的长度
  mdrender: true, // 是否预渲染返回的markdown文本
  // curRequests: [], // 用于储存当前正在进行的请求
  // source: null, // axios提供的取消请求的对象
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_TOPIC_LIST: {
      const {
        tabValue,
        topicList,
      } = action.payload;
      const curTabValue = state.get('tab').get('value');
      if (!tabValue || tabValue !== curTabValue) return state.set();
      const hasTopicList = state.get('topicList') != null;
      if (hasTopicList) return state.set('topicList', state.get('topicList').concat(fromJS(topicList)));
      // 如果已经有了topicList就进行连接操作，否则就设置成返回的新的topicList
      return state.set('topicList', fromJS(topicList));
    }
    case constants.SET_TOPIC_LIST: {
      const {
        tabValue,
        topicList,
      } = action.payload;
      const curTabValue = state.get('tab').get('value');
      if (!tabValue || tabValue !== curTabValue) return state.set();
      // 需要判断新的topicList是否是当前tab下的，不是的话直接丢掉，
      // 这是防止后起的请求的action由于网速问题被前起的action顶掉
      return state.set('topicList', fromJS(topicList));
    }
    case constants.CONCAT_TOPIC_LIST: {
      const {
        tabValue,
        topicList,
      } = action.payload;
      const curTabValue = state.get('tab').get('value');
      if (!tabValue || tabValue !== curTabValue) return state.set();
      // 同样需要判断新的topicList是否是当前tab下的，不是的话直接丢掉，
      // 当你快速下拉，又切换了tab时，如果tab的请求够快，就会导致不同tab下的帖子列表进行连接
      const hasTopicList = state.get('topicList') != null;
      if (hasTopicList) return state.set('topicList', state.get('topicList').concat(fromJS(topicList)));
      throw new Error('请确定topicList != null时再进行连接操作');
    }
    case constants.CHANGE_CUR_TAB: {
      return state.set('tab', fromJS(action.payload));
    }
    case constants.CLEAR_TOPIC_LIST: {
      return state.merge({
        topicList: null,
        curPage: 1,
      });
    }
    case constants.CHANGE_CUR_PAGE: {
      return state.set('curPage', action.payload);
    }
    default:
      break;
  }
  return state.set();
};
