//TODO:APi 호출 parms 의 id로 받아서 호출
//TODO:APi 영상 저장후 출력? 비효율적이지 않나? 일단 해보고 리팩토링 ㄱㄱ
//TODO:APi 디렉토리로 빼기
//TODO:패치 줄이기 파일 한 파일에 함수 몰기 axios create 보기 독립적인 함수제작 연관되어 만들지 않기 좋지않음
//TODO:각 영상리스트가 조회수가 디테일 페이지 조회수랑 같이 떠버림 이거 수정하셈
//TODO:detail page의 view count는 각각 videos의 id 를 join으로 묶어서 ,로 한꺼번에 요청을 보내고 api를 새로 만들어서 호출하는게 나은거 같다
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css/Detail.module.css";
import sub from "../utils/subscriber";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Textlength from "../utils/Textlength";
// 호출 횟수 3회 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
import {
  GET_YOUTUBE_CHANNEL,
  GET_YOUTUBE_CHANNEL_VIDEOS,
  GET_YOUTUBE_DATA,
  GET_YOUTUBE_VIDEO_VIEW,
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
  const [channel, setChannel] = useState([]);
  const [channleVideo, setchannelVideo] = useState([]);

  useEffect(() => {
    async function FeatchData() {
      try {
        setLoding(true);
        const GET_Y_DATA = await GET_YOUTUBE_DATA(id, KEY);
        setData(GET_Y_DATA);
        if (GET_Y_DATA && GET_Y_DATA.length > 0) {
          const channelID = GET_Y_DATA[0].snippet.channelId;

          const [Channel, ChannelVideo] = await Promise.all([
            GET_YOUTUBE_CHANNEL(channelID, KEY),
            GET_YOUTUBE_CHANNEL_VIDEOS(
              `${GET_Y_DATA[0].snippet.channelTitle},의 영상`,
              KEY
            ),
          ]);
          setChannel(Channel);
          console.log(channleVideo);
          const ids = ChannelVideo.map((videos) => videos.id.videoId)
            .filter(Boolean)
            .join(",");
          console.log(ids);
          if (!ids) {
          }
          const GET_STAT = await GET_YOUTUBE_VIDEO_VIEW(ids, KEY);
          console.log("GET_STAT length:", GET_STAT.length);
          console.log("ChannelVideo length:", ChannelVideo.length);
          const ADD_Y_VIEW = ChannelVideo.map((video, i) => {
            if (i < GET_STAT.length) {
              return {
                ...video,
                ViewCount: GET_STAT[i].statistics.viewCount,
              };
            }
          });
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

  console.log("채널", channel);
  console.log("데이터 디테일", data);
  console.log("채널비디오", channleVideo);

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
          {channel.length > 0 ? (
            <div className={styles.InterFace}>
              <h2 className={styles.MainTitle}>
                {data[0]?.snippet?.title || "로딩 중"}
              </h2>
              <div className={styles.DetailBox}>
                <div className={styles.YoutuberIcon}>
                  <img
                    className={styles.ChannelIcon}
                    src={channel[0].snippet.thumbnails.default.url}
                    alt="채널 이미지"
                  />
                  <div className={styles.ChannelText}>
                    <h3 className={styles.ChannelTitle}>
                      {channel[0].snippet.title}
                    </h3>
                    <p className={styles.Sub}>
                      구독자 {sub(channel[0].statistics.subscriberCount)}
                    </p>
                  </div>
                  <div className={styles.Subscriber}>구독</div>
                </div>
                <div className={styles.VideoInterFace}>
                  <div className={styles.Likebutton}>
                    <AiOutlineLike className={styles.like} />
                    {sub(data[0].statistics.likeCount)}
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
          <h2 className={styles.VidoeListLogo}>Video List</h2>

          {channleVideo.length | (channel.length > 0)
            ? channleVideo.map((video, i) => {
                return (
                  <div
                    key={i}
                    className={styles.ChannelVideoBox}
                    onClick={() => {
                      navigator(`/Detail/${video.id.videoId}`);
                    }}
                  >
                    {channleVideo.length > 0 ? (
                      <img
                        src={video.snippet.thumbnails.high.url}
                        alt=""
                        className={styles.ChannelVideoImg}
                      />
                    ) : null}
                    <div className={styles.ChannelVideoText}>
                      <p>{Textlength(video.snippet.title)}</p>
                      <p className={styles.ChannelVideoView}>
                        {video.snippet.channelTitle}
                      </p>
                      <p className={styles.ChannelVideoView}>
                        조회수 {sub(channleVideo[i].ViewCount)}
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
