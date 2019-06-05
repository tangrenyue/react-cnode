import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loading from '../Loading';

const ImageWrapper = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  img.inner-img {
    max-width: 100%;
    height: auto;
  }
`;

class Image extends React.PureComponent {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    height: PropTypes.string,
    width: PropTypes.string,
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
  };

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { imgEl } = this;
    const { src } = this.props;
    imgEl.src = src;
    imgEl.onload = () => {
      this.setState({
        isLoading: false,
      });
    };
  }

  componentWillUnmount() {
    const { imgEl } = this;
    imgEl.onload = null;
  }


  render() {
    const { isLoading } = this.state;
    const { height, width, alt } = this.props;
    return (
      <ImageWrapper height={height} width={width} className="image">
        {isLoading ? <Loading height={height} /> : null}
        <img
          className="inner-img"
          style={{
            display: isLoading ? 'none' : 'block',
          }}
          alt={alt}
          ref={(ref) => { this.imgEl = ref; }}
        />
      </ImageWrapper>
    );
  }
}

export default Image;
