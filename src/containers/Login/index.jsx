import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { actions } from './store';

import Panel from '../../components/Panel';


const LoginWrapper = styled.div`
  background-color: #fff;
  padding: 30px 0;
  .token {
    display: block;
    margin: 0 auto;
    width: 80%;
    height: 40px;
    box-sizing: border-box;
    border: none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
  }
  .login {
    width: 80%;
    height: 40px;
    display: block;
    margin: 0 auto;
    margin-top: 40px;
    background-color: #80bd01;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    &:hover {
      background: #6ba44e;
    }
  }
`;

class Login extends PureComponent {
  static propTypes = {
    loginByToken: PropTypes.func.isRequired,
    isLogin: PropTypes.bool.isRequired,
  }

  state = {
    token: '',
  }

  componentDidMount() {
    const { loginByToken } = this.props;
    const token = localStorage.getItem('token');
    if (token) loginByToken(token);
  }

  render() {
    const { token } = this.state;
    const { loginByToken, isLogin } = this.props;
    if (isLogin) return <Redirect to="/" />;
    return (
      <>
        <Panel title="登录">
          <LoginWrapper>
            <input value={token} onChange={evt => this.setState({ token: evt.target.value })} className="token" type="text" placeholder="access-token" />
            <input onClick={() => loginByToken(token)} className="login" type="button" value="登录" />
          </LoginWrapper>
        </Panel>
      </>
    );
  }
}


const mapState = $state => ({
  isLogin: $state.getIn(['login', 'isLogin']),
});

const mapDispatch = dispatch => ({
  loginByToken(token) {
    return dispatch(actions.loginWithToken(token));
  },
});

export default connect(mapState, mapDispatch)(Login);
