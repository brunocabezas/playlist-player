import {h, Component} from 'preact';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import secondsToTime from '../../helpers/secondsToTimeFormat';
import VolumeControl from './controls/VolumeControl';
import PlayButton from './controls/PlayButton';
import PrevButton from './controls/PrevButton';
import NextButton from './controls/NextButton';
import ProgressBar from './controls/ProgressBar';
import './_player.styl';
import './Range.css';

export default class Player extends Component {
  static propTypes = {
    url : PropTypes.string,
    current : PropTypes.object.isRequired
  };

  static defaultProps = {
    url : null
  };

  state = {
    /* url holds the current song url */
    url:  this.props.url || null,
    playing: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playedSeconds : 0,
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
      loaded: 0,
    });
  };

  playPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  stop = () => {
    this.setState({ url: null, playing: false,playedSeconds:0});
  };

  toggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  setVolume = (val) => {
    this.setState({ volume: parseFloat(val) });
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

  onSeekChange = value => {
    this.setState({ played: parseFloat(value) });
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

  onError = e =>
    // eslint-disable-next-line
    console.log("onError", e);


  render () {
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.state,
      disableControls = !!url;

    return (
      <div className="player">
        <div className="media-controls media-controls--full">

          <div className="media-row playlist-info">
            <span className={"media-control"}>
             {secondsToTime(this.state.playedSeconds)}
            </span>
             {this.props.current.spotifyTrackName}
            <span className={"media-control"}>
             {secondsToTime(duration)}
            </span>
          </div>

          <ProgressBar
            disabled
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
            value={played}
          />

          <div className="media-row">
            <div className="left">
              <VolumeControl
                volume={volume}
                onVolumeChange={this.setVolume}
                isMuted={muted}
                onClick={this.toggleMuted}
              />
            </div>

            <div className="center">
              <PrevButton />
              <PlayButton
                isPlaying={playing}
                onClick={this.playPause}
              />
              <NextButton />
            </div>
          </div>
        </div>

        <section className="section">
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
        </section>
      </div>
    );
  }
}
