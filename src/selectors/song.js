import {createSelector} from 'reselect';
import getCorrectVideo from '../helpers/getCorrectVideo';

const getYoutubeTracks = state =>
  state.playlist.songs;

export default createSelector(
  getYoutubeTracks,
  songs=>{

    return songs.map(song=>{
        const {spotifyId,spotifyTrackName,items} = song,
          video = getCorrectVideo(spotifyTrackName,items);

        if (video)
          return Object.assign(
            { youtubeId : video.id && video.id.videoId,
              src :video.id ? "http://www.youtube.com/embed/"+video.id.videoId : null,
              label : video.snippet && video.snippet.title,
              published : video.snippet && video.snippet.publishedAt,
              etag : video.etag
            },
            {spotifyId,spotifyTrackName}
          );
        else
          return null;

      })
      .filter(item=>item);
  }
);

