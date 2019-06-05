import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { HeaderWrapper } from './style';
import logoImg from '../../assets/images/logo.svg';
import { actions as loginActions } from '../../containers/Login/store';

class Header extends React.PureComponent {
  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  }

  render() {
    const { isLogin, logout } = this.props;
    return (
      <HeaderWrapper>
        <header>
          <Link className="logo" to="/">
            <img src={logoImg} alt="logo-cnode" />
          </Link>
          <div className="input-box">
            <i className="iconfont icon-search" />
            <input type="text" />
          </div>
          <div className="right">
            {isLogin
              ? <input type="button" onClick={logout} className="header-item" value="退出登录" />
              : <Link className="header-item" to="/login">登录</Link>}
            <Link className="header-item" to="/">设置</Link>
            <Link className="header-item" to="/">关于</Link>
            <Link className="header-item" to="/">API</Link>
            <Link className="header-item" to="/">新手入门</Link>
            <Link className="header-item" to="/">首页</Link>
          </div>
        </header>
      </HeaderWrapper>
    );
  }
}

const mapDispatch = dispatch => ({
  logout() {
    localStorage.setItem('token', '');
    return dispatch(loginActions.logout());
  },
});

const mapState = $state => ({
  isLogin: $state.getIn(['login', 'isLogin']),
});

export default connect(mapState, mapDispatch)(Header);
