import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { actions } from './store';

import Loading from '../../components/Loading';
import Topic from './components/Topic';
import ReplyList from './components/ReplyList';
import AuthorInfoPanel from './components/AuthorInfoPanel';

class Detail extends PureComponent {
  static propTypes = {
    $topic: PropTypes.instanceOf(Map),
    $author: PropTypes.instanceOf(Map),
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  }

  static defaultProps = {
    $topic: null,
    $author: null,
  }

  async componentDidMount() {
    this.getTopicAndAuthorData();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actions.clearTopicAndAuthor());
  }

  async getTopicAndAuthorData() {
    const {
      dispatch,
      match: {
        params: {
          id,
        },
      },
    } = this.props;

    if (id != null) {
      const actionOfChangeTopic = await dispatch(actions.getTopic(id));
      const {
        payload: {
          author: {
            loginname,
          },
        },
      } = actionOfChangeTopic;
      dispatch(actions.getUserInfo(loginname));
    }
  }

  render() {
    const { $topic, $author } = this.props;
    let isLoading = false;
    if ($topic === null) isLoading = true;
    return (
      <>
        <ContentMainArea>
          {isLoading
            ? <Loading height="100vh" />
            : (
              <>
                <Topic $topic={$topic} />
                <ReplyList $topic={$topic} />
              </>
            )
          }
        </ContentMainArea>
        <ContentAsideArea>
          {isLoading
            ? <Loading height="200px" />
            : <AuthorInfoPanel $author={$author} $topic={$topic} />
          }
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

// 侧边栏区域
const ContentAsideArea = styled.div`
  float: left;
  width: 285px;
  margin-left: -285px;
  position: relative;
  background: red;
`;

const mapState = $state => ({
  $topic: $state.getIn(['detail', 'topic']),
  $author: $state.getIn(['detail', 'author']),
});

export default connect(mapState, null)(Detail);
