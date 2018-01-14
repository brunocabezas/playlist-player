import {h } from 'preact';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

const propTypes = {
  value : PropTypes.number.isRequired,
  onChange : PropTypes.func.isRequired,
  onMouseDown : PropTypes.func.isRequired,
  onMouseUp : PropTypes.func.isRequired,
  disabled : PropTypes.bool
};

const defaultProps = {
  disabled : false
};

const ProgressBar = ({ disabled, value, onChange ,onMouseDown,onMouseUp} ) => (
  <div className="media-control-group media-control-group--seek">
    <progress className="media-control media-control--progress" value={value} />
    <Slider min={0} max={1} step={0.000000001}
            className="media-control media-control--seekbar"
            style={{backgroundSize: "0% 100%"}}

            disabled={disabled}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            defaultValue={0} value={value} onChange={onChange} />

    {/*<input
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
    />*/}
  </div>
);

ProgressBar.defaultProps = defaultProps;
ProgressBar.propTypes = propTypes;
export default ProgressBar;
