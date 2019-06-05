import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import { actions } from './store';

import UserInfoPanel from '../../components/UserInfoPanel';
import TopicList from './components/TopicList';
import Loading from '../../components/Loading';


class Home extends React.PureComponent {
  static propTypes = {
    dispatch: propTypes.func.isRequired,
    curPage: propTypes.number.isRequired,
    limit: propTypes.number.isRequired,
    $curTab: propTypes.instanceOf(Map).isRequired,
    $topicList: propTypes.instanceOf(List),
    $loginInfo: propTypes.instanceOf(Map),
  }

  static defaultProps = {
    $topicList: null,
    $loginInfo: null,
  }

  state = {
    isLoadingMoreList: false,
  }

  componentDidMount() {
    const {
      curPage,
      $topicList,
      dispatch,
      $curTab,
      limit,
    } = this.props;

    if ($topicList != null) this.bindEvents();

    if ($topicList == null) {
      dispatch(actions.getTopicList(curPage, $curTab.get('value'), limit))
        .then(() => {
          this.bindEvents();
        });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infinityLoading);
  }

  getMoreTopics = async () => {
    this.setState({
      isLoadingMoreList: true,
    });
    const {
      curPage,
      dispatch,
      $curTab,
      limit,
    } = this.props;
    await dispatch(actions.getTopicListAndConcat(curPage, $curTab.get('value'), limit));
    dispatch(actions.changeCurPage(curPage + 1));
  }

  infinityLoading = async () => {
    const bottomEl = this.lastElRef;
    if (!bottomEl) return;
    const { scrollTop } = document.documentElement;
    const { clientHeight } = document.documentElement;
    const { offsetTop } = bottomEl;
    if (scrollTop + clientHeight >= (offsetTop * 0.9) && !this.isGettingMoreList) {
      this.isGettingMoreList = true;
      await this.getMoreTopics();
      this.isGettingMoreList = false;
      this.setState({ isLoadingMoreList: false });
    }
  }

  handleOnChangeTab = (tabItem) => {
    const { dispatch } = this.props;
    dispatch(actions.changeCurTab(tabItem));
    const {
      limit,
    } = this.props;
    dispatch(actions.getTopicList(1, tabItem.value, limit));
  }

  bindEvents() {
    window.addEventListener('scroll', this.infinityLoading);
  }

  render() {
    const {
      $topicList,
      $loginInfo,
      $curTab,
    } = this.props;
    const { isLoadingMoreList } = this.state;

    return (
      <>
        <ContentMainArea>
          <TopicList onChangeTab={this.handleOnChangeTab} $curTab={$curTab} $list={$topicList} />
          {isLoadingMoreList ? <Loading height="800px" /> : null}
          <div className="infinity-load" ref={(ref) => { this.lastElRef = ref; }} />
        </ContentMainArea>
        <ContentAsideArea>
          <UserInfoPanel $loginInfo={$loginInfo} />
        </ContentAsideArea>
      </>
    );
  }
}

const ContentMainArea = styled.div`
  float: left;
  padding-right: 300px;
  width: 100%;
  box-sizing: border-box;
`;

const ContentAsideArea = styled.div`
  float: left;
  width: 285px;
  margin-left: -285px;
  position: relative;
  background: red;
`;

const mapState = $state => ({
  $topicList: $state.getIn(['home', 'topicList']),
  $loginInfo: $state.getIn(['login']),
  $curTab: $state.getIn(['home', 'tab']),
  curPage: $state.getIn(['home', 'curPage']),
  limit: $state.getIn(['home', 'limit']),
  isLogin: $state.getIn(['login', 'isLogin']),
});

export default connect(mapState, null)(Home);
