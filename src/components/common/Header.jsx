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

  const getWeatherEmoji = (icon) => {
    if (icon.includes("01")) return "☀️"; // 맑음
    if (icon.includes("02")) return "🌤️"; // 구름 조금
    if (icon.includes("03")) return "⛅"; // 구름
    if (icon.includes("04")) return "☁️"; // 흐림
    if (icon.includes("09")) return "🌧️"; // 소나기
    if (icon.includes("10")) return "🌦️"; // 비
    if (icon.includes("11")) return "⛈️"; // 천둥
    if (icon.includes("13")) return "❄️"; // 눈
    if (icon.includes("50")) return "🌫️"; // 안개

    return "🌡️";
  };

  const isMainPage = location.pathname === "/";

  const [isVisible, setIsVisible] = useState(true);
  const [isHeroArea, setIsHeroArea] = useState(isMainPage);


  const [weather, setWeather] = useState(null);


  const lastScrollY = useRef(0);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.9780&appid=${API_KEY}&units=metric&lang=kr`,
        );

        const data = await response.json();

        setWeather({
          temp: Math.round(data.main.temp),
          icon: data.weather[0].icon,
          description: data.weather[0].description,
        });
      } catch (error) {
        console.error("날씨 정보를 불러오지 못했습니다.", error);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isMainPage) {
        const heroEndPoint = window.innerHeight - 100;
        setIsHeroArea(currentScrollY < heroEndPoint);
      } else {
        setIsHeroArea(false);
      }

      if (currentScrollY < 80) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }

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
          {weather && (
            <div className={styles.weatherBox}>
              <span className={styles.weatherIcon}>
                {getWeatherEmoji(weather.icon)}
              </span>
              <span>{weather.temp}°C</span>
            </div>
          )}

          <ul>
            {user ? (
              <>
                <li>
                  <span
                    onClick={() => navigate('/mypage')}
                    className={styles.userNickname}
                  >
                    {user.nickname}님
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
