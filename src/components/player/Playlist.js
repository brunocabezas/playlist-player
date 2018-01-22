import {h, Component} from 'preact';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import './_playlist.styl';
import {
  Tooltip,
} from 'react-tippy';

export default class Playlist extends Component {
  static propTypes = {
    tracks : PropTypes.arrayOf(PropTypes.shape({
      title : PropTypes.string.isRequired,
      published : PropTypes.string.isRequired,
      etag : PropTypes.string.isRequired,
      youtubeId : PropTypes.string.isRequired,
      spotifyId : PropTypes.string.isRequired
    })).isRequired,
    playlist : PropTypes.object.isRequired,
    currentTrack : PropTypes.string.isRequired,
    onTrackClick : PropTypes.func.isRequired,
    setPlaylist : PropTypes.func.isRequired,
    loading : PropTypes.bool
  };

  static defaultProps = {
    loading : false
  };

  _handleTrackClick = e => {
    const spotifyId = e.target.id,
      track = this.props.tracks
        .find(track=>track.spotifyId===spotifyId);

    if (track)
      this.props.onTrackClick(track);
  };

  render({ tracks, loading,currentTrack,playlist,setPlaylist }){
    // console.log(tracks.length)
    const tooltipContent = (
      <span style={{textAlign:"left"}}>
        <p style={{marginBottom:10,fontSize:12}}>
          Get the url by : <br/> 1. Right-click of a the spotify playlist <br/> 2. Share and select <i>copy playlist link </i><br/>2. Then paste it. Or try with:
        </p>
        <p onClick={setPlaylist} style={{cursor:"pointer",textAlign:"center",textDecoration:"underline",color:"#36D7B7"}} className={"tooltip__link"}>
          https://open.spotify.com/user/subhaze-cl/playlist/1pMU33trnDGKwltacRc9mr
        </p>
      </span>
    ),
    tooltip =(
      <Tooltip
        position="top"
        interactive
        arrow
        delay={0}
        hideOnClick = {false}
        style={{textDecoration:"underline",color:"#36D7B7"}}
        html={tooltipContent}
      >
        spotify playlist uri

      </Tooltip>
    );

    return (
      <aside className="playlist">
        <header className="playlist__header">
          <h3 className="playlist__title">Playlist: {playlist.name}</h3>
        </header>
        <ul className="playlist__tracks">
          {tracks.map(track =>(
            <li key={track.label}
              id = {track.spotifyId}
              className={`playlist__track ${track === currentTrack ? 'playlist__track-active' : ''}`}
              onClick={this._handleTrackClick}
              title={track.label}
            >
              {track.spotifyTrackName}
            </li>
          ))}
          {tracks.length === 0 && !loading &&
            <li className={"playlist__placeholder"} >
              enter a valid {tooltip} to start listening
            </li >
          }
          {loading &&
            <li className={"playlist__loader"}><ClipLoader size={35} color={'#36D7B7'} loading={loading} /></li>
          }
        </ul>
      </aside>
    );
  }
}
