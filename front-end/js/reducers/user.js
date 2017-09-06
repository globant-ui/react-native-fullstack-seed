
import type { Action } from '../actions/types';

export type State = {
  name: string
}

const initialState = {
  name: '',
};

export default function (state:State = initialState, action: Action): State {
  return state;
}
