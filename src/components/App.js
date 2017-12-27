import { h, Component } from 'preact';
import {spotify} from '../api';
import {bindActionCreators} from 'redux';
import getParams from '../helpers/getUserAndPlaylistIdFromUrl';

import {connect} from 'preact-redux';
import {login,loadPlaylist} from '../actions/spotify';
import PlaylistLinkInput from './PlaylistLinkInput';
import urlRegex from 'url-regex';


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
    this.props.loadPlaylist(params);
  };

  render(props,{text}){
    return (
      <div>
        <h1>ENTER A SPOTIFY PLAYLIST LINK</h1>
        <PlaylistLinkInput
          value = {text}
          name = "text"
          onChange ={this.handleInputchange}
        />
      </div>
    );
  }
};

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  loadPlaylist: data => dispatch(loadPlaylist(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
