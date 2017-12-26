import { initialState } from './store';
import {combineReducers } from 'redux';
import {GET_PLAYLIST_SUCCESS} from "./actions/actionTypes";
import token from './auth/tokenReducer';

export function playlist( state = initialState.playlist, action) {
  switch (action.type) {
    case GET_PLAYLIST_SUCCESS:
      return action.playlist;
    default:
      return state;
  }
};

export default combineReducers({
  playlist,
  token
});
