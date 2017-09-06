
import type { Action } from '../actions/types';
import { SHOW_ERROR, CLEAR_ERRORS } from '../constants';

export type State = {
  error: string
}

const initialState = {
  error: null,
  token: ''
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default: 
     return state
  }
}
