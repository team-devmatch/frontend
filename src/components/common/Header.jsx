import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.svg";
import whiteLogo from "../../assets/images/logo-white.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuList = [
    { name: "축제행사", path: "/festivals" },
    { name: "캘린더", path: "/calendar" },
    { name: "게시판", path: "/board" },
  ];

  // 메인 페이지인지 확인
  const isMainPage = location.pathname === "/";

  const [isVisible, setIsVisible] = useState(true);
  const [isHeroArea, setIsHeroArea] = useState(isMainPage);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 메인 페이지에서만 배너 영역 판단
      if (isMainPage) {
        const heroEndPoint = window.innerHeight - 100;
        setIsHeroArea(currentScrollY < heroEndPoint);
      } else {
        setIsHeroArea(false);
      }

      // 맨 위 근처에서는 무조건 헤더 보이기
      if (currentScrollY < 80) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // 아래로 스크롤하면 숨김
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }

      // 위로 스크롤하면 보임
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMainPage, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`
        ${styles.header}
        ${isVisible ? styles.show : styles.hide}
        ${isHeroArea ? styles.heroHeader : styles.normalHeader}
      `}
    >
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={isHeroArea ? whiteLogo : logo} alt="로고" />
          </Link>
        </div>

        <nav className={styles.navCenter}>
          <ul>
            {menuList.map((menu) => (
              <li key={menu.path}>
                <Link to={menu.path}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 로그인 상태에 따라 다른 UI */}
        <div className={styles.navRight}>
          <ul>
            {user ? (
              <>
                <li>
                  <span
                    onClick={() => navigate('/mypage')}
                    className={styles.userNickname}
                  >
                    {user.nickname}님 환영합니다!
                  </span>
                </li>
                <li>
                  <span onClick={handleLogout} className={styles.logout}>
                    로그아웃
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/signup">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </div>

      </div>
    </header>
  );
};

export default Header;
