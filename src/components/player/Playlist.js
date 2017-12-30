import {h, Component} from 'preact'
import PropTypes from 'prop-types';

export default class Playlist extends Component {
  static propTypes = {
    tracks : PropTypes.array.isRequired,
    currentTrack : PropTypes.string.isRequired,
    onTrackClick : PropTypes.func.isRequired
  };

  _handleTrackClick = (track) => {
    this.props.onTrackClick(track)
  };

  render({ tracks, currentTrack }){

    return (
      <aside className="media-playlist">
        <header className="media-playlist-header">
          <h3 className="media-playlist-title">Playlist</h3>
        </header>
        <ul className="media-playlist-tracks">
          {tracks.map(track =>
            <li
              key={track.label}
              className={`media-playlist-track ${track === currentTrack ? 'is-active' : ''}`}
              onClick={this._handleTrackClick.bind(this, track)}
            >
              {track.label}
            </li>
          )}
        </ul>
      </aside>
    )
  }
}
