import {
  UPDATE_ACCOUNT,
  DISCONNECT,
} from '../../constants/actions';

const initialState = null;

export default function account(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACCOUNT:
      return action.data;
    case DISCONNECT:
      return initialState;
    default:
      return state;
  }
}
