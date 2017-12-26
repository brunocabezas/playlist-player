import { h, Component } from 'preact';
import * as actions from '../actions/spotify';

import PlaylistLinkInput from './PlaylistLinkInput';

const SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQAbMFyE2Cm05YZq4RSUqV5N8V-kv2xbPoVcvLj9oJUQKF3n-fJJ_kvey0IOIJAo-vmwfjKxegD_ukBLqNA');



export default class App extends Component {
  componentWillMount(){
    console.log('componentWillUnmount');
    actions.login()

    spotifyApi.getPlaylist('subhaze-cl', '1pMU33trnDGKwltacRc9mr')
      .then(function(data) {
        console.log('User playlist', data);
      }, function(err) {
        console.error(err);
      });
// get Elvis' albums, using Promises through Promise, Q or when
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
      .then(function(data) {
        console.log('Artist albums', data);
      }, function(err) {
        console.error(err);
      });
  }
  render(props,state){
    return (
      <div>
        <h1>ENTER A SPOTIFY PLAYLIST LINK</h1>
        <PlaylistLinkInput />
      </div>
    );
  }
};
