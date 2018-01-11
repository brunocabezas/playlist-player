import {h, Component } from 'preact';
import PropTypes from 'prop-types';

export default class NextButton extends Component {
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
      <svg fill="#FAFBFB" width="10px" height="36px" viewBox="0 0 10 12" class="media-control media-control--next-track">
        <polygon points="8,0 8,4.8 0,0 0,12 8,7.2 8,12 10,12 10,0"></polygon>
      </svg>
    );
  }
}
