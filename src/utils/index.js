import axios from 'axios';

const request = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
});

const category = function filterCategory(str) {
  switch (str) {
    case 'ask':
      return '问答';
    case 'share':
      return '分享';
    case 'job':
      return '招聘';
    case 'good':
      return '精华';
    default:
      return '';
  }
};

const formatDate = function formatTime(str) {
  const date = new Date(str);
  const time = new Date().getTime() - date.getTime();
  if (time < 0) {
    return '';
  } if ((time / 1000 < 30)) {
    return '刚刚';
  } if (time / 1000 < 60) {
    return `${parseInt((time / 1000), 10)}秒前`;
  } if ((time / 60000) < 60) {
    return `${parseInt((time / 60000), 10)}分钟前`;
  } if ((time / 3600000) < 24) {
    return `${parseInt(time / 3600000, 10)}小时前`;
  } if ((time / 86400000) < 31) {
    return `${parseInt(time / 86400000, 10)}天前`;
  } if ((time / 2592000000) < 12) {
    return `${parseInt(time / 2592000000, 10)}月前`;
  }
  return `${parseInt(time / 31536000000, 10)}年前`;
};

export {
  request,
  formatDate,
  category,
};
