import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import styles from "./UnescoCarousel.module.css";

import img1 from "../../assets/images/unesco/unesco1.png";
import img2 from "../../assets/images/unesco/unesco2.png";
import img3 from "../../assets/images/unesco/unesco3.png";
import img4 from "../../assets/images/unesco/unesco4.png";
import img5 from "../../assets/images/unesco/unesco5.png";

const unescoData = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img4 },
  { id: 5, image: img5 },
];

const UnescoCarousel = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>한국의 #유네스코 세계 유산</h2>

      <div className={styles.sliderWrap}>
        <Swiper
          className={styles.swiper}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={20}
          loop={true}
        >
          {unescoData.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <img src={item.image} alt="한국 유네스코 세계 유산" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UnescoCarousel;
