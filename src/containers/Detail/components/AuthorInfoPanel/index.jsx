import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Map } from 'immutable';

import Image from '../../../../components/Image';
import Loading from '../../../../components/Loading';
import Panel from '../../../../components/Panel';

const AuthorInfoWrapper = styled.div`
  padding: 10px;
  font-size: 14px;
  background-color: #fff;
  .avatar {
    display: inline-block;
    height: 48px;
    width: 48px;
    margin-right: 10px;
    vertical-align: middle;
    img {
      max-width: 100%;
      display: block;
    }
  }
  .author-name {
    color: #778087;
    font-size: 16px;
    vertical-align: middle;
  }

  .author-points{
    margin-top: 10px;
  }

  .signature {
    font-style: italic;
    font-size: 12px;
    margin-top: 10px;
  }
`;

class AuthorInfoPanel extends React.PureComponent {
  static propTypes = {
    $topic: propTypes.instanceOf(Map),
    $author: propTypes.instanceOf(Map),
  };

  static defaultProps = {
    $author: null,
    $topic: null,
  };

  render() {
    const { $topic, $author } = this.props;
    let isLoadingAuthorDetali = false;
    let isLoading = false;
    const $topicAuthor = $topic.get('author');
    if ($topic == null) {
      isLoading = true;
      isLoadingAuthorDetali = true;
    } else if ($author == null) isLoadingAuthorDetali = true;

    if (isLoading) return <Loading height="200px" />;

    return (
      <Panel title="作者">
        <AuthorInfoWrapper>
          <a href="/" className="avatar"><Image src={$topicAuthor.get('avatar_url')} alt="avatar" /></a>
          <span className="author-name">{$topicAuthor.get('loginname')}</span>
          <div className="author-points">
            {isLoadingAuthorDetali
              ? <Loading height="10px" />
              : `积分:${$author.get('score')}`
            }
          </div>

          <div className="signature">作者很懒，甚至没有实现显示个性签名功能。</div>
        </AuthorInfoWrapper>
      </Panel>
    );
  }
}

export default AuthorInfoPanel;
