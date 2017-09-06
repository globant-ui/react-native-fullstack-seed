import { REHYDRATE } from 'redux-persist/constants';

import type { Action } from '../actions/types';

import { LOGOUT, SET_CURRENT_USER, STORE_TOKEN } from '../constants';

export type State = {
  loading: boolean,
  token: string
}

const initialState = {
  loading: true,
  token: null
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        token: action.payload.auth ? action.payload.auth.token : null,
        loading: false
      }
    case LOGOUT:
      return {
        loading: false
      }
    case STORE_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
