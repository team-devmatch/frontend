import { useEffect, useRef } from "react";
import styles from "./KakaoMap.module.css";

const KakaoMap = ({ latitude, longitude, placeName }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (Number.isNaN(lat) || Number.isNaN(lng)) return;

    const loadMap = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(lat, lng);

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: position,
          level: 4,
        });

        const marker = new window.kakao.maps.Marker({
          position,
        });

        marker.setMap(map);

        if (placeName) {
          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:8px 12px;font-size:13px;">${placeName}</div>`,
          });

          infoWindow.open(map, marker);
        }
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false`;
    script.async = true;

    script.onload = loadMap;

    document.head.appendChild(script);
  }, [latitude, longitude, placeName]);

  return <div ref={mapRef} className={styles.map} />;
};

export default KakaoMap;
