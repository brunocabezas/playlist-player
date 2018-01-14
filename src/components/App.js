import { h, Component } from 'preact';
import urlRegex from 'url-regex';
import {connect} from 'preact-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import songSelector from '../selectors/song';
import {login,loadPlaylist} from '../actions/spotify';
import {loadPlaylistSongs} from '../actions/youtube';
import getParams from '../helpers/getUserAndPlaylistIdFromUrl';

import Playlist from './player/Playlist';
import Player from './player/Player';
import PlaylistLinkInput from './PlaylistLinkInput';
import playlist from "../store/playlistReducer";
import './_app.styl';

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
    currentTrack: { spotifyTrackName: "Click on a playlist track" }
  };

  componentWillMount = () => {
    // console.log('componentWillUnmount',this.props);
    this.props.login();
  };

  componentDidMount = ()=>{
    this.inputRef.focus();
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

  _nextTrack = e => {
    const newIndex = this.props.songs.indexOf(this.state.currentTrack)+ 1;
    this.setState({ currentTrack: this.props.songs[newIndex] });
  };

  handlePlay = e =>{
    const {loadPlaylistSongs,playlistData } = this.props;
    loadPlaylistSongs(playlistData.tracks.items);
  };

  setPlaylist = e =>{
    this.handleInputchange({target:{value : e.currentTarget.innerHTML}});
  };

  setInputRef = input =>{
    this.inputRef = input;
  };

  clearInput = () =>{
    this.setState({text:""});
  };

  render({playlistData,songs,loading},{text,currentTrack,repeatTrack,autoPlay}){

    return (
      <div className={"app"}>
        <Helmet>
          <link rel="shortcut icon" href="../../static/favicon.png" />
        </Helmet>
        <div className="app__input">
          <h1> ENTER A SPOTIFY PLAYLIST
            <button onClick={this.handlePlay}>get</button></h1>
          <PlaylistLinkInput
            clearInput = {this.clearInput}
            setRef = {this.setInputRef}
            value = {text}
            name = "text"
            onChange = {this.handleInputchange}
          />
        </div>
        <div className={"app__player"}>
          <div className="left">
            <Player
              current = {currentTrack}
              url = {currentTrack.src}
              onNext = {this._nextTrack}
              onPrevious = {this._nextTrack}
            />
          </div>
          <div className="right">
            <Playlist
              setPlaylist = {this.setPlaylist}
              loading = {loading}
              playlist={playlistData}
              tracks = {songs}
              currentTrack={currentTrack}
              onTrackClick={this._handleTrackClick}
            />
          </div>
        </div>
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
