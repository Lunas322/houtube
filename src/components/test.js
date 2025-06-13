import { useEffect, useState } from "react";
import {
  GET_YOUTUBE_CHANNEL,
  GET_YOUTUBE_CHANNEL_VIDEOS,
  GET_YOUTUBE_DATA,
  GET_YOUTUBE_VIDEO_VIEW,
} from "../api/YouTube";

const [data, setdata] = useState([]);
const KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
// 호출 횟수 22회 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
useEffect(() => {
  async function Featchdata() {
    try {
      const GET_Y_DATA = await GET_YOUTUBE_DATA(KEY);

      if (GET_Y_DATA && GET_Y_DATA > 0) {
        const GET_Y_CHANNEL_DATA = await Promise.all(
          GET_Y_DATA.map(async (video) => {
            const channelID = video.snippet.channelId;

            const GET_Y_CHANNEL = await GET_YOUTUBE_CHANNEL(channelID, KEY);
            const IMG = GET_Y_CHANNEL[0].snippet.thumbnails.default.url;
            const ChannelTitle = GET_Y_CHANNEL[0].snippet.title;
            const Subscriber = GET_Y_CHANNEL[0].statistics.subscriberCount;
            const GET_Y_VIDEO_LIST = await GET_YOUTUBE_CHANNEL_VIDEOS(
              GET_Y_CHANNEL[0].snippet.title,
              KEY
            );
            const ADD_Y_VIDEO_LIST_VIEW = await Promise.all(
              GET_Y_VIDEO_LIST.map(async (chvideo) => {
                const VIDEO_LIST_ID = chvideo.snippet.id;
                const GET_VIEW = await GET_YOUTUBE_VIDEO_VIEW(
                  VIDEO_LIST_ID,
                  KEY
                );
                return {
                  ...chvideo,
                  view: GET_VIEW.statistics.viewCount,
                };
              })
            );
            return {
              ...video,
              channelIMG: IMG,
              channelTitle: ChannelTitle,
              sub: Subscriber,
              VIDEOLIST: ADD_Y_VIDEO_LIST_VIEW,
            };
          })
        );
        console.log("123");
        setdata(GET_Y_CHANNEL_DATA);
      }
    } catch (error) {
      console.error("에러가 발생했습니다 에러명 : ", error);
    }
  }
  Featchdata();
}, []);
