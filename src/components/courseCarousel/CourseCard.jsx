import { useNavigate } from "react-router-dom";
import styles from "./courseCarousel.module.css";

const CourseCard = ({ festival }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/festivals/${festival.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageBox}>
        <img src={festival.posterImage} alt={festival.title} />
      </div>

      <div className={styles.titleWrap}>
        <h3 className={styles.title}>{festival.title}</h3>
      </div>

      <p className={styles.place}>{festival.place}</p>
      <p className={styles.period}>{festival.period}</p>
    </div>
  );
};

export default CourseCard;
