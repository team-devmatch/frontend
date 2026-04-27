import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFestivalList } from "../../api/festivalApi";
import FestivalCard from "../FestivalCard/FestivalCard";
import styles from "./FestivalPreview.module.css";

const FestivalPreview = () => {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const data = await getFestivalList();

        console.log("홈 축제 미리보기 데이터:", data);

        setFestivals(data.content?.slice(0, 4) || []);
      } catch (error) {
        console.error("홈 축제 미리보기 API 오류:", error);
      }
    };

    fetchFestivals();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h2>어디로 떠날지 고민이라면, 여기서 시작하세요</h2>

          <Link to="/festivals" className={styles.moreLink}>
            &gt;더보기
          </Link>
        </div>

        <div className={styles.cardGrid}>
          {festivals.map((festival) => (
            <FestivalCard key={festival.festivalId} festival={festival} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalPreview;
