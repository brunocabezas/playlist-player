import initialState from '../store/initialState';
import {SET_TOKEN} from "../actions/actionTypes";

export default function token(state = initialState.token, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.token;
    default:
      return state;
  }
};
