import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import NowPlaying from '../screens/NowPlaying';
import Search from '../screens/Search';
import Lists from '../screens/Lists';

const NowPlay = createStackNavigator({
  NowPlay: NowPlaying,
});

NowPlay.navigationOptions = {
  tabBarLabel: 'Now Playing',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-play`
          : 'md-play'
      }
    />
  ),
};

const search = createStackNavigator({
  search: Search,
});

search.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
};

const lists = createStackNavigator({
  lists: Lists,
});

lists.navigationOptions = {
  tabBarLabel: 'Lists',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

export default createBottomTabNavigator({
  NowPlay,
  search,
  lists,
});
