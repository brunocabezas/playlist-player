import {h, Component } from 'preact';
import PropTypes from 'prop-types';

export default class MuteUnmute extends Component {
  static propTypes = {
    isPlaying : PropTypes.bool,
    disabled : PropTypes.bool,
    onClick : PropTypes.func.isRequired
  };

  static defaultProps = {
    isPlaying : false,
    disabled : false
  };

  render() {
    const { onClick, isPlaying } = this.props;
    return (
      <svg
        role="button"
        width="36px"
        height="36px"
        fill="#373D3F"
        viewBox="0 0 36 36"
        className={"media-control media-control--play-pause"}
        onClick={onClick}
      >
        <circle  cx="18" cy="18" r="18"/>
          { isPlaying &&
          <g key="pause" style={{ transformOrigin: '0% 50%' }}>
            <rect x="12" y="11" fill="#CDD7DB" width="4" height="14"/>
            <rect x="20" y="11" fill="#CDD7DB" width="4" height="14"/>
          </g>
          }
          { !isPlaying &&
          <polygon
            key="play"
            fill="#CDD7DB"
            points="14,11 26,18 14,25"
            style={{ transformOrigin: '100% 50%' }}
          />
          }
      </svg>
    );
  }
}
