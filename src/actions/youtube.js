import {
  SAVE_PLAYLIST_ERROR, SAVE_PLAYLIST_SUCCESS, SAVE_PLAYLIST, GET_PLAYLIST_SONGS, SPOTIFY_LOGIN,
  SPOTIFY_LOGIN_ERROR
} from "./actionTypes";
import queryString from 'querystring';
import { Base64 } from 'js-base64';
import {Observable} from 'rxjs';
import  getArtistAndNameFromTrack from '../helpers/getArtistAndNameFromTrack';
// import Youtube from 'youtube-api';
import {ajax} from 'rxjs/observable/dom/ajax';

/*Youtube.authenticate({
  type: "oauth"
  , token: "AIzaSyC13DDiryPZsAYLmcXvuWtr6c6K6NSpt0o"
});*/
/*
const { YTSearcher } = require('ytsearcher');
const searcher = new YTSearcher("AIzaSyC13DDiryPZsAYLmcXvuWtr6c6K6NSpt0o");
*/
const key = process.env.YTKEY;

export const loadPlaylistSongs = songs =>
  ({type : GET_PLAYLIST_SONGS, songs});

export const savePlaylist = videos =>
  ({type : SAVE_PLAYLIST, videos});

export const savePlaylistSuccess = playlistId =>
  ({type : SAVE_PLAYLIST_SUCCESS, playlistId});

const parseQueryParams = ({name,artist})=>
    artist+"|"+name;


const myPromise = val =>{
  console.log('val: ',val );
  const values = parseQueryParams(getArtistAndNameFromTrack(val)),
    trackId = val.track.id;
  return ajax({
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=${values}&key=${key}`,
      method: 'get',
      crossDomain: true,
    })
    .map(res => {
      return Object.assign({trackId},res.response);
    })
};

// epic
export const loadPlaylistSongsEpic = (action$, store) =>
  action$.ofType(GET_PLAYLIST_SONGS)
    .mergeMap(action =>{
      const source = Observable.of(action.songs);

      return source
        .mergeMap(q => Observable.forkJoin(...q.map(myPromise)))
        .map(res => {
          const videoIds = res
            .map(r=>r.items.find(item=>item.id.videoId))
            .map(r=>r.id.videoId);

          return savePlaylist(videoIds);
        });
    });



export const savePlaylistEpic = (action$, store) =>
  action$.ofType(SAVE_PLAYLIST)
    .mergeMap(action =>{
        const {videos} = action,
          token = store.getState().token,
          playlist = store.getState().playlist,
          body = queryString.stringify({
            snippet : {
              "title" : "youtify - "+playlist.name
            },
            status : "public"
          });

        console.log(body)
        return  ajax(({
          url: `https://www.googleapis.com/youtube/v3/playlists?part=id&access_token=${key}`,
          method: 'post',
          body,
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization" : "Bearer "+key
          }
        }))
        .map(res => savePlaylistSuccess(res.response))
        .catch(error => Observable.of({
          type: SAVE_PLAYLIST_ERROR,
          payload: error.xhr.response,
          error: true
        }))
      }

    );

export const updatePlaylist = (action$, store) =>
  action$.ofType(SAVE_PLAYLIST_SUCCESS)
    .mergeMap(action =>{
        const {playlistId} = action,
          token = store.getState().token,
          playlist = store.getState().playlist,
          body = queryString.stringify({
            snippet : {
              playlistId:"asdas asdas "
            }
          });

        return  ajax.put(`https://www.googleapis.com/youtube/v3/playlistsItms`, body)
          .map(res => console.log (res.response))
          .catch(error => Observable.of({
            type: SPOTIFY_LOGIN_ERROR,
            payload: error.xhr.response,
            error: true
          }))
      }

    );