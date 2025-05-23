import Youtubedata from "../data/Youtube.json"
import styles from "../css/MainVideos.module.css"
//TODO:map도 컴포넌트로 빼기 
function MainVideos () {
    

    return (
        <>
        <ul className={styles.VideoContainer}>
        {
            Youtubedata.items.map((video)=>(
                <li key={video.id} className={styles.YoutubeVideo}>
                    <iframe 
                    src={`https://www.youtube.com/embed/${video.id}`} 
                    frameborder="0"
                    width={'100%'}
                    height={'350px'}
                    ></iframe>
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