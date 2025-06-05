import styles from "../css/MainVideos.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_YOUTUBE_LIST } from "../api/YouTube";
//TODO:map도 컴포넌트로 빼기
//채널 사진을 중첩 맵으로 사용하면 되지 않을까?
function MainVideos() {
  const [data, setData] = useState([]);
  const KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const navigator = useNavigate();
  useEffect(() => {
    async function fatchData() {
      try {
        const GET_Y_DATA_LIST = await GET_YOUTUBE_LIST(KEY);
        setData(GET_Y_DATA_LIST);
        console.log(data);
      } catch (error) {
        console.error("에러", error);
      }
    }
    fatchData();
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
                  <div className={styles.ChannelPhoto}></div>
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
