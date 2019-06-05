import {
  request as req,
} from '../../../utils';
import * as constants from './constants';

export const changeLoginInfo = info => ({
  type: constants.CHANGE_USER_INFO,
  payload: info,
});

export const logout = () => ({
  type: constants.LOGOUT,
});

export const loginWithToken = token => async (dispatch) => {
  const {
    data,
  } = await req.post('/accesstoken ', {
    accesstoken: token,
  });
  const {
    success,
    loginname,
    id,
    // eslint-disable-next-line camelcase
    avatar_url,
  } = data;
  if (success) {
    const loginStatus = {
      isLogin: true,
      user: {
        name: loginname,
        avatar: avatar_url,
        id,
      },
    };
    localStorage.setItem('token', token);

    localStorage.setItem('status', JSON.stringify(loginStatus));
    // 增加本地登录缓存
    dispatch(changeLoginInfo(loginStatus));
  } else {
    localStorage.clear('token');
    // 失败直接清空缓存，防止重复请求
  }
};

export const validateToken = token => async (dispatch) => {
  try {
    await req.post('/accesstoken ', {
      accesstoken: token,
    });
    // 因为不合法的token直接会导致thorw 404的error，所以没必要用变量接受判断
  } catch (err) {
    dispatch(logout());
    // 检验失败，清空登录信息
  }
};
