import styled from 'styled-components';

export const ReplyWrapper = styled.div`
  overflow: hidden;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
  .reply-content-wrapper {
    float: left;
    width: 100%;
    .reply-content {
      margin-left: 40px;
      margin-right: 50px;
      font-size: 12px;
      .reply-info-item {
        margin-right: 4px;
      }
      .reply-author {
        color: #666;
        font-weight: 700;
      }
      .reply-date {
        color:  #08c;
        font-size: 11px;
      }
      .reply-is-author {
        color: #fff;
        background-color: #6ba44e;
        padding: 2px;
      }
      .content {
        padding: 10px;
      }
    }
  }

  .avatar {
    float: left;
    width: 30px;
    height: 30px;
    margin-left: -100%;
  }
  .addition {
    float: left;
    width: 50px;
    margin-left: -50px;
  }
`;

export const ReplyListWrapper = styled.div`
  background: #fff;
`;
