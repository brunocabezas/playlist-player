import {
  SAVE_PLAYLIST_ERROR,
  SAVE_PLAYLIST_SUCCESS,
  SAVE_PLAYLIST,
  GET_PLAYLIST_SONGS,
  SPOTIFY_LOGIN,
  SPOTIFY_LOGIN_ERROR,
  GET_PLAYLIST_SONGS_SUCCESS,
  GET_PLAYLIST_SONGS_ERROR
} from "./actionTypes";
import queryString from 'querystring';
import {Observable} from 'rxjs';
import  getArtistAndNameFromTrack from '../helpers/getArtistAndNameFromTrack';
import {ajax} from 'rxjs/observable/dom/ajax';
import {updateLoading} from './loginActions';

const key = process.env.YTKEY;

export const loadPlaylistSongs = songs =>
  ({type : GET_PLAYLIST_SONGS, songs});

export const loadPlaylistSongsSuccess = songs =>
  ({type : GET_PLAYLIST_SONGS_SUCCESS, songs});

export const savePlaylist = videos =>
  ({type : SAVE_PLAYLIST, videos});

export const savePlaylistSuccess = playlistId =>
  ({type : SAVE_PLAYLIST_SUCCESS, playlistId});

const parseQueryParams = ({name,artist})=>
    artist+"|"+name;


const myPromise = val =>{
  const values = parseQueryParams(getArtistAndNameFromTrack(val)),
    spotifyId = val.track.id,
    spotifyTrackName = val.track.artists[0].name+" "+val.track.name;

  return ajax({
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=${values}&key=${key}`,
      method: 'get',
      crossDomain: true,
    })
    .map(res => {
      return Object.assign({spotifyId,spotifyTrackName},res.response);
    });
};

// epic
export const loadPlaylistSongsEpic = (action$, store) =>
  action$.ofType(GET_PLAYLIST_SONGS)
    .mergeMap(action =>
      Observable.concat(
        Observable.of(updateLoading(true)),

        Observable.of(action.songs)
          .switchMap(songs => Observable.forkJoin(...songs.map(myPromise)))
          .map(res => {
            const videoIds = res
              .map(r=>r.items.find(item=>item.id.videoId))
              .map(r=>r.id.videoId);
            return loadPlaylistSongsSuccess(res);
             // savePlaylist(videoIds);
          })
          .catch(error => Observable.of({
            type: GET_PLAYLIST_SONGS_ERROR,
            payload: error.xhr.response,
            error: true
          })),

        Observable.of(updateLoading(false))
      )
    );



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

        //console.log(body)
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
        }));
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
          // .map(res => console.log (res.response))
          .catch(error => Observable.of({
            type: SPOTIFY_LOGIN_ERROR,
            payload: error.xhr.response,
            error: true
          }));
      }

    );
