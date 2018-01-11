import { h, Component } from 'preact';
import Playlist from './player/Playlist';
import getParams from '../helpers/getUserAndPlaylistIdFromUrl';
import PropTypes from 'prop-types';
import songSelector from '../selectors/song';
import Player from './player/Player';

import {connect} from 'preact-redux';
import {login,loadPlaylist} from '../actions/spotify';
import {loadPlaylistSongs} from '../actions/youtube';
import PlaylistLinkInput from './PlaylistLinkInput';
import urlRegex from 'url-regex';
import playlist from "../store/playlistReducer";

require('preact/devtools');

const mod = (num, max) =>
  ((num % max) + max) % max;

class App extends Component{
  static propTypes = {
    /* playlist data from state (spotify) */
    playlistData : PropTypes.shape({
      track : PropTypes.shape({
        items : PropTypes.array.isRequired
      }).isRequired
    }),
    songs : PropTypes.arrayOf(PropTypes.shape({
      title : PropTypes.string.isRequired,
      published : PropTypes.string.isRequired,
      etag : PropTypes.string.isRequired,
      youtubeId : PropTypes.string.isRequired,
      spotifyId : PropTypes.string.isRequired
    })).isRequired,
    loading : PropTypes.bool.isRequired,
    login : PropTypes.func.isRequired,
    loadPlaylist : PropTypes.func.isRequired,
    loadPlaylistSongs : PropTypes.func.isRequired
  };

  state = {
    text : "",
    currentTrack: { spotifyTrackName: "Please click on a track below" }
  };

  componentWillMount = () => {
    // console.log('componentWillUnmount',this.props);
    this.props.login();
  };

  handleInputchange = e => {
    const text = e.target.value;
    this.setState({text});

    const validUrl = urlRegex().test(text);

    if (!validUrl) return;

    const params = getParams(text);
    if(params){
      this.props.loadPlaylist(params);
    }
  };

  _handleTrackClick = (track) => {
    this.setState({ currentTrack: track });
  };

  _navigatePlaylist = (direction) => {
    const {items} = this.props.playlistData.track,
      newIndex = mod(items,playlist.indexOf(this.state.currentTrack) + direction, items,playlist.length);
    this.setState({ currentTrack: playlist[newIndex] });
  };

  handlePlay = e =>{
    const {loadPlaylistSongs,playlistData } = this.props;
    loadPlaylistSongs(playlistData.tracks.items);
  };

  render({playlistData,songs,loading},{text,currentTrack,repeatTrack,autoPlay}){

    // console.log(songs)
    return (
      <div>
        <h1>ENTER A SPOTIFY PLAYLIST LINK {loading && "loading"}</h1>
        <PlaylistLinkInput
          value = {text}
          name = "text"
          onChange ={this.handleInputchange}
        />
        {playlistData && <h5>playlist: {playlistData.name}</h5>}
        <Player
          current = {currentTrack}
          url = {currentTrack.src}
        />
        <br/>
        <button onClick={this.handlePlay}>get</button>
        <Playlist tracks = {songs}
          currentTrack={currentTrack}
          onTrackClick={this._handleTrackClick}
        />
        <hr/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlistData : state.playlist.data,
  songs : songSelector(state),
  loading : state.loading
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  loadPlaylist: data => dispatch(loadPlaylist(data)),
  loadPlaylistSongs: data => dispatch(loadPlaylistSongs(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
