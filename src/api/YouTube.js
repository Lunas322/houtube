import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
// 디테일 페이지 API
export const GET_YOUTUBE_DATA = async (id, KEY) => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet,statistics",
      id,
      key: KEY,
    },
  });
  return response.data.items;
};
// 홈화면 영상 리스트 API
export const GET_YOUTUBE_LIST = async (KEY) => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet",
      key: KEY,
      maxResults: 42,
      chart: "mostPopular",
      regionCode: "kr",
    },
  });
  return response.data.items;
};
// 디테일 채널정보 API
export const GET_YOUTUBE_CHANNEL = async (channelID, KEY) => {
  const response = await axios.get(`${BASE_URL}/channels`, {
    params: {
      part: "snippet,statistics",
      id: channelID,
      key: KEY,
    },
  });
  return response.data.items;
};
// 채널의 영상 리스트 API
export const GET_YOUTUBE_CHANNEL_VIDEOS = async (channelID, KEY) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      channelid: channelID,
      key: KEY,
      maxResults: 5,
      type: "video",
      videoDuration: "medium",
    },
  });
  return response.data.items;
};
