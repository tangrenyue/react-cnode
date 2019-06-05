import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Home from './Home';
import Detail from './Detail';
import Login from './Login';
import ScrollToTop from '../components/ScrollToTop';
import { actions as loginActions } from './Login/store';
import store from '../store';

class App extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initLoginStatus();
  }

  initLoginStatus() {
    const localToken = localStorage.getItem('token');
    if (!localToken) return;
    const { dispatch } = this.props;
    const localLoginStatus = JSON.parse(localStorage.getItem('status'));
    dispatch(loginActions.validateToken(localToken));
    dispatch(loginActions.changeLoginInfo(localLoginStatus));
  }

  render() {
    return (
      <HashRouter>
        <ScrollToTop>
          <IndexWrapper>
            <Header />
            <MainContentWrapper className="main-content-wrapper">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/topic/:id" exact component={Detail} />
                <Route path="/login" exact component={Login} />
              </Switch>
            </MainContentWrapper>
          </IndexWrapper>
        </ScrollToTop>
      </HashRouter>
    );
  }
}

const IndexWrapper = styled.div`
  min-height: 100vh;
  background: #e1e1e1;
`;

const MainContentWrapper = styled.div`
  margin: 0 auto;
  padding: 15px 0;
  overflow: hidden;
  width: 90%;
`;

const ConnectedApp = connect(null, null)(App);

const WrapperApp = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>

);


export default WrapperApp;
