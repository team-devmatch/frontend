import { Link } from "react-router-dom";
import styles from "./FestivalCard.module.css";

const FestivalCard = ({ festival }) => {
  return (
    <Link
      to={`/festival-detail/${festival.festivalId}`}
      className={styles.card}
    >
      <img
        src={festival.imageUrl}
        alt={festival.name}
        className={styles.image}
      />

      <div className={styles.textBox}>
        <h3>{festival.name}</h3>
        <p>
          {festival.startDate} ~ {festival.endDate}
        </p>
      </div>
    </Link>
  );
};

export default FestivalCard;
