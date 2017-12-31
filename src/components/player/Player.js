import {h, Component} from 'preact';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import './_player.styl';
import './Range.css';

export default class Player extends Component {
  static propTypes = {
    url : PropTypes.string
  };

  static defaultProps = {
    url : null
  };

  state = {
    url:  this.props.url || null,
    playing: true,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  };

  componentWillReceiveProps = (nextProps)=>{
    if (this.props.url!==nextProps.url)
      this.load(nextProps.url);
  };

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    });
  };

  playPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  stop = () => {
    this.setState({ url: null, playing: false });
  };

  toggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  toggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  onPlay = () => {
    this.setState({ playing: true });
  };

  onPause = () => {
    // console.log('onPause')
    this.setState({ playing: false });
  };

  onSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  onSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  onProgress = state => {
    // console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  onEnded = () => {
    // console.log('onEnded')
    this.setState({ playing: this.state.loop });
  };

  onDuration = (duration) => {
    // console.log('onDuration', duration)
    this.setState({ duration });
  };

  ref = player => {
    this.player = player;
  };

  onError = e  =>
    // eslint-disable-next-line
    console.log("onError", e);


  render () {
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.state;

    return (
      <div className="player">
        <div className="media-controls media-controls--full">
          <div className="media-row">
            current time | nombre cancion | duraciton total
          </div>
          <div className="media-control-group media-control-group--seek">
            progreess bar
          </div>
          <div className="media-row">
            mutear / prev play next / repeat,fullscreen, volumen?
          </div>
        </div>

        <section className="section">
          <h1>ReactPlayer Demo</h1>
          <div className="player__wrapper">
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              width="100%"
              height="100%"
              url={url}
              playing={playing}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onEnded={this.onEnded}
              onError={this.onError}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
          </div>
          <table><tbody>
            <tr>
              <th>Controls</th>
              <td>
                <button onClick={this.stop}>Stop</button>
                <button onClick={this.playPause}>{playing ? "Pause" : "Play"}</button>
              </td>
            </tr>
            <tr>
              <th>Seek</th>
              <td>
                <input
                  type="range" min={0} max={1} step="any"
                  value={played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
              </td>
            </tr>
            <tr>
              <th>Volume</th>
              <td>
                <input type="range" min={0} max={1} step="any" value={volume} onChange={this.setVolume} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="muted">Muted</label>
              </th>
              <td>
                <input id="muted" type="checkbox" checked={muted} onChange={this.toggleMuted} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="loop">Loop</label>
              </th>
              <td>
                <input id="loop" type="checkbox" checked={loop} onChange={this.toggleLoop} />
              </td>
            </tr>
            <tr>
              <th>Played</th>
              <td><progress max={1} value={played} /></td>
            </tr>
            <tr>
              <th>Loaded</th>
              <td><progress max={1} value={loaded} /></td>
            </tr>
          </tbody></table>
        </section>
      </div>
    );
  }
}
