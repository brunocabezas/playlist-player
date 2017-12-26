import { playlist} from "./rootReducer";
import {createStore} from 'redux';


export const initialState = {
  playlist : []
};

export default createStore(
  playlist,
  initialState
)
