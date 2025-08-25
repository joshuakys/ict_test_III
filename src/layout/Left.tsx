import React, { useEffect, useState } from "react";
import styles from "./layout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCloud } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button } from "../components/ui";
import { useAuth, useLeftLayout, useAPI, useAlert } from "../hooks";

/**
 * Left (검색, 자동완성 기능 구현)
 * @author 김종수
 */

interface UserProfile {
  userName: string;
  addr: string;
  detailAddr?: string;
  imageBasePath?: string;
}

const Left: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { leftState, setLeftState } = useLeftLayout();
  const { user } = useAuth();
  const api = useAPI();
  const { alertError, alertSuccess } = useAlert();
  const navi = useNavigate();

  const handleDeactive = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setLeftState({
        isActive: false,
        isMob: window.innerWidth < 760 ? true : false,
      });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me", {});
        const respData = res.data;
        if (respData.code === "0000") {
          setProfile(res.data.data);
        }
      } catch (err) {
        /* 오류 처리 안함 */
      }
    };

    fetchProfile();
  }, [user]);

  // 렌더링
  return (
    <div
      className={`${styles.left_layout} ${
        leftState?.isMob && leftState?.isActive ? styles.is_active : ""
      }`}
      onClick={handleDeactive}
    >
      <div className={styles.left_layout_inner}>
        {/* 사용자 정보  */}
        {!user && (
          <div className={styles.left_layout_button_box}>
            <Button
              type="button"
              size="xs"
              onClick={() => navi("/login")}
              className={styles.header_login_button}
            >
              로그인
            </Button>{" "}
            <Button
              type="button"
              size="xs"
              onClick={() => navi("/signup")}
              className={styles.header_signup_button}
            >
              회원가입
            </Button>
          </div>
        )}
        {/* {user && (
          <Link to={"/mypage"} className={styles.left_user_box}>
            <Avatar
              size="lg"
              // src={profile?.imageBasePath || "/images/img_profile.svg"}
              src={"/images/tw01.jpg"}
            />
            <div className={styles.left_user_name}>
              <b>테스형</b>님
              <br />
              환영합니다.
            </div>
          </Link>
        )} */}

        {/* 날씨 정보 */}
        <div className={styles.left_weather_box}>
          <div className={styles.left_weather_location}>
            서울시 강남구, <br />
            강남대로
          </div>
          <div className={styles.left_weather_icon}>
            <FontAwesomeIcon icon={faCloud} />
          </div>
          <div>
            <b className={styles.weather_time_item}>19:00</b>
          </div>
        </div>

        <div className={styles.left_quick_card}>
          <Link to={"/fund_list/:type"} className={styles.left_quick_row}>
            <span>펀드</span>
            <img
              src="/images/fund_icon.svg"
              className={styles.left_quick_icon}
              alt="펀드"
            />
          </Link>
          <Link to={"/land"} className={styles.left_quick_row}>
            <span>임대 / 임차</span>
            <img
              src="/images/Menu_icons.svg"
              className={styles.left_quick_icon}
              alt="임대임차"
            />
          </Link>
        </div>

        {/* 네비게이션 */}
        <div className={styles.left_navigation_wrap}>
          <div className={styles.left_navigation_box}>
            <Link to="/mypage" className={styles.left_navigation_item}>
              <span>내 정보</span>
              <img
                src="/images/triangle_icon.svg"
                className={styles.left_triangle_icon_img}
                alt="화살표"
              />
            </Link>
          </div>
          <div className={styles.left_navigation_box}>
            <Link to="/" className={styles.left_navigation_item}>
              <span>시청 중인 임차건</span>
              <img
                src="/images/triangle_icon.svg"
                className={styles.left_triangle_icon_img}
                alt="화살표"
              />
            </Link>
          </div>
          <div className={styles.left_navigation_box}>
            <Link to="/" className={styles.left_navigation_item}>
              <span>내가 등록한 임대건</span>
              <img
                src="/images/triangle_icon.svg"
                className={styles.left_triangle_icon_img}
                alt="화살표"
              />
            </Link>
          </div>
          <div className={styles.left_navigation_box}>
            <Link to="/" className={styles.left_navigation_item}>
              <span>내 펀드</span>
              <img
                src="/images/triangle_icon.svg"
                className={styles.left_triangle_icon_img}
                alt="화살표"
              />
            </Link>
          </div>
          <div className={styles.left_navigation_box}>
            <Link to="/fund_write" className={styles.left_navigation_item}>
              <span>펀드 등록</span>
              <img
                src="/images/triangle_icon.svg"
                className={styles.left_triangle_icon_img}
                alt="화살표"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
