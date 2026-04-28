import { useParams, Link } from "react-router-dom";
import { festivalData } from "../data/festivalData";
import styles from "./FestivalDetailPage.module.css";

const FestivalDetailPage = () => {
  const { id } = useParams();

  const festival = festivalData.find((item) => item.id === Number(id));

  if (!festival) {
    return (
      <div className={styles.notFound}>
        <h2>해당 축제를 찾을 수 없습니다.</h2>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <main className={styles.detailPage}>
      <div className={styles.inner}>
        <div className={styles.posterBox}>
          <img src={festival.posterImage} alt={festival.title} />
        </div>

        <div className={styles.infoBox}>
          <span className={styles.line}></span>
          <h1>{festival.title}</h1>

          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <strong>장소</strong>
              <p>{festival.place}</p>
            </div>

            <div className={styles.infoRow}>
              <strong>기간</strong>
              <p>{festival.period}</p>
            </div>

            <div className={styles.infoRow}>
              <strong>시간</strong>
              <p>{festival.time}</p>
            </div>

            <div className={styles.infoRow}>
              <strong>대상</strong>
              <p>{festival.target}</p>
            </div>

            <div className={styles.infoRow}>
              <strong>요금</strong>
              <p>{festival.price}</p>
            </div>

            <div className={styles.infoRow}>
              <strong>문의</strong>
              <p>{festival.contact}</p>
            </div>
          </div>

          <p className={styles.description}>{festival.description}</p>

          {/* <a
            className={styles.homepageButton}
            href={festival.homepage}
            target="_blank"
            rel="noreferrer"
          >
            홈페이지 바로가기
          </a> */}
        </div>
      </div>
    </main>
  );
};

export default FestivalDetailPage;
