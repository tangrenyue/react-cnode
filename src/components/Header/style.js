import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 50px;
  background: #444;
  header {
    max-width: 1400px;
    overflow: hidden;
    margin: 0 auto;
    .logo {
      width: 120px;
      display: block;
      margin-top: 8px;
      margin-right: 20px;
      float: left;
      img {
        display: block;
        max-width: 100%;
      }
    }
    .input-box {
      float: left;
      margin-top: 12px;
      position: relative;
      &:hover {
        .icon-search {
          transform: scale(-1,1);
        }
      }
      .icon-search {
        position: absolute;
        left: 5px;
        top: 6px;
        transition: all 0.5s;
        font-weight: bold;
      }
      input {
        outline: none;
        box-sizing: border-box;
        padding: 3px 5px 3px 22px;
        color: #666;
        width: 233px;
        height: 26px;
        transition: all 0.5s;
        border: none;
        font-size: 13px;
        line-height: 1;
        border-radius: 15px;
        background: #888;
        &:hover, &:focus {
          background: #fff;
        }
      }
    }
    .right {
      float: right;
      padding-top: 5px;
      .header-item {
        float: right;
        box-sizing: border-box;
        padding: 10px 15px;
        line-height: 20px;
        height: 40px;
        background: transparent;
        outline: none;
        border: none;
        /* line-height: 40px; */
        cursor: pointer;
        color: #ccc;
        font-size: 13px;
        &:hover {
          color: #fff;
        }
      }
    }
  }
`;

export {
  HeaderWrapper as default,
  HeaderWrapper,
};
