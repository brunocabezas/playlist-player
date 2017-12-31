import initialState from '../store/initialState';
import {SET_LOADING} from "../actions/actionTypes";

export default function loading(state = initialState.loading, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.loading;
    default:
      return state;
  }
}
