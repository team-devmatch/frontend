import React from "react";
import festivalImage from "../assets/festival-calendar.png";
import styles from "./CalendarPage.module.css";

const CalendarPage = () => {
  return (
    <div className={styles.container}>
      <img
        src={festivalImage}
        alt="축제 모아보기"
        className={styles.image}
      />
    </div>
  );
};

export default CalendarPage;
