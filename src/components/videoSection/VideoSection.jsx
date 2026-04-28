import styles from "./VideoSection.module.css";

import video1 from "../../assets/video/v1.mp4";
import video2 from "../../assets/video/v2.mp4";

const VideoSection = () => {
  const videoList = [
    {
      id: 1,
      title: "우리에게 저마다의 서울이 있다",
      videoSrc: video1,
    },
    {
      id: 2,
      title: "[예고편] 2026 서울시향 아주 특별한 콘서트",
      videoSrc: video2,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleBox}>
          <h2>문화영상</h2>
          <p>서울문화포털의 다양한 영상을 소개합니다.</p>
        </div>

        {/* <div className={styles.moreBox}>
          <button type="button">더보기 +</button>
        </div> */}

        <div className={styles.videoGrid}>
          {videoList.map((video) => (
            <div className={styles.videoCard} key={video.id}>
              <div className={styles.videoBox}>
                <video
                  src={video.videoSrc}
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>

              <div className={styles.caption}>
                <p>{video.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
