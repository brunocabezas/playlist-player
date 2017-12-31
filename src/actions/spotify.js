import {SET_TOKEN,GET_PLAYLIST_ERROR,GET_PLAYLIST,SPOTIFY_LOGIN_ERROR,GET_PLAYLIST_SUCCESS,SPOTIFY_LOGIN} from "./actionTypes";
import queryString from 'querystring';
import { Base64 } from 'js-base64';
import {Observable} from 'rxjs';
import {ajax} from 'rxjs/observable/dom/ajax';
import { updateLoading } from "./loginActions";

export const setToken = token =>
  ({type : SET_TOKEN, token});

export const loadPlaylistSuccess = playlist =>
  ({type : GET_PLAYLIST_SUCCESS, playlist});

export const loadPlaylist = data =>
  ({type : GET_PLAYLIST, data});

export const login = () =>
  ({ type: SPOTIFY_LOGIN });


const body = queryString.stringify({ grant_type: 'client_credentials' }),
  base64client = Base64.encode(process.env.CLIENT+":"+process.env.CLIENT_ID);

// epic
export const loginEpic = action$ =>
  action$.ofType(SPOTIFY_LOGIN)
    .mergeMap(action =>
      ajax(({
          url: 'https://accounts.spotify.com/api/token',
          method: 'post',
          crossDomain: true,
          body,
          headers: {
            'Accept': 'application/json',
            'Authorization' : "Basic "+base64client,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
      }))
      .map(res => setToken(res.response.access_token))
      .catch(error => Observable.of({
        type: SPOTIFY_LOGIN_ERROR,
        payload: error.xhr.response,
        error: true
      }))
    );

// epic
export const loadPlaylistEpic = (action$, store) =>
  action$.ofType(GET_PLAYLIST)
    .mergeMap(action =>{
      const {user,playlistId} = action.data,
        token = store.getState().token;


      return Observable.concat(
        Observable.of(updateLoading(true)),
        ajax(({
          url: `https://api.spotify.com/v1/users/${user}/playlists/${playlistId}`,
          method: 'get',
          crossDomain: true,
          body,
          headers: {
            'Accept': 'application/json',
            'Authorization' : "Bearer "+token
          },
        }))
        .map(res => loadPlaylistSuccess(res.response))
        .catch(error => Observable.of({
          type: GET_PLAYLIST_ERROR,
          payload: error.xhr.response,
          error: true
        })),
        Observable.of(updateLoading(false))
      );
    });
