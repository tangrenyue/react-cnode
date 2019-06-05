import React from 'react';
import { Map } from 'immutable';
import propTypes from 'prop-types';
import Panel from '../../../../components/Panel';

import { TopicHeader, TopicContentWrapper } from './style';
import { formatDate, category } from '../../../../utils';

const renderTopicHeader = $topic => (
  <TopicHeader>
    {$topic.get('top')
      ? <div className="top">置顶</div>
      : null
    }
    <h1 className="text">{$topic.get('title')}</h1>
    <div className="topic-info">
      <span className="info-item last-reply-date">
        发布于&nbsp;
        {formatDate($topic.get('create_at'))}
      </span>
      <span className="info-item author">
        作者&nbsp;
        {$topic.getIn(['author', 'loginname'])}
      </span>
      <span className="info-item visit">
        {$topic.get('visit_count')}
        &nbsp;次浏览
      </span>
      <span className="info-item sub">
        来自&nbsp;
        {category($topic.get('tab'))}
      </span>
      <input className="star-btn" type="button" value="收藏" />
    </div>
  </TopicHeader>
);

class Topic extends React.PureComponent {
  static propTypes = {
    $topic: propTypes.instanceOf(Map).isRequired,
  }

  render() {
    const { $topic } = this.props;
    return (
      <Panel header={renderTopicHeader($topic)}>
        <TopicContentWrapper
          dangerouslySetInnerHTML={{ __html: $topic.get('content') }}
          className="markdown-body topic-content"
        />
      </Panel>
    );
  }
}

export default Topic;
