import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { festivalData } from "../../data/festivalData";
import CourseCard from "./CourseCard";
import styles from "./courseCarousel.module.css";

const CourseCarousel = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleBox}>
          <h2>지금 주목할 만한 축제</h2>
          <p>서울에서 즐길 수 있는 다양한 문화 행사를 만나보세요.</p>
        </div>

        <div className={styles.sliderWrap}>
          {/* 왼쪽 버튼 */}
          <button
            className={`${styles.navButton} ${styles.prevButton} course-carousel-prev`}
            aria-label="이전 카드"
            type="button"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="black"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={4}
            loop={true}
            className={styles.swiper}
            navigation={{
              prevEl: ".course-carousel-prev",
              nextEl: ".course-carousel-next",
            }}
          >
            {festivalData.map((festival) => (
              <SwiperSlide key={festival.id}>
                <CourseCard festival={festival} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 오른쪽 버튼 */}
          <button
            className={`${styles.navButton} ${styles.nextButton} course-carousel-next`}
            aria-label="다음 카드"
            type="button"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="black"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseCarousel;
