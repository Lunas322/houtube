import { useEffect } from "react";
import {
  GET_YOUTUBE_CHANNEL,
  GET_YOUTUBE_CHANNEL_VIDEOS,
  GET_YOUTUBE_DATA,
  GET_YOUTUBE_VIDEO_VIEW,
} from "../api/YouTube";
import axios from "axios";

const navigator = useNavigate();
const KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const [data, setData] = useState([]);
//데이터 받을거
const { id } = useParams();
//api호출때 사용
const [loading, setLoding] = useState(false);
const [error, setError] = useState(false);
const [ch, setCh] = useState([]);
const [channleVideo, setchannelVideo] = useState([]);

useEffect(() => {
  async function FeatchData() {
    try {
      setLoding(true);
      const GET_Y_DATA = await GET_YOUTUBE_DATA(id, KEY);
      setData(GET_Y_DATA);
      if (GET_Y_DATA && GET_Y_DATA.lengtb > 0) {
        const channelID = GET_Y_DATA[0].snippet.channelId;

        const [Channel, ChannelVideo] = await Promise.all([
          GET_YOUTUBE_CHANNEL(channelID, KEY),
          GET_YOUTUBE_CHANNEL_VIDEOS(GET_Y_DATA.snippet.channelTitle, KEY),
        ]);
        setCh(Channel);

        const ids = ChannelVideo.map((videos) => videos.snippet.id)
          .filter(Boolean)
          .join(",");
        if (!ids) {
          console.log("아이디가 들어있지 않습니다");
          return;
        }
        const GET_STAT = await GET_YOUTUBE_VIDEO_VIEW(ids, KEY);
        const STAT_MAP = {};
        if (GET_STAT?.items && Array.isArray(GET_STAT.items)) {
          GET_STAT.items.forEach((items) => {
            STAT_MAP[items.id] = items.statistics.viewCount;
          });
        }
        const ADD_Y_VIEW = ChannelVideo.map((videos) => ({
          ...videos,
          ViewCount: STAT_MAP[videos.snippet.id],
        }));
        setchannelVideo(ADD_Y_VIEW);
      }
    } catch (error) {
      setError(true);
      console.error("에러가 발생했습니다", error);
    } finally {
      setLoding(false);
      setError(false);
      console.log("데이터 featching 완료");
    }
  }
  FeatchData();
}, [id]);
