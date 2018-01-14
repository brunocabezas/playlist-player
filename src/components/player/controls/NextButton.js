import {h} from 'preact';
import PropTypes from 'prop-types';

const propTypes = {
    disabled : PropTypes.bool,
    onClick : PropTypes.func.isRequired
  };

const defaultProps = {
    isPlaying : false,
    disabled : false
  };

const NextButton = ({onClick,disabled}) =>{
  return (
    <svg onClick={onClick} fill="#FAFBFB" width="10px" height="36px" viewBox="0 0 10 12" className="media-control media-control--next-track">
      <polygon points="8,0 8,4.8 0,0 0,12 8,7.2 8,12 10,12 10,0" />
    </svg>
  );
};

NextButton.propTypes=propTypes;
NextButton.defaultProps=defaultProps;
export default NextButton;
