//TODO:APi 호출 parms 의 id로 받아서 호출
//TODO:APi 영상 저장후 출력? 비효율적이지 않나? 일단 해보고 리팩토링 ㄱㄱ

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "../css/Detail.module.css"



function Detail () {
    const [data, setData] = useState()
    const {id} = useParams()
    const [loading, setLoding] = useState(false)
    const [error, setError] = useState(false)
    useEffect(()=>{
        async function FetchidData (){
            try{
                setLoding(true)
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos',{
                params: {
                    part:'snippet',
                    id: id,
                    key:'AIzaSyATcH9K-iE9_2-07xZqqwqVy1PRNs1OEyA'
                }
            })
            setData(response.data.items)
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
    console.log(data)

    loading === true ? console.log('로딩중') : console.log('로딩끝')
    error === true ? console.log('에러') : console.log('에러 없음ㄴ')
    return(
        <>
        <div className={styles.container}>
        <div className={styles.VideoBox}>
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
></iframe>
        </div>
        <div className={styles.VideosListBox}></div>
        </div>
        </>
    )
}

export default Detail