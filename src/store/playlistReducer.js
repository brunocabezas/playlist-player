import { GET_PLAYLIST_SONGS_SUCCESS, GET_PLAYLIST_SUCCESS } from "../actions/actionTypes";
import {combineReducers} from 'redux';
import initialState from "./initialState";

export function data( state = initialState.playlist.data, action) {
  switch (action.type) {
    case GET_PLAYLIST_SUCCESS:
      return action.playlist;
    default:
      return state;
  }
};


export function songs( state = initialState.playlist.songs, action) {
  switch (action.type) {
    case GET_PLAYLIST_SONGS_SUCCESS:
      return action.songs;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  songs
})
