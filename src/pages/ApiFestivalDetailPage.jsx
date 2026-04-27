import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFestivalDetail } from "../api/festivalApi";
import styles from "./ApiFestivalDetailPage.module.css";
import KakaoMap from "../components/kakaoMap/KakaoMap";

const ApiFestivalDetailPage = () => {
  const { festivalId } = useParams();
  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestivalDetail = async () => {
      try {
        const data = await getFestivalDetail(festivalId);
        console.log("API 축제 상세 데이터:", data);

        setFestival(data);
      } catch (error) {
        console.error("API 축제 상세 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivalDetail();
  }, [festivalId]);

  if (loading) {
    return (
      <div className={styles.status}>축제 정보를 불러오는 중입니다...</div>
    );
  }

  if (!festival) {
    return (
      <div className={styles.status}>
        <h2>축제 정보를 찾을 수 없습니다.</h2>
        <Link to="/festivals">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.titleBox}>
          <h1>{festival.name}</h1>
          <p>{festival.theme || "축제 정보"}</p>
        </div>

        <section className={styles.topSection}>
          <div className={styles.imageBox}>
            <img
              className={styles.mainImage}
              src={festival.imageUrl}
              alt={festival.name}
            />
          </div>

          <div className={styles.detailBox}>
            <h2>상세정보</h2>

            <div className={styles.infoTable}>
              <div>
                <strong>주소</strong>
                <span>{festival.address || "주소 정보 없음"}</span>
              </div>

              <div>
                <strong>기간</strong>
                <span>
                  {festival.startDate} ~ {festival.endDate}
                </span>
              </div>

              <div>
                <strong>문의</strong>
                <span>{festival.tel || "문의 정보 없음"}</span>
              </div>

              <div>
                <strong>홈페이지</strong>
                <span>{festival.homepage || "홈페이지 정보 없음"}</span>
              </div>

              <div>
                <strong>테마</strong>
                <span>{festival.theme || "정보 없음"}</span>
              </div>
            </div>

            <p className={styles.description}>
              {festival.description ||
                "상세 설명 정보가 없습니다. 축제 기간과 테마 정보를 확인해 주세요."}
            </p>
          </div>
        </section>

        <section className={styles.mapSection}>
          <h2>위치정보</h2>
          <KakaoMap
            latitude={festival.latitude}
            longitude={festival.longitude}
            placeName={festival.name}
          />
        </section>

        <Link to="/festivals" className={styles.backLink}>
          목록으로 돌아가기
        </Link>
      </section>
    </main>
  );
};

export default ApiFestivalDetailPage;
