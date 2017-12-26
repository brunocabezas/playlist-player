import { initialState } from './store';

export function playlist( state = initialState.playlist, action) {
  switch (action.type) {
    case 'GET_PLAYLIST_SUCCEED':
      return action.playlist;
    default:
      return state
  }
};
