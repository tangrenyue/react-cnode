import styled from 'styled-components';

export const TopicListWrapper = styled.div`
background: #fff;
`;

export const CustomHeader = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  background: #f6f6f6;
  padding: 10px;
  height: 40px;
  input[type=button] {
    float: left;
    display: block;
    font-size: 14px;
    border: none;
    color: #80bd01 !important;
    margin: 0 10px;
    padding: 3px 4px;
    cursor: pointer;
    background: transparent;
    outline: none;
    &.active {
      background: #80bd01;
      color: #fff !important;
      border-radius: 3px;
    }
  }
`;
