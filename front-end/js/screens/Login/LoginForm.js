// Framework 
import React, { Component } from 'react';
import Types from 'prop-types';
import {
  Item,
  Input,
  Icon,
  View,
  Text
} from 'native-base';
import { Field, reduxForm } from 'redux-form';

// Actions

// Styles
import styles from './styles';

/**
 * Form validations
 * @const
 * @param {object} values 
 * @memberof Login
 */
const validate = values => {
  const error = {};
  error.email = '';
  error.password = '';
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = '';
  }
  if (values.password === undefined) {
    pw = '';
  }
  if (ema.length < 8 && ema !== '') {
    error.email = 'too short';
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
  if (pw.length > 12) {
    error.password = 'max 11 characters';
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = 'Weak';
  }
  return error;
};

/**
 * <p>This is rendered when the user has not entered his credentilas
 * or when he logs out.</p>
 */
class LoginForm extends Component {
  /**
   * All properties passed to this components must be added here
   */
  static propTypes = {
    email: Types.string,
    password: Types.string,
    navigation: Types.object
  };

  /**
   * @constructor
   * @param {object} props 
   */
  constructor(props) {
    super(props);

    // All bindings must be added in the contructor
    this.renderInput = this.renderInput.bind(this);
  }

  /**
   * Rensders an input componenent for the Field.
   * Check the documentation <a href="http://redux-form.com/7.0.3/docs/api/Field.md/">Redux form Field</a>
   * @param {object} param - Input options
   * @return {component} item
   */
  renderInput({
    input,
    meta: { error }
  }) {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>
        <Icon active name={input.name === 'email' ? 'person' : 'lock'} />
        <Input
          placeholder={input.name === 'email' ? 'Email' : 'Password'}
          secureTextEntry={input.name === 'password'}
          {...input}
        />
        {hasError
          ? <Item style={styles.item}>
              <Text style={styles.text}>{error}</Text>
            </Item>
          : <Text />}
      </Item>
    );
  }

  /**
   * Renders the component using NativeBase components
   */
  render() {
    return (
      <View>
        <Field name='email' component={this.renderInput} />
        <Field name='password' component={this.renderInput} />
      </View>
    );
  }
}

/**
 * Redux form function binds the form instance and validations.
 * Check <a href="http://redux-form.com/7.0.3/docs/api/ReduxForm.md/">reduxForm()</a>
 * @const
 * @param {object} param1 - Form instance and validation
 * @param {func} param2 - Binding of actions
 */
let LoginSwag = reduxForm(
  {
    form: 'loginForm',
    validate
  }
)(LoginForm);

/**
 * Navigation options depends of the navigation provider.
 * Here header is null to remove the header.
 */
LoginSwag.navigationOptions = {
  header: null
};
export default LoginSwag;
