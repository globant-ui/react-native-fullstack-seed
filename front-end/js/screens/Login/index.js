// Framework 
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';
import {
  Container,
  Content,
  View,
  Text
} from 'native-base';

// Actions

// Components
import LoginForm from './LoginForm';
import LoginButton from './LoginButton';

// Styles
import styles from './styles';

// Background image
const background = require('../../../images/logo.png');

/**
 * <p>This is rendered when the user has not entered his credentilas
 * or when he logs out.</p>
 */
class Login extends Component {
  /**
   * All properties passed to this components must be added here
   */
  static propTypes = {
    error: PropTypes.string,
    navigation: PropTypes.object,
    clearError: PropTypes.func
  };

  /**
   * Renders the component using NativeBase components
   */
  render() {
    const { navigation, error } = this.props;
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <ImageBackground source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Text>{error}</Text>
                <LoginForm />
                <LoginButton nav={ navigation } />
              </View>
            </ImageBackground>
          </Content>
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}
const mapStateToProps = state => ({
  error: state.login.error
});

export default connect(mapStateToProps)(Login);
