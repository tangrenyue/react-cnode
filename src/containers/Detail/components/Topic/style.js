import styled from 'styled-components';

export const TopicContentWrapper = styled.article`
  padding: 10px;
`;

export const TopicHeader = styled.header`
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
  .top {
    display: inline-block;
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 6px;
  }
  .text {
    display: inline-block;
    font-size: 22px;
    font-weight: 700;
    margin: 8px auto;
    height: 31px;
    line-height: 31px;
  }
  .topic-info {
    overflow: hidden;
    .info-item {
      display: inline-block;
      font-size: 12px;
      color: #838383;
      margin-right: 2px;
      &::before {
        content: "•";
        margin-right: 2px;
      }
    }
    .star-btn {
      display: block;
      line-height: 28px;
      float: right;
      padding: 3px 10px;
      color: #fff;
      background-color: #80bd01;
      border-radius: 3px;
      border: none;
      outline: none;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        color: #fff;
        background-color: #6ba44e;
      }
    }
  }
`;

export const ContentWrapper = styled.section`
  padding: 10px;
`;
