//TODO:APi 호출 parms 의 id로 받아서 호출
//TODO:APi 영상 저장후 출력? 비효율적이지 않나? 일단 해보고 리팩토링 ㄱㄱ
//TODO:APi 디렉토리로 빼기
//TODO:패치 줄이기 파일 한 파일에 함수 몰기 axios create 보기 독립적인 함수제작 연관되어 만들지 않기 좋지않음

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css/Detail.module.css";
import sub from "../utils/subscriber";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Textlength from "../utils/Textlength";
import {
  GET_YOUTUBE_CHANNEL,
  GET_YOUTUBE_CHANNEL_VIDEOS,
  GET_YOUTUBE_DATA,
} from "../api/YouTube";

function Detail() {
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
    async function FatchData() {
      try {
        setLoding(true);
        const GET_Y_DATA = await GET_YOUTUBE_DATA(id, KEY);
        setData(GET_Y_DATA);
        if (GET_Y_DATA && GET_Y_DATA.length > 0) {
          const channelID = GET_Y_DATA[0].snippet.channelId;
          const GET_Y_CHANNEL = await GET_YOUTUBE_CHANNEL(channelID, KEY);
          const GET_Y_CHANNEL_VIDEO = await GET_YOUTUBE_CHANNEL_VIDEOS(
            channelID,
            KEY
          );
          setCh(GET_Y_CHANNEL);
          setchannelVideo(GET_Y_CHANNEL_VIDEO);
        }
      } catch (error) {
        console.error("API호출 에러", error);
        setLoding(false);
        setError(true);
      } finally {
        setLoding(false);
        console.log("API호출 완료");
      }
    }
    FatchData();
  }, [id]);

  loading === true ? console.log("로딩중") : console.log("로딩끝");
  error === true ? console.log("에러") : console.log("에러 없음ㄴ");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.VideoBox}>
          <iframe
            width="1280px"
            height="720px"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            frameborder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowfullscreen
          ></iframe>
          {ch.length > 0 ? (
            <div className={styles.InterFace}>
              <h2 className={styles.MainTitle}>
                {" "}
                {data[0]?.snippet?.title || "로딩 중"}
              </h2>
              <div className={styles.DetailBox}>
                <div className={styles.YoutuberIcon}>
                  <img
                    className={styles.ChannelIcon}
                    src={ch[0].snippet.thumbnails.default.url}
                    alt="채널 이미지"
                  />
                  <div className={styles.ChannelText}>
                    <h3 className={styles.ChannelTitle}>
                      {ch[0].snippet.title}
                    </h3>
                    <p className={styles.Sub}>
                      구독자 {sub(ch[0].statistics.subscriberCount)}
                    </p>
                  </div>
                  <div className={styles.Subscriber}>구독</div>
                </div>
                <div className={styles.VideoInterFace}>
                  <div className={styles.Likebutton}>
                    <AiOutlineLike className={styles.like} />
                    {sub(data[0].statistics.likeCount)} |{" "}
                    <AiOutlineDislike className={styles.like} />
                    {data[0].statistics.dislikeCount == null
                      ? null
                      : data[0].statistics.dislikeCount}
                  </div>
                  <div className={styles.VideoIconBox}>
                    <FaShare className={styles.VideoIcon} />
                    공유
                  </div>
                  <div className={styles.VideoIconBox}>
                    <FaBookmark className={styles.VideoIcon} />
                    저장
                  </div>
                </div>
              </div>
              <div className={styles.VideoText}>
                <div className={styles.VideoTextHeader}>
                  조회수 {sub(data[0].statistics.viewCount)}{" "}
                  {data[0].snippet.publishedAt.slice(0, 10)}
                </div>
                <div className={styles.VideoMainText}>
                  {data[0].snippet.description}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className={styles.VideosListBox}>
          <h2 className={styles.VidoeListLogo}>Channel Video List</h2>

          {channleVideo.length | (ch.length > 0)
            ? channleVideo.map((a, i) => {
                return (
                  <div
                    key={i}
                    className={styles.ChannelVideoBox}
                    onClick={() => {
                      navigator(`/Detail/${a.id.videoId}`);
                    }}
                  >
                    {channleVideo.length > 0 ? (
                      <img
                        src={a.snippet.thumbnails.high.url}
                        alt=""
                        className={styles.ChannelVideoImg}
                      />
                    ) : null}
                    <div className={styles.ChannelVideoText}>
                      <p>{Textlength(a.snippet.title)}</p>
                      <p className={styles.ChannelVideoView}>
                        {ch[0].snippet.title}
                      </p>
                      <p className={styles.ChannelVideoView}>
                        조회수 {sub(data[0].statistics.viewCount)}
                      </p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default Detail;
