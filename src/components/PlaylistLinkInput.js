import {h,Component} from 'preact';

class PlaylistLinkInput extends Component {


  render(){
    const {name,value,onChange} = this.props;

    return (
      <div>
        <input
          type = "text"
          name={name}
          value = {value}
          onInput={()=>{}}
        />
      </div >
    );
  }
}

export default PlaylistLinkInput;
