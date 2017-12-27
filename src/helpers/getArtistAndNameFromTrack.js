export default data => {
  const hasArtist = data.track.artists && data.track.artists[0] || null,
    artist = hasArtist && hasArtist.name;

  return hasArtist ? {name: data.track.name, artist} : null;
};
