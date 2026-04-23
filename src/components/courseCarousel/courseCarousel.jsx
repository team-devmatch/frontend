import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./CourseCarousel.module.css";
import CourseCard from "./CourseCard";
import { getRecentFestivals } from "../../api/festivalApi";

const dummyData = [
  {
    id: 1,
    title: "코끝에 봄",
    subtitle: "이천 산수유마을",
    image:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "이번 주말에 딱",
    subtitle: "전국 벚꽃 명소 5곳",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "봄 내음 가득 담은",
    subtitle: "제주 동쪽 드라이브",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "늦게까지 피는 봄",
    subtitle: "전국 벚꽃 명소 3곳",
    image:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "가을빛 산책",
    subtitle: "전통과 자연이 함께",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "푸른 하늘 아래",
    subtitle: "감성 여행지 추천",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "햇살 가득한 길",
    subtitle: "당일치기 드라이브 코스",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  },
];

const CourseCarousel = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getRecentFestivals();
        console.log("data : ", data);
        if (data && data.length > 0) {
          setCourses(data);
        } else {
          setCourses(dummyData);
        }
      } catch (error) {
        console.error("코스 데이터 불러오기 실패:", error);
        setCourses(dummyData);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>지금 떠나기 좋은 여행 코스</h2>

      <div className={styles.sliderWrap}>
        <Swiper
          modules={[Navigation, Pagination]}
          centeredSlides
          loop
          slidesPerView={"auto"}
          spaceBetween={-55}
          navigation
          pagination={{ clickable: true }}
          speed={700}
          className={styles.swiper}
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id} className={styles.slide}>
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CourseCarousel;
