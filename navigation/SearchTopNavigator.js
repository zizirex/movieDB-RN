import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import NowPlaying from '../screens/NowPlaying';
import Search from '../screens/Search';
import Lists from '../screens/Lists';

const NowPlaying = createStackNavigator({
  NP: NowPlaying,
});

NowPlaying.navigationOptions = {
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

const Search = createStackNavigator({
  Search: Search,
});

Search.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
};

const Lists = createStackNavigator({
  Lists: Lists,
});

Lists.navigationOptions = {
  tabBarLabel: 'Lists',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

export default createBottomTabNavigator({
  NowPlaying,
  Search,
  Lists,
});
