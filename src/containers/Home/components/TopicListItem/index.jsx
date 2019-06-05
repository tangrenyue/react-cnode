import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';


import Image from '../../../../components/Image';
import { formatDate, category } from '../../../../utils';

const TopicListItemWrapper = styled.div`
  padding: 10px;
  height: 30px;
  border-bottom: 1px solid #f0f0f0;
  overflow: hidden;
  &:hover {
    background:  #f6f6f6;
  }
  .avatar {
    float: left;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .reply-visit {
    float: left;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    margin-right: 5px;
    .reply {
      color: #9e78c0;
    }
    .visit {
      font-size: 12px;
      color: #b4b4b4;
    }
  }

  .tab, .top {
    float: left;
    padding: 2px 4px;
    font-size: 12px;
    margin-top: 8px;
    margin-right: 8px;
  }
  .tab {
    color: #999999;
    background: #e5e5e5;
  }
  .top {
    color: #fff;
    background: #80bd01;
  }
  a.title {
    display: block;
    float: left;
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    color: #333;
    height: 30px;
    line-height: 30px;
    &:visited {
      color: #888888;
    }
  }
  .reply-avatar {
    float: right;
    img {
      display: block;
      height: 18px;
      width: 18px;
      margin-top: 6px;
      margin-right: 6px;
    }
  }

  .date {
    float: right;
    color: #778087;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }

`;

const TopicListItem = ({ $topic }) => (
  <TopicListItemWrapper>
    <div className="avatar">
      <Image src={$topic.getIn(['author', 'avatar_url'])} alt="avatar" />
    </div>
    <div className="reply-visit">
      <span className="reply">{$topic.get('reply_count')}</span>
      &nbsp;
      /
      &nbsp;
      <span className="visit">{$topic.get('visit_count')}</span>
    </div>
    {$topic.get('top')
      ? (<div className="top">置顶</div>)
      : (<div className="tab">{category($topic.get('tab'))}</div>)
    }
    <Link className="title" to={`/topic/${$topic.get('id')}`}>{$topic.get('title')}</Link>
    <div className="date">{formatDate($topic.get('last_reply_at'))}</div>
    <div className="reply-avatar"><img src={$topic.getIn(['author', 'avatar_url'])} alt="reply-avatar" /></div>
  </TopicListItemWrapper>
);

TopicListItem.propTypes = {
  $topic: PropTypes.instanceOf(Map).isRequired,
};

export default TopicListItem;
