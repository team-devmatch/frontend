import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.svg"
import { Link, useNavigate } from "react-router-dom"; // ← 추가(, useNavigate)
import { useAuth } from "../../context/useAuth";  // ← 추가

const Header = () => {
  const { user, logout } = useAuth();  // ← 추가
  const navigate = useNavigate();      // ← 추가

  const menuList = [
    { name: "축제행사", path: "/festival" },
    { name: "캘린더", path: "/calendar" },
    { name: "게시판", path: "/board" },
  ];

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ← 추가
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`${styles.header} ${isVisible ? styles.show : styles.hide}`}
    >
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="로고" />
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

        {/* <div className={styles.navRight}>
          <ul>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        </div> */}

        {/* ↓ 이 부분만 수정했어요! */}
        <div className={styles.navRight}>
          <ul>
            {user ? (
              // 로그인 상태
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
              // 비로그인 상태
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
