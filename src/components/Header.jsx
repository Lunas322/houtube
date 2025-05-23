import styles from "../css/Header.module.css"
import { AiFillYoutube } from "react-icons/ai";
import { FaKeyboard } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//TODO:css 모듈 사용후 tailwind css로 변경 예정
//TODO:겹치면 컴포넌트로 뺄 수 있으면 빼기   
function Header () {
    const navigator = useNavigate()

    return (
        <>
        <div className={styles.container}>
            <div className={styles.Logo} onClick={(()=>{navigator('/')})}>
                <AiFillYoutube className={styles.YoutubeIcon}/>
                <h3>YouTube</h3>
            </div>
        <div className={styles.ArreyBox}>
            <div className={styles.InputBox}>
                <input type="text" placeholder="검색" className={styles.SearchBox}/>
                <FaKeyboard className={styles.KeyIcon}/>
                <CiSearch className={styles.SearchButton}/>
            </div>
            <div className={styles.MicBox}>
                <FaMicrophone className={styles.MicIcon}/>
            </div>
        </div>
            <div className={styles.InterFaceBox}>
                <div className={styles.PlusBox}>
                    <GoPlus className={styles.PlusIcon}/>
                    <p className={styles.PlusText}> 만들기</p>
                </div>
                    <FaBell className={styles.BellIcon}/>
                    <div className={styles.UserIcon}>
w
                    </div>
            </div>
        </div>
        </>
    )
} 

export default Header   