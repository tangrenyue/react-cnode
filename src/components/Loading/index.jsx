import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
width: 100%;
height: ${props => props.height || '100%'};
  @keyframes loding {
    0% {
      background: #e7e7e7;
    }

    50% {
      background: #ccc;
    }

    100% {
      background: #e7e7e7;
    }
  }

  animation: loding 1.4s infinite;
`;

const Loading = props => (<LoadingWrapper {...props} />);

export default Loading;
