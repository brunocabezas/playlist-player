import {combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import playlist from './playlistReducer';
import token from '../reducers/tokenReducer';
import loading from '../reducers/loadingReducer';
import {savePlaylistEpic,loadPlaylistSongsEpic} from "../actions/youtube";
import { loginEpic,loadPlaylistEpic } from "../actions/spotify";

export const rootReducer = combineReducers({
  playlist,
  token,
  loading
});

export const rootEpic = combineEpics(
  loginEpic,
  loadPlaylistSongsEpic,
  savePlaylistEpic,
  loadPlaylistEpic
);
