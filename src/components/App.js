import { h, Component } from 'preact';
import {spotify} from '../api';
import {bindActionCreators} from 'redux';
import {connect} from 'preact-redux';
import {login} from '../actions/spotify';
import PlaylistLinkInput from './PlaylistLinkInput';

class App extends Component {
  componentWillMount(){
    console.log('componentWillUnmount',this.props);
    this.props.login();
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

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch({type: 'SPOTIFY_LOGIN'})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
