import {h, Component } from 'preact';
import PropTypes from 'prop-types';

export default class ProgressBar extends Component {
  static propTypes = {
    disabled : PropTypes.bool,
    onClick : PropTypes.func.isRequired
  };

  static defaultProps = {
    isPlaying : false,
    disabled : false
  };

  render() {
    const { value, isPlaying } = this.props;

    console.log(value);
    return (
      <div className="media-control-group media-control-group--seek">
        <progress className="media-control media-control--progress" value={value} />
        <input type="range" step="any" min={0} max={1} step="any" value={value} className="media-control media-control--seekbar" style="background-size: 0% 100%;" />
      </div>
    );
  }
}

