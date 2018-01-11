import {h, Component } from 'preact';
import PropTypes from 'prop-types';

export default class PrevButton extends Component {
  static propTypes = {
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
      <svg width="10px" fill="#FAFBFB" height="36px" viewBox="0 0 10 12" className="media-control media-control--prev-track">
        <title>back</title>
        <polygon points="10,0 2,4.8 2,0 0,0 0,12 2,12 2,7.2 10,12" />
      </svg>
    );
  }
}
