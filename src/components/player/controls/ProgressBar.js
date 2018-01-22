import {h } from 'preact';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

const propTypes = {
  value : PropTypes.number.isRequired,
  onChange : PropTypes.func.isRequired,
  onMouseDown : PropTypes.func.isRequired,
  onMouseUp : PropTypes.func.isRequired,
  disabled : PropTypes.bool,
  loaded : PropTypes.number.isRequired
};

const defaultProps = {
  disabled : false
};

const ProgressBar = ({ loaded,disabled, value, onChange ,onMouseDown,onMouseUp} ) => (
  <div className="media-control-group media-control-group--seek">
    {/*<progress className="media-control media-control--progress" value={value} />*/}
    <Slider
      max={1}
      step={0.0001}
      className="media-control media-control--seekbar"
      disabled={disabled}
      defaultValue={0}
      onChange={onChange}
      value={value}
    />
  </div>
);

ProgressBar.defaultProps = defaultProps;
ProgressBar.propTypes = propTypes;
export default ProgressBar;
