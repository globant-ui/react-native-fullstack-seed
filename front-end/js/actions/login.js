import type { Action } from './types';
import  { AsyncStorage } from 'react-native';

import { TOKEN_KEY, SHOW_ERROR, STORE_TOKEN, CLEAR_ERRORS } from '../constants';

export function showError(error: string): Action {
  return {
    type: SHOW_ERROR,
    payload: error
  };
}

export function clearErrors(): Action {
  return {
    type: CLEAR_ERRORS
  };
}


export function storeToken(token: string): Action {
  try {
    AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    // Error saving data
  }
  return {
    type: STORE_TOKEN,
    payload: token
  };
}
