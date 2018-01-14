import {h,Component} from 'preact';
import PropTypes from 'prop-types';
import Close from './Close.svg';
import './_playlistInput.styl';

export default class PlaylistLinkInput extends Component {
  static propTypes = {
    value : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    name : PropTypes.string,
    setRef : PropTypes.func,
    clearInput : PropTypes.func
  };

  static defaultProps = {
    name : "text",
    clearInput : ()=>{},
    setRef : ()=>{}
  };

  render({name,value,onChange,setRef,clearInput}){
    const showClear = value.length>0;
    return (
      <div className={"playlist__input"}>
        <input
          ref={setRef}
          placeholder={"Enter any spotify playlist URI"}
          type = "text"
          name={name}
          value = {value}
          onInput={onChange}
        />
        {showClear &&
          <span onClick={clearInput} className="playlist__input-clear"><Close/></span>
        }
      </div >
    );
  }
}
