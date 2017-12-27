import {h,Component} from 'preact';
import PropTypes from 'prop-types';

export default class PlaylistLinkInput extends Component {
  static propTypes = {
    value : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    name : PropTypes.string
  };

  static defaultProps = {
    name : "text"
  };

  render({name,value,onChange}){
    return (
      <div>
        <input
          type = "text"
          name={name}
          value = {value}
          onInput={onChange}
        />
      </div >
    );
  }
};
