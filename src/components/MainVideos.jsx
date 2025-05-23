import Youtubedata from "../data/Youtube.json"
import styles from "../css/MainVideos.module.css"
import { useNavigate } from "react-router-dom"
//TODO:map도 컴포넌트로 빼기 
function MainVideos () {
    
    const navigator = useNavigate()

    return (
        <>
        <ul className={styles.VideoContainer}>
        {
            Youtubedata.items.map((video)=>(
                <li key={video.id} className={styles.YoutubeVideo} onClick={(()=>{navigator(`/Detail/${video.id}`)})}>
                    <img
                    src={`${video.snippet.thumbnails.standard.url}`} 
                    alt={video.snippet.title}
                    className={styles.YoutubeImg}
                    width={'100%'}
                    height={'380px'}
                    />
                    <div className={styles.InterFaceBox}>
                        <div className={styles.ChannelPhoto}></div>
                        <div className={styles.Info}>
                            <p className={styles.MainTitle}>{video.snippet.title}</p>
                            <p className={styles.channelName}>{video.snippet.channelTitle}</p>
                        </div>
                    </div>
                </li>
            ))
        }
        </ul>


        </>
    )
}

export default MainVideos