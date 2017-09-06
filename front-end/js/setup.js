
// Framework
import React, { Component } from 'react';
import { StyleProvider } from 'native-base';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { some } from 'lodash';

// Application
import App from './App';
import configureStore from './configureStore';

// Actions
import { logout } from './actions/auth';

// Themes
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

/**
 * @module Setup
 */

const store = configureStore();

const networkInterface = createNetworkInterface({
  uri: 'http://192.168.0.111:4000/graphql'
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const state = store.getState()
    const token = state.auth ? state.auth.jwt : null;
    if (token) {
      req.options.headers.authorization = `Bearer ${token}`
    }
    next();
  }
}]);

networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    if (!response.ok) {
      response.clone().text().then((bodyText) => {
        console.log(`Network Error: ${response.status} (${response.statusText}) - ${bodyText}`);
        next();
      });
    } else {
      let isUnauthorized = false;
      response.clone().json().then(({ errors }) => {
        if (errors) {
          console.log('GraphQL Errors:', errors);
          if (some(errors, { message: 'Unauthorized' })) {
            isUnauthorized = true;
          }
        }
      }).then(() => {
        if (isUnauthorized) {
          store.dispatch(logout());
        }
        next();
      });
    }
  }
}]);

export const client = new ApolloClient({
  networkInterface: networkInterface
});
  
export default class Root extends Component {
  /**
   * Renders the root component
   */
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <ApolloProvider store={store} client={client}>
          <App />
        </ApolloProvider>
      </StyleProvider>
    );
  }
}