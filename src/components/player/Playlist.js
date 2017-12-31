import {h, Component} from 'preact';
import PropTypes from 'prop-types';
import './_playlist.styl';

export default class Playlist extends Component {
  static propTypes = {
    tracks : PropTypes.arrayOf(PropTypes.shape({
      title : PropTypes.string.isRequired,
      published : PropTypes.string.isRequired,
      etag : PropTypes.string.isRequired,
      youtubeId : PropTypes.string.isRequired,
      spotifyId : PropTypes.string.isRequired
    })).isRequired,
    currentTrack : PropTypes.string.isRequired,
    onTrackClick : PropTypes.func.isRequired
  };

  _handleTrackClick = e => {
    const spotifyId = e.target.id,
      track = this.props.tracks
        .find(track=>track.spotifyId===spotifyId);

    if (track)
      this.props.onTrackClick(track);
  };

  render({ tracks, currentTrack }){

    return (
      <aside className="playlist">
        <header className="playlist__header">
          <h3 className="playlist__title">Playlist</h3>
        </header>
        <ul className="playlist__tracks">
          {tracks.map(track =>(
            <li key={track.label}
              id = {track.spotifyId}
              className={`playlist__track ${track === currentTrack ? 'playlist__track-active' : ''}`}
              onClick={this._handleTrackClick}
                title={track.spotifyTrackName}
            >
              {track.label}
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}
