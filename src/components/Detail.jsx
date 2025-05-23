//TODO:APi 호출 parms 의 id로 받아서 호출
//TODO:APi 영상 저장후 출력? 비효율적이지 않나? 일단 해보고 리팩토링 ㄱㄱ
//TODO:APi 디렉토리로 빼기

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "../css/Detail.module.css"
import { meta } from "eslint-plugin-react-hooks"



function Detail () {
    const KEY = import.meta.env.VITE_YOUTUBE_API_KEY
    const [data, setData] = useState([])
    //데이터 받을거
    const {id} = useParams()
    //api호출때 사용
    const [loading, setLoding] = useState(false)
    const [error, setError] = useState(false)
    const [ch, setCh] = useState()
    //채널 데이터 받을거
    useEffect(()=>{
        async function FetchidData (){
            // detail api 요청
            try{
                setLoding(true)
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos',{
                params: {
                    part:'snippet',
                    id: id,
                    key:KEY
                }
            })
            //데이터 저장
            const data = response.data.items
            setData(data)
            //channeldata 요청
            if (data && data.length > 0) {
                const channeldataid = data[0].snippet.channelId
                const channeldata = await axios.get('https://www.googleapis.com/youtube/v3/channels',{
                    params: {
                        part: 'snippet',
                        id: channeldataid,
                        key: KEY
                    }
                })
                setCh(channeldata.data.items)
            }
            } catch(error){
                console.error('에러가 발생했습니다', error)
                setLoding(false)
                setError(true)
            } finally {
                console.log('끝')
                setLoding(false)
            }
        }
        FetchidData()
        
    },[])



    console.log('유튜브 영상 데이터',data)
    console.log('유튜브 채널 데이터',ch)

    loading === true ? console.log('로딩중') : console.log('로딩끝')
    error === true ? console.log('에러') : console.log('에러 없음ㄴ')
    return(
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
        <div className={styles.InterFace}>
        <h2 className={styles.MainTitle}>  {data?.[0]?.snippet?.title || "로딩 중"}</h2>
        <div className={styles.DetailBox}>

        </div>
        </div>
        </div>
        <div className={styles.VideosListBox}>
        </div>
        </div>
        </>
    )
}

export default Detail