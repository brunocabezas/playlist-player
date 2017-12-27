import { h,Component} from 'preact';
import PropTypes from 'prop-types';


class Playlist extends Component {
  static propTypes = {
    data : PropTypes.shape({
      name : PropTypes.string.isRequired
    }).isRequired
  };

  render({data}) {
    return (
      <div >
        <h1>playlist : {data.name} </h1>
        <ul>
          {data.tracks.items.map((track,i)=>
            <li key={i}>track: {track.track.name} - {track.track.artists[0].name} </li>
          )}

        </ul>
      </div >
    );
  }
}

export default Playlist;
