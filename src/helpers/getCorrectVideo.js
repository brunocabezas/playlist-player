import stringSimilarity from 'string-similarity';
import leven from 'leven';

// const compare = stringSimilarity.compareTwoStrings;
const compare = leven;

export default (videoName,options) =>{
  if (!Array.isArray(options))
    return [];

  const sortedByCompare = options
    .sort((prev,next)=> compare(videoName, prev.snippet.title)-
      compare(videoName, next.snippet.title))
    .reverse();

  const result = sortedByCompare
    .find(opt=>{
      const words = videoName.split(" "),
        hasAllWords = !words.find(key=>opt.snippet.title.indexOf(key)===-1);

      if (hasAllWords)
        return opt;
      }
    );

  return result
}
