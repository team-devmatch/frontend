import React from "react";
import styles from "./Banner.module.css";
import video from "../assets/video/banner.mp4";
const Banner = () => {
  return (
    <section className={styles.banner}>
      <video
        className={styles.video}
        src={video}
        autoPlay
        muted
        loop
        playsInline
      />
    </section>
  );
};

export default Banner;
