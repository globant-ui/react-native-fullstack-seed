import React from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import {
  Button,
  Text
} from 'native-base';

import LOGIN_MUTATION from '../../graphql/auth.mutation';
import { showError, clearErrors, storeToken } from '../../actions/login';

// Styles
import styles from './styles';

LoginButton.propTypes = {
  login: PropTypes.func
};

function LoginButton({ login }) {
  return (
    <Button style={ styles.btn } onPress={ login }>
      <Text>Login</Text>
    </Button>
  );
}

const withLoginButton = graphql(LOGIN_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    login () {
      ownProps.clearErrors();
      return mutate({ variables: { email: ownProps.email, password: ownProps.password } }).then(
        ({data: { login: { jwt }}}) => {
          ownProps.storeToken(jwt);
          const navigateAction = NavigationActions.navigate({
            routeName: 'Home',
            params: {}
          })
          ownProps.nav.dispatch(navigateAction);          
        }
      ).catch(error => ownProps.showError(error))
    }
  }),
});
const LoginButtonWithData = withLoginButton(LoginButton);
const LoginButtonWithDataAndState = connect(
  (state) => { 
    return {
      email: state.form.loginForm.values ? state.form.loginForm.values.email : null,
      password: state.form.loginForm.values ? state.form.loginForm.values.password : null
    } 
  },
  (dispatch) => ({
    showError(error) {
      dispatch(showError(error));
    },
    clearErrors() {
      dispatch(clearErrors());
    },
    storeToken(token) {
      dispatch(storeToken(token));
    }
  }),
)(LoginButtonWithData);

export default LoginButtonWithDataAndState;