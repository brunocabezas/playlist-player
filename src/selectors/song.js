import {createSelector} from 'reselect';

const getSongs = state =>
  state.playlist.songs;

export default createSelector(
  getSongs,
  songs=>songs.map(song=>{
    console.log(song);
    const {spotifyId,items} = song,
      firstResult = items.length>=0 && items[0];

    return Object.assign(
      { youtubeId : firstResult.id.videoId,
        src : "http://www.youtube.com/embed/"+firstResult.id.videoId,
        label : firstResult.snippet.title,
        published : firstResult.snippet.publishedAt,
        etag : firstResult.etag
      },
      {spotifyId}
    );
  })
);

