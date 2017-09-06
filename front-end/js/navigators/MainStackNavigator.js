// Framework
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

// Navigator
import HomeDrawerNavigator from './HomeDrawerNavigator';

// Screens
import Login from '../screens/Login';

/**
 * @module StackRouter
 */

/**
 * Refer to <a href="https://reactnavigation.org/docs/navigators/stack">Stack navigator</a>
 * @const
 */
export const MainStackNavigator = StackNavigator({
  Login: { screen: Login },
  HomeDrawer: { screen: HomeDrawerNavigator }
}, { headerMode: 'screen' });

class MainStackNavigatorComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    nav: PropTypes.object
  };

  render() {
    const { dispatch, nav } = this.props;
    return <MainStackNavigator navigation={addNavigationHelpers({
      dispatch: dispatch,
      state: nav,
    })} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(MainStackNavigatorComponent);