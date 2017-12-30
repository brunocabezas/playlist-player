import {createSelector} from 'reselect';
import getCorrectVideo from '../helpers/getCorrectVideo';

const getSongs = state =>
  state.playlist.songs;

export default createSelector(
  getSongs,
  songs=>songs.map(song=>{
    const {spotifyId,spotifyTrackName,items} = song,
      video = getCorrectVideo(spotifyTrackName,items);

    return Object.assign(
      { youtubeId : video.id.videoId,
        src : "http://www.youtube.com/embed/"+video.id.videoId,
        label : video.snippet.title,
        published : video.snippet.publishedAt,
        etag : video.etag
      },
      {spotifyId}
    );
  })
);

