import qs from "qs";
const pattern = /^https:\/\/(www\.)?youtube\.com\/.*$/;

const checkPattern = (url: string): boolean => {
  return pattern.test(url);
};

function getVideoId(youtubeUrl: string): string | null {
  if (checkPattern(youtubeUrl)) {
    const queryString = youtubeUrl.split("?")[1];
    const parsedQuery = qs.parse(queryString);
    const videoId = parsedQuery.v;

    if (videoId) return videoId?.toString();
  }
  return null;
}

export default getVideoId;
