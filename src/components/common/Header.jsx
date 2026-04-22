import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
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

      // 🔥 상단에서는 항상 보이게
      if (currentScrollY < 100) {
        setIsVisible(true);
      }
      // 🔥 아래로 스크롤 → 숨김
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      // 🔥 위로 스크롤 → 보임
      else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

        <div className={styles.navRight}>
          <ul>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/register">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
