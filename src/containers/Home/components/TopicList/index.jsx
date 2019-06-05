import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import * as constants from '../../store/constants';

import Panel from '../../../../components/Panel';
import Loading from '../../../../components/Loading';
import TopicListItem from '../TopicListItem';
import { CustomHeader, TopicListWrapper } from './style';


const TopicList = ({ $curTab, onChangeTab, $list }) => {
  const topicHeader = (
    <CustomHeader>
      {Object.values(constants.TAB).map(tab => (
        <input
          type="button"
          value={tab.label}
          key={tab.label}
          className={$curTab.get('label') === tab.label ? 'active' : ''}
          onClick={() => onChangeTab(tab)}
        />
      ))}
    </CustomHeader>
  );

  const isLoadingList = $list == null;

  return (
    <Panel header={topicHeader}>
      <TopicListWrapper>
        {isLoadingList
          ? <Loading height="800px" />
          : $list.map($topic => <TopicListItem key={$topic.get('id')} $topic={$topic} />)
        }
      </TopicListWrapper>
    </Panel>
  );
};

TopicList.propTypes = {
  $curTab: PropTypes.instanceOf(Map).isRequired,
  $list: PropTypes.instanceOf(List),
  onChangeTab: PropTypes.func.isRequired,
};
TopicList.defaultProps = {
  $list: null,
};

export default TopicList;
