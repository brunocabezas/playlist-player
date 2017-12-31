import stringSimilarity from 'string-similarity';
import leven from 'leven';

// const compare = stringSimilarity.compareTwoStrings;
const compare = leven;

export default (videoName,options) =>{
  if (!Array.isArray(options))
    return [];

  /* sorting using leven as word matching lib */
  const sortedByCompare = options
    .sort((prev,next)=> compare(videoName, prev.snippet.title)-
      compare(videoName, next.snippet.title))
    .reverse();

  /* finding the first video that has all words in its name */
  return sortedByCompare
    .find(opt=>{
      const words = videoName.split(" "),
        hasAllWords = !words.find(key=>opt.snippet.title.indexOf(key)===-1);

      if (hasAllWords)
        return opt;
      }
    );

  return result;
};
