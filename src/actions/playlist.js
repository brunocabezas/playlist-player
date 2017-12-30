import {
  SET_TOKEN,
  GET_PLAYLIST_ERROR,GET_PLAYLIST,SPOTIFY_LOGIN_ERROR,GET_PLAYLIST_SUCCESS,SPOTIFY_LOGIN} from "./actionTypes";

export const savePlaylistSongs = songs =>
  ({type : SET_TOKEN, songs});
