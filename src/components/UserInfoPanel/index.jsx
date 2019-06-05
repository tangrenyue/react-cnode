import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map } from 'immutable';

import Panel from '../Panel';
import Image from '../Image';

const UserInfoWrapper = styled.div`
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

const renderUnlogin = () => (
  <Panel title="用户信息">
    <div style={{
      padding: '10px',
      fontSize: '14px',
    }}
    >
      请点击右上角登录
    </div>

  </Panel>
);

const UserInfoPanel = ({ $loginInfo }) => {
  const isLogin = $loginInfo.get('isLogin');
  const $user = $loginInfo.get('user');

  if (!isLogin) return renderUnlogin();

  return (
    <Panel title="用户信息">
      <UserInfoWrapper>
        <a href="/" className="avatar"><Image src={$user.get('avatar')} alt="avatar" /></a>
        <span className="author-name">{$user.get('name')}</span>
        <div className="author-points">
          积分:
          {$user.get('score')}
        </div>
        <div className="signature">作者很懒，甚至没有实现显示个性签名功能。</div>
      </UserInfoWrapper>
    </Panel>
  );
};

UserInfoPanel.propTypes = {
  $loginInfo: PropTypes.instanceOf(Map).isRequired,
};

export default UserInfoPanel;
