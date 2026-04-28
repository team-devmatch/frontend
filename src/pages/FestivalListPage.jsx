import { useEffect, useState } from "react";
import { getFestivalList } from "../api/festivalApi";
import FestivalCard from "../components/FestivalCard/FestivalCard";
import styles from "./FestivalListPage.module.css";

const FestivalListPage = () => {
  const [festivals, setFestivals] = useState([]);
  const [activeFilter, setActiveFilter] = useState("전체");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const data = await getFestivalList();
        console.log("축제 리스트 페이지 데이터:", data);

        setFestivals(data.content || []);
      } catch (error) {
        console.error("축제 리스트 불러오기 실패:", error);
      }
    };

    fetchFestivals();
  }, []);

  const filterList = [
    "전체",
    "가족과 함께",
    "연인과 함께",
    "친구와 함께",
    "자연코스",
    "힐링코스",
  ];

  const normalizeText = (text) => {
    return text?.replaceAll(" ", "") || "";
  };

  const filteredFestivals = festivals.filter((festival) => {
    const matchesFilter =
      activeFilter === "전체" ||
      normalizeText(festival.theme) === normalizeText(activeFilter);

    const matchesSearch = festival.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>어떤 축제를 찾고 있으세요?</h1>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="내가 원하는 축제를 검색해보세요"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button>검색하기</button>
        </div>

        <div className={styles.filterBox}>
          {filterList.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={activeFilter === filter ? styles.active : ""}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.listSection}>
        {filteredFestivals.length === 0 ? (
          <p className={styles.emptyText}>표시할 축제가 없습니다.</p>
        ) : (
          <div className={styles.grid}>
            {filteredFestivals.map((festival) => (
              <FestivalCard key={festival.festivalId} festival={festival} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default FestivalListPage;
