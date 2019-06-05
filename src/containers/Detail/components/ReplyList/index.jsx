import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Image from '../../../../components/Image';
import Panel from '../../../../components/Panel';
import { ReplyWrapper, ReplyListWrapper } from './style';
import { formatDate } from '../../../../utils';

const renderReply = ($reply, index, $topicAuthor) => {
  const replyAuthorName = $reply.getIn(['author', 'loginname']);
  const isAuthor = replyAuthorName === $topicAuthor.get('loginname');
  return (
    <ReplyWrapper className="reply-list-item" key={$reply.get('id')}>
      <div className="reply-content-wrapper">
        <div className="reply-content">
          <span className="reply-info-item reply-author">{$reply.getIn(['author', 'loginname'])}</span>
          <span className="reply-info-item reply-date">
            {index + 1}
            楼•
            {formatDate($reply.get('create_at'))}
          </span>
          {isAuthor
            ? (<span className="reply-info-item reply-is-author">作者</span>)
            : null
          }
          <div
            className="content markdown-body"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: $reply.get('content') }}
          />
        </div>
      </div>
      <div className="avatar">
        <Image
          src={$reply.getIn(['author', 'avatar_url'])}
          alt="reply-avtar"
        />
      </div>
      <div className="addition">
        <i className="iconfont icon-reply" />
        <i className="iconfont icon-lie" />
      </div>
    </ReplyWrapper>
  );
};

class ReplyList extends React.PureComponent {
  static propTypes = {
    $topic: PropTypes.instanceOf(Map).isRequired,
  }

  render() {
    const { $topic } = this.props;
    const $replies = $topic.get('replies');
    return (
      <Panel title={`${$replies.size} 回复`}>
        <ReplyListWrapper>
          {$replies.map(($reply, index) => renderReply($reply, index, $topic.get('author')))}
        </ReplyListWrapper>
      </Panel>
    );
  }
}

export default ReplyList;
