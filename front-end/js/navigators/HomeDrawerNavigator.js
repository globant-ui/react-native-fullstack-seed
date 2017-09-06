// Framework
import React from 'react';
import { DrawerNavigator } from 'react-navigation';

// Components
import DrawBar from '../components/DrawBar';

// Screens
import HomeScreen from '../screens/Home';

// Navigators
import PostsStackNavigator from '../navigators/PostsStackNavigator';

/**
 * @module Drawer
 */

/**
 * @const {func} DrawerBar
 */
const DrawerBar = props => <DrawBar {...props} />;

/**
 * @const {DrawerNavigator} DrawerNav
 */
const DrawerNav = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    PostsNavigator: {
      screen: PostsStackNavigator
    }
  },
  {
    contentComponent: DrawerBar
  }
);
DrawerNav.navigationOptions = {
  header: null
};

export default DrawerNav;