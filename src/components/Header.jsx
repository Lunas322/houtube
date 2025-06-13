import styles from "../css/Header.module.css";
import { AiFillYoutube } from "react-icons/ai";
import { FaKeyboard } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//TODO:css 모듈 사용후 tailwind css로 변경 예정
//TODO:겹치면 컴포넌트로 뺄 수 있으면 빼기
function Header() {
  const navigator = useNavigate();
  const search = function () {
    //입력을 시작하면 onchange?
    //검색창에 입력한 내용 satate에 담아서
    //그걸 api에 서치 부분에 q에 삽입해서 검색
    //나온 결과를 담을 state 생성 [...]
    //객체를 map으로 뿌리기?
    //검색을 누르면 새로운 페이지로 가서 header컴포넌트 올리고? 거기에 layout 안에걸 바꿔주면 되는거 아닌기...
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.Logo}
          onClick={() => {
            navigator("/");
          }}
        >
          <AiFillYoutube className={styles.YoutubeIcon} />
          <h3>YouTube</h3>
        </div>
        <div className={styles.ArreyBox}>
          <div className={styles.InputBox}>
            <input
              type="text"
              placeholder="검색"
              className={styles.SearchBox}
            />
            <FaKeyboard className={styles.KeyIcon} />
            <CiSearch className={styles.SearchButton} onClick={() => {}} />
          </div>
          <div className={styles.MicBox}>
            <FaMicrophone className={styles.MicIcon} />
          </div>
        </div>
        <div className={styles.InterFaceBox}>
          <div className={styles.PlusBox}>
            <GoPlus className={styles.PlusIcon} />
            <p className={styles.PlusText}> 만들기</p>
          </div>
          <FaBell className={styles.BellIcon} />
          <div className={styles.UserIcon}>w</div>
        </div>
      </div>
    </>
  );
}

export default Header;
