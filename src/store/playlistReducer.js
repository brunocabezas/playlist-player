import { GET_PLAYLIST_SUCCESS } from "../actions/actionTypes";
import initialState from "./initialState";

export default function playlist( state = initialState.playlist, action) {
  switch (action.type) {
    case GET_PLAYLIST_SUCCESS:
      return action.playlist;
    default:
      return state;
  }
};
