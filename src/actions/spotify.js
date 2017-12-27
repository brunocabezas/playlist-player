import {SET_TOKEN,SPOTIFY_LOGIN} from "./actionTypes";
import querystring from 'querystring';
import { Base64 } from 'js-base64';
import {ajax} from 'rxjs/observable/dom/ajax';

export const setToken = token =>
  ({type : SET_TOKEN, token});


export const login = () =>
  ({ type: SPOTIFY_LOGIN });


const body = querystring.stringify({ grant_type: 'client_credentials' }),
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
    );
