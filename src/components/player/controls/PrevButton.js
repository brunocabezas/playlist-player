import {h } from 'preact';
import PropTypes from 'prop-types';

const propTypes = {
    disabled : PropTypes.bool,
    onClick : PropTypes.func.isRequired
  };

const defaultProps = {
    onClick : null,
    disabled : false
  };

const PrevButton = ({disabled,onClick}) =>{

  return (
    <svg onClick={onClick} width="10px" fill="#FAFBFB" height="36px" viewBox="0 0 10 12" className="media-control media-control--prev-track">
      <title>back</title>
      <polygon points="10,0 2,4.8 2,0 0,0 0,12 2,12 2,7.2 10,12" />
    </svg>
  );
};

PrevButton.defaultProps = defaultProps;
PrevButton.propTypes = propTypes;
export default PrevButton;
