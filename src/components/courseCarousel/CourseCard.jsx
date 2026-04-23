import React from "react";
import styles from "./CourseCarousel.module.css";

const CourseCard = ({ course }) => {
  return (
    <div className={styles.card}>
      <img src={course.image} alt={course.title} className={styles.cardImage} />
      <div className={styles.overlay} />
      <div className={styles.textBox}>
        <p className={styles.cardTitle}>{course.title}</p>
        <p className={styles.cardSubtitle}>{course.subtitle}</p>
      </div>
    </div>
  );
};

export default CourseCard;
