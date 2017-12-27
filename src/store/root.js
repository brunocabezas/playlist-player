import { initialState } from './initialState';
import {combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import playlist from './playlistReducer';
import token from '../auth/tokenReducer';
import { loginEpic } from "../actions/spotify";


export const rootReducer = combineReducers({
  playlist,
  token
});

export const rootEpic = combineEpics(
  loginEpic
);
