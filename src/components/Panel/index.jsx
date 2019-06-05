/**
 * 本组件是对cnode常用样式panel的一个抽象，其由两部分组成，头部和内容区域
 * 头部内容可以自定义内容，也可以仅传一个字符串，作为标题，传字符串时，头部会
 * 自带一个样式，这样增加了本组件的复用性和扩展性，如Topic组件就用了本组件，
 * 由于Topic组件的头部与不同于一般的panel，因此传入一个自定义组件作为header
 * 而AuthorInfo组件的头部，恰好是通用的样式，所以只需要简单的传入一个“作者信息”
 * 的字符串
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const DefaultTitleWrapper = styled.div`
  height: 20px;
  line-height: 20px;
  padding: 10px;
  background-color: #f6f6f6;
  color: #444;
`;

const PanelWrapper = styled.div`
  font-size: 13px;
  background-color: #fff;
`;

export default class Panel extends React.PureComponent {
  static propTypes = {
    header: PropTypes.element,
    title: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    header: null,
    title: '',
    children: [],
  }

  render() {
    const { header, title, children } = this.props;
    // 优先显示传入的header组件，否则才显示字符串标题
    return (
      <PanelWrapper>
        <div className="header">
          {header || <DefaultTitleWrapper>{title}</DefaultTitleWrapper>}
        </div>
        <div className="content">
          {children}
        </div>
      </PanelWrapper>
    );
  }
}
