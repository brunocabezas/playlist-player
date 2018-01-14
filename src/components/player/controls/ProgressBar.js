import {h } from 'preact';
import PropTypes from 'prop-types';

const propTypes = {
  value : PropTypes.number.isRequired,
  onChange : PropTypes.func.isRequired,
  onMouseDown : PropTypes.func.isRequired,
  onMouseUp : PropTypes.func.isRequired
};

const defaultProps = {
  disabled : 0
};

const ProgressBar = ({ value, onChange ,onMouseDown,onMouseUp} ) =>
  <div className="media-control-group media-control-group--seek">
    <progress className="media-control media-control--progress" value={value} />
    <input
      type="range"
      step="any"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      min={0}
      onChange={onChange}
      max={1}
      value={value}
      className="media-control media-control--seekbar"
      style={{backgroundSize: "0% 100%"}}
    />
  </div>;

ProgressBar.defaultProps = defaultProps;
ProgressBar.propTypes = propTypes;
export default ProgressBar;
