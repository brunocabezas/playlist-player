import {h, Component} from 'preact';
import PropTypes from 'prop-types';

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
      <aside className="media-playlist">
        <header className="media-playlist-header">
          <h3 className="media-playlist-title">Playlist</h3>
        </header>
        <ul className="media-playlist-tracks">
          {tracks.map(track =>(
            <li key={track.label}
              id = {track.spotifyId}
              className={`media-playlist-track ${track === currentTrack ? 'is-active' : ''}`}
              onClick={this._handleTrackClick}
            >
              {track.label}
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}
