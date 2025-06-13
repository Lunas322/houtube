import styles from "../css/MainVideos.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_YOUTUBE_CHANNEL, GET_YOUTUBE_LIST } from "../api/YouTube";
//TODO:map도 컴포넌트로 빼기
//채널 사진을 중첩 맵으로 사용하면 되지 않을까
//TODO:끝까지 내리면 다시 추가로 로딩이 되도록 제작
function MainVideos() {
  const [data, setData] = useState([]);
  const KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const navigator = useNavigate();
  useEffect(() => {
    async function FeatchData() {
      try {
        const GET_Y_DATA = await GET_YOUTUBE_LIST(KEY);

        const GET_Y_CHANNEL_DATA = await Promise.all(
          GET_Y_DATA.map(async (video) => {
            const ChannelId = video.snippet.channelId;
            const GET_Y_CHANNEL_IMG = await GET_YOUTUBE_CHANNEL(ChannelId, KEY);
            const Channel = GET_Y_CHANNEL_IMG[0];
            const URL = Channel?.snippet?.thumbnails?.default?.url || "";
            return {
              ...video,
              ChannleImg: URL,
            };
          })
        );
        setData(GET_Y_CHANNEL_DATA);
        console.log(GET_Y_CHANNEL_DATA);
      } catch (error) {
        console.error("에러가 발생했습니다 에러명 : ", error);
      }
    }
    FeatchData();
  }, []);
  return (
    <>
      <ul className={styles.VideoContainer}>
        {data && data.length > 0
          ? data.map((video) => (
              <li
                key={video.id}
                className={styles.YoutubeVideo}
                onClick={() => {
                  navigator(`/Detail/${video.id}`);
                }}
              >
                <img
                  src={`${video.snippet.thumbnails.standard.url}`}
                  alt={video.snippet.title}
                  className={styles.YoutubeImg}
                  width={"100%"}
                  height={"380px"}
                />
                <div className={styles.InterFaceBox}>
                  <img
                    className={styles.ChannelPhoto}
                    src={video.ChannleImg}
                    alt="채널의 아이콘 이미지"
                  />
                  <div className={styles.Info}>
                    <p className={styles.MainTitle}>{video.snippet.title}</p>
                    <p className={styles.channelName}>
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </>
  );
}

export default MainVideos;
