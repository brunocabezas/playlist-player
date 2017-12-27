import { h, Component } from 'preact';
import Playlist from './Playlist'
import getParams from '../helpers/getUserAndPlaylistIdFromUrl';

import {connect} from 'preact-redux';
import {login,loadPlaylist} from '../actions/spotify';
import {loadPlaylistSongs} from '../actions/youtube';
import PlaylistLinkInput from './PlaylistLinkInput';
import urlRegex from 'url-regex';
import playlist from "../store/playlistReducer";


class App extends Component {
  state = {
    text : ""
  };
  componentWillMount() {
    console.log('componentWillUnmount',this.props);
    this.props.login();
  };

  handleInputchange = e => {
    const text = e.target.value;
    this.setState({text});

    const validUrl = urlRegex().test(text);

    if (!validUrl) return;

    const params = getParams(text);
    if(params){
      this.props.loadPlaylist(params)
        .then(res=>console.log(res))
        .catch(res=>console.log(res));
    }
  };

  handlePlay = e =>{
    // if (this.props.playlist.name){
      this.props.loadPlaylistSongs(this.props.playlist.tracks.items);
    // }
  }
  render({playlist},{text}){
    return (
      <div>
        <h1>ENTER A SPOTIFY PLAYLIST LINK</h1>
        <PlaylistLinkInput
          value = {text}
          name = "text"
          onChange ={this.handleInputchange}
        />
        <Playlist data = {playlist}
        />
        <button onClick={this.handlePlay}>get</button>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  playlist : state.playlist
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  loadPlaylist: data => dispatch(loadPlaylist(data)),
  loadPlaylistSongs: data => dispatch(loadPlaylistSongs(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
