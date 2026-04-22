import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const menuList = [
    { name: "축제행사", path: "/festival" },
    { name: "캘린더", path: "/calendar" },
    { name: "AI추천", path: "/ai" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <img src={logo} alt="로고" />
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
              <Link to="register">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
