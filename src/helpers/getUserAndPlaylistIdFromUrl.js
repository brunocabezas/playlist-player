export default url => {
  const hasUser = url.indexOf('user/')>=0 ? url.indexOf('user/') : false,
    user = hasUser && url.slice(hasUser+5).split('/')[0],
    hasPlaylist = url.indexOf('playlist/')>=0 ? url.indexOf('playlist/') : false,
    playlistId = hasPlaylist && url.slice(hasPlaylist+9).split('/')[0];

  return {user, playlistId}
};
