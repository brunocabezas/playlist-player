import { h, Component } from 'preact';
import PlaylistLinkInput from './PlaylistLinkInput';

export default class App extends Component {

  render(props,state){
    return (
      <div>
        <h1>ENTER A SPOTIFY PLAYLIST LINK</h1>
        <PlaylistLinkInput />
      </div>
    );
  }
};
